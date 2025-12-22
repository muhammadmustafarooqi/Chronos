import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Settings,
    Bell,
    Shield,
    Globe,
    Database,
    Save,
    Layout,
    Mail,
    Smartphone,
    CreditCard
} from 'lucide-react';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [isSaving, setIsSaving] = useState(false);

    const tabs = [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'appearance', label: 'Appearance', icon: Layout },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'payments', label: 'Payments', icon: CreditCard },
    ];

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1500);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-white mb-2">Store Settings</h1>
                    <p className="text-gray-400">Configure your luxury timepiece boutique's core parameters.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary py-2 px-8 rounded-full flex items-center gap-2 group"
                >
                    {isSaving ? (
                        <div className="w-4 h-4 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Save size={18} className="group-hover:scale-110 transition-transform" />
                    )}
                    <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="w-full lg:w-64 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                    ? 'bg-luxury-gold text-luxury-black font-bold'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <tab.icon size={20} />
                            <span className="text-sm">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-luxury-black border border-white/5 rounded-3xl p-8 min-h-[500px]">
                    {activeTab === 'general' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <h2 className="text-xl font-serif font-bold text-white border-b border-white/5 pb-4">General Configuration</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest">Store Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Chronos Luxury"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-luxury-gold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest">Support Email</label>
                                    <input
                                        type="email"
                                        defaultValue="concierge@chronos.luxury"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-luxury-gold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest">Curreny</label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-luxury-gold">
                                        <option className="bg-luxury-black">USD ($) - US Dollar</option>
                                        <option className="bg-luxury-black">EUR (€) - Euro</option>
                                        <option className="bg-luxury-black">GBP (£) - British Pound</option>
                                        <option className="bg-luxury-black">CHF (₣) - Swiss Franc</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest">Timezone</label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-luxury-gold">
                                        <option className="bg-luxury-black">GMT-05:00 Eastern Time</option>
                                        <option className="bg-luxury-black">GMT+00:00 London</option>
                                        <option className="bg-luxury-black">GMT+01:00 Geneva</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-8">
                                <h3 className="text-sm font-bold text-white mb-4">Maintenance Mode</h3>
                                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center">
                                            <Database className="text-amber-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">Temporary Shutdown</p>
                                            <p className="text-xs text-gray-500">Only administrators can access the storefront.</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-luxury-gold"></div>
                                    </label>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab !== 'general' && (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-luxury-gold">
                                <Globe size={40} className="animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-white">{tabs.find(t => t.id === activeTab).label} Settings</h3>
                                <p className="text-gray-500 max-w-xs mx-auto mt-2">These advanced configuration options are currently being refined for the production environment.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
