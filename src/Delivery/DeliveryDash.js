import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FaBoxes, FaClipboardList, FaUsers, FaChartLine, FaTruck, FaShoppingCart, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaEllipsisV } from 'react-icons/fa';
import LiveMapWidget from './LiveMapWidget'; // تم إضافة هذا الاستيراد

// قم بتسجيل مكونات Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// مكون مودال لتعديل حالة الطلب
const EditStatusModal = ({ isOpen, onClose, currentStatus, onSave }) => {
    const [newStatus, setNewStatus] = useState(currentStatus);

    useEffect(() => {
        setNewStatus(currentStatus);
    }, [currentStatus]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-4">Edit Order Status</h3>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Select New Status:
                    </label>
                    <select
                        id="status"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                    >
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="On Progress">On Progress</option>
                    </select>
                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onSave(newStatus);
                            onClose();
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

// مكون مودال لتفاصيل الطلب
const OrderDetailsModal = ({ isOpen, onClose, order }) => {
    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Order Details</h3>
                <div className="space-y-2 text-gray-700">
                    <p><strong>Order ID:</strong> {order.orderId}</p>
                    <p><strong>Client Name:</strong> {order.clientName}</p>
                    <p><strong>Time:</strong> {order.time}</p>
                    <p><strong>Price:</strong> {order.price}</p>
                    <p><strong>Location:</strong> {order.location}</p>
                    <p><strong>Items:</strong> {order.items}</p>
                    <p><strong>Status:</strong> {order.status}</p>

                    {/* Placeholder for items in order - could be dynamic */}
                    <div className="mt-4">
                        <h4 className="font-semibold mb-2">Items in Order:</h4>
                        <ul className="list-disc list-inside text-sm">
                            <li>Item 1 - Quantity: 2</li>
                            <li>Item 2 - Quantity: 1</li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


const App = () => {
    const [recentOrders, setRecentOrders] = useState([
        { orderId: '#ORD001', clientName: 'Ali Ahmad', time: '12:30 PM', price: '$105', location: 'Palestine, Gaza', items: '5 Items', status: 'Pending' },
        { orderId: '#ORD001', clientName: 'Mohammed Sami', time: '01:00 PM', price: '$80', location: 'Palestine, Nablus', items: '3 Items', status: 'On Progress' },
        { orderId: '#ORD001', clientName: 'Fatima Omar', time: '01:45 PM', price: '$120', location: 'Palestine, Ramallah', items: '7 Items', status: 'Completed' },
        { orderId: '#ORD001', clientName: 'Khalid Hassan', time: '02:15 PM', price: '$60', location: 'Palestine, Hebron', items: '2 Items', status: 'Cancelled' },
        { orderId: '#ORD001', clientName: 'Layla Murad', time: '03:00 PM', price: '$95', location: 'Palestine, Jericho', items: '4 Items', status: 'Pending' },
    ]);

    const [showEditStatusModal, setShowEditStatusModal] = useState(false);
    const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // دالة لفتح مودال تعديل الحالة
    const handleEditStatus = (order) => {
        setSelectedOrder(order);
        setShowEditStatusModal(true);
    };

    // دالة لحفظ الحالة الجديدة
    const handleSaveStatus = (newStatus) => {
        if (selectedOrder) {
            setRecentOrders(prevOrders =>
                prevOrders.map(order =>
                    (order.orderId === selectedOrder.orderId && order.clientName === selectedOrder.clientName)
                        ? { ...order, status: newStatus }
                        : order
                )
            );
        }
    };

    // دالة لفتح مودال تفاصيل الطلب
    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setShowOrderDetailsModal(true);
    };

    // بيانات الرسوم البيانية
    const barChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: '#3B82F6', // ازرق
                borderRadius: 5,
            },
            {
                label: 'Orders',
                data: [28, 48, 40, 19, 86, 27, 90],
                backgroundColor: '#22C55E', // اخضر
                borderRadius: 5,
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                },
            },
            title: {
                display: false,
                text: 'Sales & Orders',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#6B7280', // لون النصوص للـ X-axis
                },
            },
            y: {
                grid: {
                    color: '#E5E7EB', // لون خطوط الشبكة للـ Y-axis
                },
                ticks: {
                    color: '#6B7280', // لون النصوص للـ Y-axis
                },
            },
        },
    };


    const doughnutChartData = {
        labels: ['Completed', 'Pending', 'Cancelled', 'On Progress'],
        datasets: [
            {
                data: [3, 2, 1, 1], // استنادًا إلى البيانات الأولية: 3 مكتمل، 2 معلق، 1 ملغى، 1 قيد التقدم
                backgroundColor: ['#22C55E', '#F59E0B', '#EF4444', '#3B82F6'], // اخضر، اصفر، احمر، ازرق
                borderColor: '#ffffff',
                borderWidth: 2,
            },
        ],
    };

    const doughnutChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    padding: 15,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw;
                        const total = context.dataset.data.reduce((sum, current) => sum + current, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
            title: {
                display: false,
                text: 'Order Status Distribution',
            },
        },
        cutout: '70%',
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            </header>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Orders</p>
                        <p className="text-2xl font-semibold text-gray-900">2,345</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                        <FaShoppingCart className="text-blue-600 text-xl" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Delivered</p>
                        <p className="text-2xl font-semibold text-gray-900">1,876</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                        <FaCheckCircle className="text-green-600 text-xl" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Pending</p>
                        <p className="text-2xl font-semibold text-gray-900">320</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-full">
                        <FaHourglassHalf className="text-yellow-600 text-xl" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Cancelled</p>
                        <p className="text-2xl font-semibold text-gray-900">149</p>
                    </div>
                    <div className="p-3 bg-red-100 rounded-full">
                        <FaTimesCircle className="text-red-600 text-xl" />
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <h2 className="text-xl font-semibold mb-4">Sales & Orders</h2>
                    <div className="h-72"> {/* Fixed height for chart container */}
                        <Bar options={barChartOptions} data={barChartData} />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
                    <h2 className="text-xl font-semibold mb-4">Order Status Distribution</h2>
                    <div className="flex-grow flex items-center justify-center h-72"> {/* Adjusted for better centering */}
                        <Doughnut options={doughnutChartOptions} data={doughnutChartData} />
                    </div>
                </div>
            </div>

            {/* Recent Orders Table and Live Map Widget */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Recent Orders</h2>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentOrders.map((order, index) => (
                                    <tr key={index}> {/* Using index as key, consider unique orderId in real app */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.clientName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.time}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                                                ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                ${order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''}
                                                ${order.status === 'On Progress' ? 'bg-blue-100 text-blue-800' : ''}
                                            `}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="relative group">
                                                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                                    <FaEllipsisV />
                                                </button>
                                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block z-10">
                                                    <button
                                                        onClick={() => handleEditStatus(order)}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Edit Status
                                                    </button>
                                                    <button
                                                        onClick={() => handleViewDetails(order)}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Live Map Widget */}
                <div>
                    <LiveMapWidget /> {/* تم استبدال الـ div بالكامل بمكون LiveMapWidget */}
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