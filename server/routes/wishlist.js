import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/wishlist
// @desc    Get user's wishlist
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');

        res.json({
            success: true,
            data: {
                wishlist: user.wishlist || []
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/wishlist/:productId
// @desc    Add product to wishlist
// @access  Private
router.post('/:productId', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const user = await User.findById(req.user._id);

        // Check if already in wishlist
        if (user.wishlist.includes(req.params.productId)) {
            return res.status(400).json({ success: false, message: 'Product already in wishlist' });
        }

        user.wishlist.push(req.params.productId);
        await user.save();

        const updatedUser = await User.findById(req.user._id).populate('wishlist');

        res.json({
            success: true,
            message: 'Added to wishlist',
            data: {
                wishlist: updatedUser.wishlist
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/wishlist/:productId
// @desc    Remove product from wishlist
// @access  Private
router.delete('/:productId', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        user.wishlist = user.wishlist.filter(
            id => id.toString() !== req.params.productId
        );
        await user.save();

        const updatedUser = await User.findById(req.user._id).populate('wishlist');

        res.json({
            success: true,
            message: 'Removed from wishlist',
            data: {
                wishlist: updatedUser.wishlist
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/wishlist/toggle/:productId
// @desc    Toggle product in wishlist
// @access  Private
router.post('/toggle/:productId', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const user = await User.findById(req.user._id);
        const isInWishlist = user.wishlist.includes(req.params.productId);

        if (isInWishlist) {
            user.wishlist = user.wishlist.filter(
                id => id.toString() !== req.params.productId
            );
        } else {
            user.wishlist.push(req.params.productId);
        }

        await user.save();

        const updatedUser = await User.findById(req.user._id).populate('wishlist');

        res.json({
            success: true,
            message: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
            data: {
                wishlist: updatedUser.wishlist,
                action: isInWishlist ? 'removed' : 'added'
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
