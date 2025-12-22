import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Customer from '../models/Customer.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/dashboard', protect, adminOnly, async (req, res) => {
    try {
        // Get counts and totals
        const [
            totalProducts,
            totalOrders,
            totalCustomers,
            orders,
            recentOrders
        ] = await Promise.all([
            Product.countDocuments(),
            Order.countDocuments(),
            Customer.countDocuments(),
            Order.find({}, 'totalAmount status createdAt'),
            Order.find().sort('-createdAt').limit(5).populate('user', 'name')
        ]);

        // Calculate revenue
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        // Orders by status
        const pendingOrders = orders.filter(o => o.status === 'Pending').length;
        const processingOrders = orders.filter(o => o.status === 'Processing').length;
        const shippedOrders = orders.filter(o => o.status === 'Shipped').length;
        const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

        // Revenue by day (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentOrdersData = orders.filter(o => new Date(o.createdAt) > sevenDaysAgo);

        const revenueByDay = {};
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            revenueByDay[dateStr] = 0;
        }

        recentOrdersData.forEach(order => {
            const dateStr = new Date(order.createdAt).toISOString().split('T')[0];
            if (revenueByDay[dateStr] !== undefined) {
                revenueByDay[dateStr] += order.totalAmount || 0;
            }
        });

        res.json({
            success: true,
            data: {
                stats: {
                    totalRevenue,
                    totalOrders,
                    totalCustomers,
                    totalProducts
                },
                ordersByStatus: {
                    pending: pendingOrders,
                    processing: processingOrders,
                    shipped: shippedOrders,
                    delivered: deliveredOrders
                },
                revenueByDay: Object.entries(revenueByDay).map(([date, revenue]) => ({
                    date,
                    revenue
                })).reverse(),
                recentOrders: recentOrders.map(o => ({
                    id: o.orderId,
                    customerName: o.customerName,
                    totalAmount: o.totalAmount,
                    status: o.status,
                    date: o.createdAt,
                    items: o.items
                }))
            }
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/admin/seed
// @desc    Seed database with initial products
// @access  Private/Admin
router.post('/seed', protect, adminOnly, async (req, res) => {
    try {
        const { watches } = req.body;

        if (!watches || !Array.isArray(watches)) {
            return res.status(400).json({ success: false, message: 'No watches data provided' });
        }

        // Clear existing products
        await Product.deleteMany({});

        // Insert new products
        const products = await Product.insertMany(watches.map(w => ({
            ...w,
            _id: undefined // Let MongoDB generate new IDs
        })));

        res.json({
            success: true,
            message: `Successfully seeded ${products.length} products`,
            data: { count: products.length }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
