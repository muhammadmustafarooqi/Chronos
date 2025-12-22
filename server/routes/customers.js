import express from 'express';
import Customer from '../models/Customer.js';
import Order from '../models/Order.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/customers
// @desc    Get all customers
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req, res) => {
    try {
        const { search, status, sort = '-createdAt' } = req.query;

        const query = {};

        if (status && status !== 'All') query.status = status;

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const customers = await Customer.find(query).sort(sort);

        res.json({
            success: true,
            data: {
                customers: customers.map(c => ({
                    id: c._id,
                    name: c.name,
                    email: c.email,
                    phone: c.phone,
                    totalOrders: c.totalOrders,
                    totalSpend: c.totalSpend,
                    status: c.status,
                    joinedDate: c.createdAt,
                    lastOrderDate: c.lastOrderDate
                }))
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/customers/:id
// @desc    Get single customer with order history
// @access  Private/Admin
router.get('/:id', protect, adminOnly, async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        // Get customer's orders
        const orders = await Order.find({ email: customer.email }).sort('-createdAt');

        res.json({
            success: true,
            data: {
                customer: {
                    id: customer._id,
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone,
                    totalOrders: customer.totalOrders,
                    totalSpend: customer.totalSpend,
                    status: customer.status,
                    joinedDate: customer.createdAt,
                    lastOrderDate: customer.lastOrderDate,
                    notes: customer.notes
                },
                orders: orders.map(o => ({
                    id: o.orderId,
                    totalAmount: o.totalAmount,
                    status: o.status,
                    date: o.createdAt
                }))
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/customers/:id/status
// @desc    Update customer status
// @access  Private/Admin
router.put('/:id/status', protect, adminOnly, async (req, res) => {
    try {
        const { status } = req.body;

        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        res.json({
            success: true,
            message: 'Customer status updated',
            data: { customer }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/customers/:id
// @desc    Delete a customer
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        res.json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
