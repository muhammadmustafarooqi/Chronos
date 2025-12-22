import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    ShoppingBag,
    DollarSign,
    Watch,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Trash2
} from 'lucide-react';
import { useWatches } from '../../context/WatchContext';
import { useOrders } from '../../context/OrderContext';
import { useCustomers } from '../../context/CustomerContext';

const AdminDashboard = () => {
    const { watches } = useWatches();
    const { orders } = useOrders();
    const { customers } = useCustomers();

    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const totalOrders = orders.length;
    const totalCustomers = customers.length;
    const liveInventory = watches.length;

    const stats = [
        {
            label: 'Total Revenue',
            value: `$${totalRevenue.toLocaleString()}`,
            change: '+12.5%',
            isPositive: true,
            icon: DollarSign,
            color: 'text-green-400'
        },
        {
            label: 'Total Orders',
            value: totalOrders.toString(),
            change: '+8.2%',
            isPositive: true,
            icon: ShoppingBag,
            color: 'text-blue-400'
        },
        {
            label: 'Customers',
            value: totalCustomers.toString(),
            change: '+15.4%',
            isPositive: true,
            icon: Users,
            color: 'text-purple-400'
        },
        {
            label: 'Live Inventory',
            value: liveInventory.toString(),
            change: '0%',
            isPositive: true,
            icon: Watch,
            color: 'text-luxury-gold'
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-white mb-2">Dashboard Overview</h1>
                    <p className="text-gray-400">Welcome back, here's what's happening today.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-luxury-gold/50 transition-colors">
                        Download Report
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('This will clear all local orders, customers, and inventory. Are you sure?')) {
                                localStorage.clear();
                                window.location.reload();
                            }
                        }}
                        className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-2 text-xs"
                    >
                        <Trash2 size={14} />
                        Clear System Cache
                    </button>
                    <button className="btn-primary py-2 px-6 rounded-lg text-xs">
                        Add New Watch
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 bg-luxury-black border border-white/5 rounded-2xl hover:border-white/10 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                {stat.change}
                                {stat.isPositive ? <TrendingUp size={16} /> : <TrendingUp size={16} className="rotate-180" />}
                            </div>
                        </div>
                        <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sale Chart Placeholder */}
                <div className="lg:col-span-2 p-8 bg-luxury-black border border-white/5 rounded-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-serif font-bold text-white">Sales Analytics</h2>
                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-luxury-gold transition-colors">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full flex items-end justify-between gap-4">
                        {[40, 70, 45, 90, 65, 85, 55].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className="w-full bg-gradient-to-t from-luxury-gold/20 via-luxury-gold/50 to-luxury-gold rounded-t-lg relative group-hover:brightness-125 transition-all"
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-luxury-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        ${height}k
                                    </div>
                                </motion.div>
                                <span className="text-xs text-gray-500">Day {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Orders Table */}
                <div className="p-8 bg-luxury-black border border-white/5 rounded-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-serif font-bold text-white">Recent Activity</h2>
                        <button className="text-luxury-gold text-sm hover:underline">View All</button>
                    </div>
                    <div className="space-y-6">
                        {orders.slice(0, 4).map((order, i) => (
                            <div key={i} className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold/10 transition-colors">
                                        <Watch size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{order.customerName}</p>
                                        <p className="text-xs text-gray-500">{order.items[0].name} • {new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-white">${(order.totalAmount || 0).toLocaleString()}</p>
                                    <p className={`text-[10px] uppercase tracking-wider font-bold ${order.status === 'Delivered' ? 'text-green-400' :
                                        order.status === 'Processing' ? 'text-amber-400' :
                                            order.status === 'Shipped' ? 'text-blue-400' : 'text-gray-400'
                                        }`}>
                                        {order.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
