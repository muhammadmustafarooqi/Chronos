import express from 'express';
import Order from '../models/Order.js';
import Customer from '../models/Customer.js';
import Product from '../models/Product.js';
import { protect, adminOnly, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/orders
// @desc    Get all orders (admin) or user's orders
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        let query = {};

        // If not admin, only show user's orders
        if (req.user.role !== 'admin') {
            query = {
                $or: [
                    { user: req.user._id },
                    { email: req.user.email.toLowerCase() }
                ]
            };
        }

        const orders = await Order.find(query)
            .sort('-createdAt')
            .populate('user', 'name email');

        res.json({
            success: true,
            data: {
                orders: orders.map(order => ({
                    id: order.orderId,
                    _id: order._id,
                    customerId: order.user?._id || order._id,
                    customerName: order.customerName,
                    email: order.email,
                    items: order.items,
                    totalAmount: order.totalAmount,
                    status: order.status,
                    date: order.createdAt,
                    shippingAddress: order.shippingAddressFormatted ||
                        `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}`,
                    paymentMethod: order.paymentMethod,
                    paymentStatus: order.paymentStatus
                }))
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/orders/my-orders
// @desc    Get current user's orders
// @access  Private
router.get('/my-orders', protect, async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [
                { user: req.user._id },
                { email: req.user.email.toLowerCase() }
            ]
        }).sort('-createdAt');

        res.json({
            success: true,
            data: {
                orders: orders.map(order => ({
                    id: order.orderId,
                    _id: order._id,
                    items: order.items,
                    totalAmount: order.totalAmount,
                    status: order.status,
                    date: order.createdAt,
                    shippingAddress: order.shippingAddressFormatted
                }))
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findOne({
            $or: [
                { _id: req.params.id },
                { orderId: req.params.id }
            ]
        }).populate('user', 'name email');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Check if user has access to this order
        if (req.user.role !== 'admin' &&
            order.user?.toString() !== req.user._id.toString() &&
            order.email !== req.user.email) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        res.json({
            success: true,
            data: {
                order: {
                    id: order.orderId,
                    _id: order._id,
                    customerName: order.customerName,
                    email: order.email,
                    phone: order.phone,
                    items: order.items,
                    totalAmount: order.totalAmount,
                    status: order.status,
                    date: order.createdAt,
                    shippingAddress: order.shippingAddress,
                    shippingAddressFormatted: order.shippingAddressFormatted,
                    paymentMethod: order.paymentMethod,
                    paymentStatus: order.paymentStatus
                }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public (with optional auth)
router.post('/', optionalAuth, async (req, res) => {
    try {
        const {
            customerName,
            email,
            phone,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod = 'cod'
        } = req.body;

        // Validate items
        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: 'No items in order' });
        }

        // Format items with product references
        const orderItems = await Promise.all(items.map(async (item) => {
            // Try to find product in database
            let product = null;
            if (item.id) {
                product = await Product.findById(item.id).catch(() => null);
            }

            return {
                product: product?._id || item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image || (item.images ? item.images[0] : '')
            };
        }));

        // Format shipping address
        const shippingAddressFormatted = typeof shippingAddress === 'string'
            ? shippingAddress
            : `${shippingAddress.street || ''}, ${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.zipCode || ''}`.trim();

        // Create order
        const order = await Order.create({
            user: req.user?._id || null,
            customerName,
            email: email.toLowerCase(),
            phone,
            items: orderItems,
            totalAmount,
            shippingAddress: typeof shippingAddress === 'string'
                ? { street: shippingAddress }
                : shippingAddress,
            shippingAddressFormatted,
            paymentMethod,
            status: 'Pending'
        });

        // Update or create customer record
        const existingCustomer = await Customer.findOne({ email: email.toLowerCase() });

        if (existingCustomer) {
            existingCustomer.totalOrders += 1;
            existingCustomer.totalSpend += totalAmount;
            existingCustomer.lastOrderDate = new Date();
            await existingCustomer.save();
        } else {
            await Customer.create({
                user: req.user?._id || null,
                name: customerName,
                email: email.toLowerCase(),
                phone,
                totalOrders: 1,
                totalSpend: totalAmount,
                lastOrderDate: new Date()
            });
        }

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            data: {
                order: {
                    id: order.orderId,
                    _id: order._id,
                    customerName: order.customerName,
                    email: order.email,
                    items: order.items,
                    totalAmount: order.totalAmount,
                    status: order.status,
                    date: order.createdAt
                }
            }
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private/Admin
router.put('/:id/status', protect, adminOnly, async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findOneAndUpdate(
            { $or: [{ _id: req.params.id }, { orderId: req.params.id }] },
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Update payment status if delivered
        if (status === 'Delivered' && order.paymentMethod === 'cod') {
            order.paymentStatus = 'paid';
            await order.save();
        }

        res.json({
            success: true,
            message: 'Order status updated',
            data: {
                order: {
                    id: order.orderId,
                    status: order.status,
                    paymentStatus: order.paymentStatus
                }
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/orders/:id
// @desc    Delete an order
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({
            $or: [{ _id: req.params.id }, { orderId: req.params.id }]
        });

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
