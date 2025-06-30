import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import { Link } from 'react-router-dom';

// Edit Status Modal Component (no changes needed for this one)
const EditStatusModal = ({ isOpen, onClose, currentStatus, onSave }) => {
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);

    useEffect(() => {
        setSelectedStatus(currentStatus);
    }, [currentStatus]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave(selectedStatus);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 relative">
                <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: '#1F2937' }}>Edit Status</h3>
                <div className="mb-6">
                    <label htmlFor="status-select" className="block text-sm font-medium mb-2" style={{ color: '#4B5563' }}>Status</label>
                    <div className="relative">
                        <select
                            id="status-select"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            style={{ color: '#374151', borderColor: '#D1D5DB' }}
                        >
                            <option value="">Update To..</option>
                            <option value="Picked Up">Picked Up</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Canceled">Canceled</option>
                        </select>
                        {/* Custom arrow for select dropdown */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 rounded-md font-semibold transition-colors"
                        style={{ backgroundColor: '#22C55E', color: '#FFFFFF', '&:hover': { backgroundColor: '#16A34A' } }}
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-md font-semibold transition-colors"
                        style={{ backgroundColor: '#F3F4F6', color: '#4B5563', '&:hover': { backgroundColor: '#E5E7EB' } }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

// Order Details Modal Component
const OrderDetailsModal = ({ isOpen, onClose, order }) => {
    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto"> {/* Added max-h-[90vh] and overflow-y-auto */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: '#1F2937' }}>Order Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Customer Info */}
                    <div className="flex items-center space-x-3 mb-4 md:col-span-2">
                        {/* <img src="https://via.placeholder.com/40" alt="Avatar" className="w-10 h-10 rounded-full" /> */}
                        <div>
                            <p className="font-semibold text-lg" style={{ color: '#1F2937' }}>{order.clientName}</p>
                            <p className="text-sm" style={{ color: '#4B5563' }}>{order.address}</p>
                        </div>
                    </div>

                    {/* Order ID and Assigned Time */}
                    <div className="flex justify-between items-center md:col-span-2">
                        <p className="text-sm" style={{ color: '#4B5563' }}>Order ID: <span className="font-semibold" style={{ color: '#1F2937' }}>{order.orderId}</span></p>
                        <p className="text-sm" style={{ color: '#4B5563' }}>Assigned: <span className="font-semibold" style={{ color: '#1F2937' }}>12:30 PM</span></p>
                    </div>

                    {/* Order Status Timeline (simplified for display) */}
                    <div className="md:col-span-2">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                            <span>Picking Up</span>
                            <span>In Transit</span>
                            <span>Delivered</span>
                        </div>
                        <div className="relative h-2 bg-gray-200 rounded-full">
                            <div className="absolute left-0 top-0 h-full bg-green-500 rounded-full" style={{ width: order.status === 'Picked Up' ? '25%' : order.status === 'In Transit' ? '50%' : order.status === 'Delivered' ? '100%' : '0%' }}></div>
                            <div className="absolute top-1/2 -translate-y-1/2 left-[25%] w-3 h-3 rounded-full bg-gray-400" style={{ backgroundColor: order.status === 'Picked Up' || order.status === 'In Transit' || order.status === 'Delivered' ? '#22C55E' : '#9CA3AF' }}></div>
                            <div className="absolute top-1/2 -translate-y-1/2 left-[50%] w-3 h-3 rounded-full bg-gray-400" style={{ backgroundColor: order.status === 'In Transit' || order.status === 'Delivered' ? '#22C55E' : '#9CA3AF' }}></div>
                            <div className="absolute top-1/2 -translate-y-1/2 left-[75%] w-3 h-3 rounded-full bg-gray-400" style={{ backgroundColor: order.status === 'Delivered' ? '#22C55E' : '#9CA3AF' }}></div>
                        </div>
                    </div>

                    {/* Location Details */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="font-semibold mb-3" style={{ color: '#1F2937' }}>Location Details</h4>
                        <div className="relative w-full h-32 rounded-md overflow-hidden mb-3">
                            <img
                                src="/imges/map.png"
                                alt="Map Placeholder"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1 bg-white rounded-full shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#22C55E' }}>
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                        </div>
                        <p className="text-sm mb-1" style={{ color: '#4B5563' }}>Current Location: Palestine, Gaza</p>
                        <p className="text-sm" style={{ color: '#4B5563' }}>ETA: 15 min</p>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="font-semibold mb-3" style={{ color: '#1F2937' }}>Payment Details</h4>
                        <div className="flex justify-between items-center text-sm mb-1" style={{ color: '#4B5563' }}>
                            <span>Subtotal</span>
                            <span className="font-semibold" style={{ color: '#1F2937' }}>$105</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mb-1" style={{ color: '#4B5563' }}>
                            <span>Shipping Fees</span>
                            <span className="font-semibold" style={{ color: '#1F2937' }}>Fixed</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mb-3" style={{ color: '#4B5563' }}>
                            <span>Total</span>
                            <span className="font-semibold text-lg" style={{ color: '#1F2937' }}>$109</span>
                        </div>
                        <p className="text-sm" style={{ color: '#4B5563' }}>Credit Card **** **** **** 4242</p>
                        <p className="text-sm" style={{ color: '#4B5563' }}>Order Status: <span className="font-semibold text-green-500">{order.status}</span></p>
                    </div>
                </div>

                {/* Items in Order */}
                <div>
                    <h4 className="font-semibold mb-3" style={{ color: '#1F2937' }}>Items in Order (5 Items)</h4>
                    <div className="space-y-3"> {/* Removed max-h-40 and overflow-y-auto from here as it's now on the main modal container */}
                        <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-md border border-gray-200">
                            <img src="/imges/ma4.webp" alt="Item" className="w-12 h-12 rounded" />
                            <div>
                                <p className="font-semibold text-sm" style={{ color: '#1F2937' }}>Jasmine flower</p>
                                <p className="text-xs" style={{ color: '#4B5563' }}>1 Item</p>
                            </div>
                            <p className="ml-auto font-semibold text-sm" style={{ color: '#1F2937' }}>$25</p>
                        </div>
                        <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-md border border-gray-200">
                            <img src="/imges/ma5.webp" alt="Item" className="w-12 h-12 rounded" />
                            <div>
                                <p className="font-semibold text-sm" style={{ color: '#1F2937' }}>Anemonee</p>
                                <p className="text-xs" style={{ color: '#4B5563' }}>2 item</p>
                            </div>
                            <p className="ml-auto font-semibold text-sm" style={{ color: '#1F2937' }}>$40</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};


const App = () => {
    const [recentOrders, setRecentOrders] = useState([
        {
            orderId: '#ORD001',
            clientName: 'Rawan Ahmad',
            date: '10Oct2025',
            address: 'Rafah, Talahwton',
            status: 'In Transit',
        },
        {
            orderId: '#ORD001',
            clientName: 'Alaa Algarny',
            date: '10Oct2025',
            address: 'Gaza, Alremail',
            status: 'Picked Up',
        },
        {
            orderId: '#ORD001',
            clientName: 'Marym Eqith',
            date: '10Oct2025',
            address: 'Gaza, Alnasr',
            status: 'Picked Up',
        },
        {
            orderId: '#ORD001',
            clientName: 'Amina Emad',
            date: '10Oct2025',
            address: 'Almaghad,Alshouka',
            status: 'Canceled',
        },
        {
            orderId: '#ORD001',
            clientName: 'Dana Ismael',
            date: '10Oct2025',
            address: 'Jabalial,alBalad',
            status: 'In Transit',
        },
    ]);

    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const [showEditStatusModal, setShowEditStatusModal] = useState(false);
    const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleEditClick = (order) => {
        setSelectedOrder(order);
        setShowEditStatusModal(true);
    };

    const handleViewDetailsClick = (order) => {
        setSelectedOrder(order);
        setShowOrderDetailsModal(true);
    };

    const handleSaveStatus = (newStatus) => {
        if (selectedOrder) {
            setRecentOrders(prevOrders =>
                prevOrders.map(order =>
                    order.orderId === selectedOrder.orderId && order.clientName === selectedOrder.clientName // Assuming orderId and clientName together are unique enough for demo
                        ? { ...order, status: newStatus }
                        : order
                )
            );
        }
    };


    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    datasets: [
                        {
                            label: 'Deliveries',
                            data: [15, 20, 30, 54, 35, 25, 40],
                            borderColor: '#34D399',
                            backgroundColor: 'rgba(52, 211, 153, 0.2)',
                            tension: 0.4,
                            fill: true,
                            pointRadius: 0,
                            borderWidth: 2,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                color: '#6B7280',
                            },
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: '#E5E7EB',
                                borderDash: [5, 5],
                            },
                            ticks: {
                                callback: function (value) {
                                    return value + 'k';
                                },
                                color: '#6B7280',
                            },
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    const SummaryCard = ({ title, value, percentage, type, hideDetails = false }) => (
        <div className="bg-white rounded-lg shadow-sm p-2 flex flex-col justify-between h-auto">
            <div>
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm" style={{ color: '#6B7280' }}>{title}</p>
                </div>
                <p className="text-3xl font-bold" style={{ color: '#1F2937' }}>{value}</p>
                {percentage && (
                    <p className="text-sm flex items-center">
                        <span className={`font-semibold ${percentage.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                            {percentage}
                        </span>
                        <span style={{ color: '#6B7280' }} className="ml-1">last 7 days</span>
                    </p>
                )}
                {type === 'delivered' && (
                    <p className="text-sm" style={{ color: '#6B7280' }}>
                        <span className="font-semibold">100 order</span>
                        <span className="mx-1">~</span>
                        <span>14.4%</span>
                        <span className="block mt-1">Previous 7days (10)</span>
                    </p>
                )}
                {type === 'transit-canceled' && (
                    <div className="text-sm" style={{ color: '#6B7280' }}>
                        <p>
                            In Transit <span className="font-semibold" style={{ color: '#1F2937' }}>20</span> from 30
                        </p>
                        <p>
                            Canceled <span className="font-semibold" style={{ color: '#EF4444' }}>5</span>
                            <span className="ml-1 inline-flex items-center" style={{ color: '#EF4444' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-0.5">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                                14.4%
                            </span>
                        </p>
                    </div>
                )}
            </div>

        </div>
    );

    const EfficiencyMetric = ({ value, label, unit }) => (
        <div className="flex flex-col items-center p-2">
            <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>{value}{unit}</p>
            <p className="text-sm text-center" style={{ color: '#6B7280' }}>{label}</p>
        </div>
    );

    const TodoItem = ({ status, text }) => (
        <div className="flex items-center space-x-3 mb-2 shadow-md px-2 py-3">
            <div
                className={`w-3 h-3 rounded-full`}
                style={{
                    backgroundColor:
                        status === 'completed'
                            ? '#22C55E'
                            : status === 'next-stop'
                                ? '#F59E0B'
                                : status === 'delayed'
                                    ? '#EF4444'
                                    : '#9CA3AF'
                }}
            ></div>
            <p className="text-sm" style={{ color: '#374151' }}>{text}</p>
        </div>
    );

    return (
        <div className="min-h-screen font-sans p-4 sm:p-6 lg:p-8" style={{ backgroundColor: '#F3F4F6', color: '#1F2937' }}>
            {/* Top Section: Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <SummaryCard title="New Orders" value="15" percentage="+10.4%" />
                <SummaryCard title="Delivered This Week" value="100" type="delivered" />
                <SummaryCard title="In Transit & Canceled" value="" type="transit-canceled" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                {/* Route Efficiency Report */}
                <div className="bg-white rounded-lg shadow-sm p-4 lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Route Efficiency Report</h2>

                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        <EfficiencyMetric value="52" label="Total Deliveries" unit="k" />
                        <EfficiencyMetric value="2" label="Avg. Delivery Time" unit=" Days" />
                        <EfficiencyMetric value="120" label="Total Distance" unit="Km" />
                        <EfficiencyMetric value="3" label="Delayed Orders" unit=" Orders" />
                    </div>

                    {/* Chart.js integration */}
                    <div className="relative p-4 rounded-md h-48 flex items-center justify-center border border-dashed"
                        style={{ backgroundColor: '#F9FAFB', borderColor: '#D1D5DB' }}>
                        <canvas ref={chartRef}></canvas>
                        {/* Manual annotation for Thursday */}
                        <div className="absolute" style={{ left: '60%', top: '10%' }}>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-1/2 w-px border-l border-dashed" style={{ height: 'calc(100% + 50px)', borderColor: '#9CA3AF' }}></div>
                                <div className="absolute left-1/2 -ml-8 -mt-2 text-xs px-2 py-1 rounded-md shadow-sm"
                                    style={{ color: '#374151', backgroundColor: '#FFFFFF' }}>
                                    Thursday 54k
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-left mt-2" style={{ color: '#6B7280' }}>01 Oct | 11:29 am</p>
                </div>

                {/* Quick Daily ToDo Panel */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Quick Daily ToDo Panel</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#9CA3AF' }}>
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                    </div>
                    <div className="space-y-3">
                        <TodoItem status="completed" text="Completed Deliveries: 3/8" />
                        <TodoItem status="next-stop" text="Next Stop: [Almasr/Gaza]" />
                        <TodoItem status="delayed" text="One delivery is delayed! Check status" />
                        <TodoItem status="deadline" text="Deadline: Finish all by 8:00 PM" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Recent Orders Table */}
                <div className="bg-white rounded-lg shadow-sm p-4 lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Recent Orders Table</h2>

                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y" style={{ borderColor: '#E5E7EB' }}>
                            <thead style={{ backgroundColor: '#F9FAFB' }}>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        style={{ color: '#6B7280' }}>
                                        Order Id
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        style={{ color: '#6B7280' }}>
                                        Client Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        style={{ color: '#6B7280' }}>
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        style={{ color: '#6B7280' }}>
                                        Address
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        style={{ color: '#6B7280' }}>
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        style={{ color: '#6B7280' }}>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y" style={{ borderColor: '#E5E7EB' }}>
                                {recentOrders.map((order, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: '#1F2937' }}>
                                            {order.orderId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#4B5563' }}>
                                            {order.clientName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#4B5563' }}>
                                            {order.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#4B5563' }}>
                                            {order.address}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                                                style={{
                                                    backgroundColor:
                                                        order.status === 'In Transit'
                                                            ? '#FFFBEB'
                                                            : order.status === 'Picked Up'
                                                                ? '#D1FAE5'
                                                                : order.status === 'Canceled'
                                                                    ? '#FEE2E2'
                                                                    : null,
                                                    color:
                                                        order.status === 'In Transit'
                                                            ? '#92400E'
                                                            : order.status === 'Picked Up'
                                                                ? '#065F46'
                                                                : order.status === 'Canceled'
                                                                    ? '#991B1B'
                                                                    : null
                                                }}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button onClick={() => handleEditClick(order)} className="hover:text-gray-900" style={{ color: '#4B5563' }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                    </svg>
                                                </button>
                                                <button onClick={() => handleViewDetailsClick(order)} className="hover:text-gray-900" style={{ color: '#4B5563' }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                        <circle cx="12" cy="12" r="3"></circle>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 text-center">
                        <Link to="Order" className="no-underline px-6 py-2 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                            style={{ color: '#374151', backgroundColor: '#F3F4F6' }}>
                            Details
                        </Link>
                    </div>
                </div>

                {/* Live Map Widget Layout */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Live Map Widget Layout</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#9CA3AF' }}>
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                    </div>
                    {/* Placeholder for the map */}
                    <div className="relative w-full h-48 rounded-md overflow-hidden mb-4" style={{ backgroundColor: '#E5E7EB' }}>
                        <img
                            src="/imges/map.png"
                            alt="Map Placeholder"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x200/cccccc/333333?text=Map+Error'; }}
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#22C55E' }}>
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        </div>
                    </div>
                    <p className="text-sm mb-2" style={{ color: '#4B5563' }}>Current Location: Jatiala</p>
                    <p className="text-sm mb-2" style={{ color: '#4B5563' }}>Next Stop: Almosa/Gaza</p>
                    <p className="text-sm mb-2" style={{ color: '#4B5563' }}>ETA: 15 min</p>
                    <div className="w-full rounded-full h-2.5 mb-2" style={{ backgroundColor: '#E5E7EB' }}>
                        <div className="h-2.5 rounded-full" style={{ width: '50%', backgroundColor: '#22C55E' }}></div>
                    </div>
                    <p className="text-sm" style={{ color: '#4B5563' }}>Progress: ●●●●●●● 3/6</p>
                </div>
            </div>

            {/* Modals */}
            <EditStatusModal
                isOpen={showEditStatusModal}
                onClose={() => setShowEditStatusModal(false)}
                currentStatus={selectedOrder ? selectedOrder.status : ''}
                onSave={handleSaveStatus}
            />
            <OrderDetailsModal
                isOpen={showOrderDetailsModal}
                onClose={() => setShowOrderDetailsModal(false)}
                order={selectedOrder}
            />
        </div>
    );
};

export default App;