export const initialOrders = [
    {
        id: 'ORD-7234',
        customerId: 1,
        customerName: 'James Miller',
        email: 'james.m@example.com',
        items: [
            { id: 1, name: 'Royal Oak Perpetual Calendar', quantity: 1, price: 145000, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=2360&q=80' }
        ],
        status: 'Delivered',
        date: '2023-12-18T14:30:00Z',
        shippingAddress: '123 Luxury Ave, Beverly Hills, CA 90210'
    },
    {
        id: 'ORD-7233',
        customerId: 2,
        customerName: 'Sophia Chen',
        email: 'sophia.c@example.com',
        items: [
            { id: 2, name: 'Nautilus Travel Time', quantity: 1, price: 115000, image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2360&q=80' }
        ],
        status: 'Processing',
        date: '2023-12-19T09:15:00Z',
        shippingAddress: '456 Silk Road, San Francisco, CA 94105'
    },
    {
        id: 'ORD-7232',
        customerId: 3,
        customerName: 'Robert Wilson',
        email: 'robert.w@example.com',
        items: [
            { id: 3, name: 'Daytona Cosmograph', quantity: 1, price: 35000, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=988&q=80' }
        ],
        status: 'Shipped',
        date: '2023-12-19T11:45:00Z',
        shippingAddress: '789 Racing Blvd, Miami, FL 33101'
    },
    {
        id: 'ORD-7231',
        customerId: 4,
        customerName: 'Elena Rodriguez',
        email: 'elena.r@example.com',
        items: [
            { id: 4, name: 'Speedmaster Moonwatch', quantity: 1, price: 7500, image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80' }
        ],
        status: 'Pending',
        date: '2023-12-20T08:20:00Z',
        shippingAddress: '101 Lunar Way, Houston, TX 77001'
    }
];

export const initialCustomers = [
    {
        id: 1,
        name: 'James Miller',
        email: 'james.m@example.com',
        phone: '+1 310-555-0101',
        joinedDate: '2023-01-15',
        totalOrders: 3,
        totalSpend: 285400,
        status: 'Active'
    },
    {
        id: 2,
        name: 'Sophia Chen',
        email: 'sophia.c@example.com',
        phone: '+1 415-555-0102',
        joinedDate: '2023-03-22',
        totalOrders: 1,
        totalSpend: 115000,
        status: 'Active'
    },
    {
        id: 3,
        name: 'Robert Wilson',
        email: 'robert.w@example.com',
        phone: '+1 305-555-0103',
        joinedDate: '2023-05-10',
        totalOrders: 2,
        totalSpend: 42500,
        status: 'Active'
    },
    {
        id: 4,
        name: 'Elena Rodriguez',
        email: 'elena.r@example.com',
        phone: '+1 713-555-0104',
        joinedDate: '2023-08-05',
        totalOrders: 1,
        totalSpend: 7500,
        status: 'Inactive'
    }
];
