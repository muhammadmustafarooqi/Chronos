import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

// Initial watch data
const watches = [
    {
        name: "Royal Oak Perpetual Calendar",
        brand: "Audemars Piguet",
        price: 145000,
        images: [
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=2360&q=80",
            "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1408&q=80",
            "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2360&q=80"
        ],
        category: "Luxury",
        description: "A masterpiece of horology featuring a perpetual calendar complication housed within the iconic octagonal case.",
        features: ["Perpetual Calendar", "Moon Phase", "Ceramic Case", "41mm Diameter", "Self-Winding", "50m Water Resistant"],
        isNew: true,
        isFeatured: true
    },
    {
        name: "Nautilus Travel Time",
        brand: "Patek Philippe",
        price: 115000,
        images: [
            "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2360&q=80",
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=2360&q=80"
        ],
        category: "Sport",
        description: "The iconic Nautilus design with dual time zone functionality for the modern traveler.",
        features: ["Dual Time Zone", "Date Display", "Steel Case", "40.5mm Diameter", "Automatic Movement", "120m Water Resistant"],
        isNew: false,
        isFeatured: true
    },
    {
        name: "Daytona Cosmograph",
        brand: "Rolex",
        price: 35000,
        images: [
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=988&q=80",
            "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        category: "Racing",
        description: "The ultimate tool watch for those with a passion for driving and speed.",
        features: ["Chronograph", "Tachymetric Scale", "Oystersteel", "40mm Diameter", "Perpetual Movement", "100m Water Resistant"],
        isNew: false,
        isFeatured: true
    },
    {
        name: "Speedmaster Moonwatch",
        brand: "Omega",
        price: 7500,
        images: [
            "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1408&q=80",
            "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        category: "Heritage",
        description: "The watch that participated in all six lunar missions. An icon of space exploration.",
        features: ["Chronograph", "Manual Winding", "Hesalite Crystal", "42mm Diameter", "NASA Certified", "50m Water Resistant"],
        isNew: false,
        isFeatured: false
    },
    {
        name: "Tank Louis",
        brand: "Cartier",
        price: 12800,
        images: [
            "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=1999&q=80",
            "https://images.unsplash.com/photo-1619134778706-7015533a6150?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        category: "Dress",
        description: "A symbol of understated elegance since 1917. The rectangular case design that revolutionized watchmaking.",
        features: ["Quartz Movement", "18k Gold Case", "Leather Strap", "Small Model", "Sapphire Crystal", "30m Water Resistant"],
        isNew: false,
        isFeatured: false
    },
    {
        name: "Submariner Date",
        brand: "Rolex",
        price: 10250,
        images: [
            "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2430&q=80",
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=988&q=80"
        ],
        category: "Diver",
        description: "The reference among divers' watches. Engineered for underwater exploration.",
        features: ["300m Water Resistance", "Date Display", "Cerachrom Bezel", "41mm Diameter", "Automatic Movement", "Oyster Bracelet"],
        isNew: true,
        isFeatured: false
    },
    {
        name: "Overseas Ultra-Thin",
        brand: "Vacheron Constantin",
        price: 89000,
        images: [
            "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2574&q=80"
        ],
        category: "Luxury",
        description: "Ultra-thin elegance meets sporty sophistication. A masterpiece that transcends time.",
        features: ["Ultra-Thin Case", "Interchangeable Straps", "Steel & Gold", "40mm Diameter", "Automatic Movement", "50m Water Resistant"],
        isNew: true,
        isFeatured: true
    },
    {
        name: "Portugieser Chronograph",
        brand: "IWC",
        price: 8950,
        images: [
            "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2574&q=80",
            "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        category: "Classic",
        description: "Classical elegance with a contemporary edge. Clean dial and refined proportions.",
        features: ["Chronograph", "Small Seconds", "Steel Case", "41mm Diameter", "Automatic Movement", "30m Water Resistant"],
        isNew: true,
        isFeatured: true
    },
    {
        name: "Big Bang Unico",
        brand: "Hublot",
        price: 24500,
        images: [
            "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=988&q=80"
        ],
        category: "Sport",
        description: "The art of fusion. Bold, innovative, and unapologetically different.",
        features: ["Flyback Chronograph", "Skeleton Dial", "Titanium Case", "42mm Diameter", "In-House Movement", "100m Water Resistant"],
        isNew: false,
        isFeatured: false
    },
    {
        name: "Heritage Snowflake",
        brand: "Grand Seiko",
        price: 6200,
        images: [
            "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1408&q=80",
            "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        category: "Luxury",
        description: "Inspired by the snow-covered mountains of Japan. Perfect smooth sweep seconds hand.",
        features: ["Spring Drive Movement", "Titanium Case", "Snowflake Texture Dial", "41mm Diameter", "Power Reserve Indicator", "100m Water Resistant"],
        isNew: true,
        isFeatured: true
    },
    {
        name: "Explorer II",
        brand: "Rolex",
        price: 9500,
        images: [
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=988&q=80",
            "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2574&q=80"
        ],
        category: "Explorer",
        description: "Built for endurance and exploration. The ideal companion for extreme conditions.",
        features: ["GMT Function", "Oystersteel", "42mm Diameter", "Chromalight Display", "Fixed Bezel", "100m Water Resistant"],
        isNew: false,
        isFeatured: true
    },
    {
        name: "Seamaster Planet Ocean",
        brand: "Omega",
        price: 6500,
        images: [
            "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1408&q=80"
        ],
        category: "Diver",
        description: "A professional-grade divers' watch paying homage to Omega's maritime legacy.",
        features: ["600m Water Resistance", "Helium Escape Valve", "Liquidmetal Bezel", "43.5mm Diameter", "Co-Axial Master Chronometer", "Rubber Strap"],
        isNew: false,
        isFeatured: false
    }
];

const seedDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert new products
        const insertedProducts = await Product.insertMany(watches);
        console.log(`✅ Successfully inserted ${insertedProducts.length} watches`);

        // Log inserted products
        insertedProducts.forEach((p, i) => {
            console.log(`   ${i + 1}. ${p.name} - $${p.price.toLocaleString()}`);
        });

        console.log('\n🎉 Database seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
