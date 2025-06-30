import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

import Chart from 'chart.js/auto'; // Import Chart.js
import {
  FiTruck,        // Corresponds to 'Truck'
  FiPackage,      // Corresponds to 'Package'
  FiClock,        // Corresponds to 'Clock'
  FiMapPin,       // Corresponds to 'MapPin'
  FiSearch,       // Corresponds to 'Search'
  FiPhone,        // Corresponds to 'Phone'
  FiMap,          // A good alternative for 'LocateFixed'/'Track'
  FiMoreVertical, // Corresponds to 'MoreVertical'
  FiChevronLeft,  // Corresponds to 'ChevronLeft'
  FiChevronRight, // Corresponds to 'ChevronRight'
  FiFilter,       // Corresponds to 'Filter'
  FiEdit,         // Corresponds to 'Edit'
  FiEye,          // Corresponds to 'Eye'
  FiCheck,        // Corresponds to 'Check'
  FiX,            // Corresponds to 'X'
  FiCreditCard // Added for Payment Details section
} from 'react-icons/fi';


// Helper function to render Lucide-like icons using react-icons/fi
const Icon = ({ name, size = 20, color = 'currentColor', className = '' }) => {
  switch (name) {
    case 'Truck':
      return <FiTruck size={size} color={color} className={className} />;
    case 'Package':
      return <FiPackage size={size} color={color} className={className} />;
    case 'Clock':
      return <FiClock size={size} color={color} className={className} />;
    case 'MapPin':
      return <FiMapPin size={size} color={color} className={className} />;
    case 'Search':
      return <FiSearch size={size} color={color} className={className} />;
    case 'Phone':
      return <FiPhone size={size} color={color} className={className} />;
    case 'LocateFixed': // Using FiMap as a close alternative for 'LocateFixed' or 'Track'
      return <FiMap size={size} color={color} className={className} />;
    case 'MoreVertical':
      return <FiMoreVertical size={size} color={color} className={className} />;
    case 'ChevronLeft':
      return <FiChevronLeft size={size} color={color} className={className} />;
    case 'ChevronRight':
      return <FiChevronRight size={size} color={color} className={className} />;
    case 'Filter':
      return <FiFilter size={size} color={color} className={className} />;
    case 'Edit':
      return <FiEdit size={size} color={color} className={className} />;
    case 'Eye':
      return <FiEye size={size} color={color} className={className} />;
    case 'Check':
      return <FiCheck size={size} color={color} className={className} />;
    case 'X':
      return <FiX size={size} color={color} className={className} />;
    case 'CreditCard':
        return <FiCreditCard size={size} color={color} className={className} />;
    default:
      return null;
  }
};


// OrderDetailsModal Component - Corrected for ESLint Rules of Hooks
const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  // All hooks must be called unconditionally at the top level of your component.
  const modalRef = useRef(null);

  // Close modal if clicked outside or on Escape key
  useEffect(() => {
    // Only attach event listeners if the modal is actually open
    if (isOpen) {
      const handleClickOutside = (event) => {
        // Check if click is outside the modal content
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();
        }
      };

      const handleEscapeKey = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);

      // Cleanup function to remove event listeners
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
    // Effect runs when isOpen or onClose changes.
    // If isOpen becomes false, the cleanup function from the previous render (where isOpen was true)
    // will correctly remove the event listeners.
  }, [isOpen, onClose]); // Dependencies: Re-run effect if isOpen or onClose changes

  // Now, you can conditionally return null (or render nothing) after the hooks have been called.
  if (!isOpen || !order) {
    return null;
  }

  // Define styles here or import them (as they were in your original snippet)
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalContentContainerStyle = {
    backgroundColor: '#F3F4F6', // Lighter gray background for the container
    borderRadius: '0.75rem', // rounded-lg
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    width: '95%', // w-95
    maxWidth: '1200px', // max-w-5xl
    maxHeight: '90vh', // h-90vh
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const modalHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.5rem', // p-4, px-6
    backgroundColor: '#FFFFFF', // bg-white
    borderBottom: '1px solid #E5E7EB', // border-b border-gray-200
    borderRadius: '0.75rem 0.75rem 0 0', // rounded-t-lg
  };

  const closeButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '0.375rem',
  };

  const modalBodyStyle = {
    padding: '1.5rem', // p-6
    flexGrow: 1, // Allow content to grow
    overflowY: 'auto', // Enable scrolling for body content
    backgroundColor: '#F3F4F6', // bg-gray-100
  };

  return (
    <div className="modal-overlay" style={modalOverlayStyle}>
      <div ref={modalRef} className="modal-content-container" style={modalContentContainerStyle}>
        <div className="modal-header" style={modalHeaderStyle}>
          <h2 className="text-xl font-semibold" style={{ color: '#1F2937' }}>Order Details</h2>
          <button onClick={onClose} className="close-button" style={closeButtonStyle}>
            <Icon name="X" size={24} color="#9CA3AF" />
          </button>
        </div>

        <div className="modal-body" style={modalBodyStyle}>
          {/* Top Section: Client Info & Status Progress */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4 md:mb-0">
              <img
                src={order.avatar}
                alt={order.customerDetails.name}
                className="w-16 h-16 rounded-full border-2"
                style={{ borderColor: '#E5E7EB' }}
              />
              <div>
                <p className="text-lg font-semibold" style={{ color: '#1F2937' }}>{order.customerDetails.name}</p>
                <p className="text-sm" style={{ color: '#6B7280' }}>(ID: {order.customerDetails.id})</p>
                <p className="text-sm" style={{ color: '#6B7280' }}>{order.customerDetails.location}</p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end space-y-2">
              <p className="text-sm font-medium" style={{ color: '#4B5563' }}>Assigned: {order.customerDetails.assignedTime}</p>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 rtl:space-x-reverse px-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: '#22C55E' }}>
                  <Icon name="Phone" size={16} />
                  <span>Call</span>
                </button>
                <button className="flex items-center space-x-1 rtl:space-x-reverse px-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: '#22C55E' }}>
                  <Icon name="Chat" size={16} />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* Order Progress Line (from image) */}
          <div className="flex justify-between items-center relative py-4 mb-6 px-4 bg-white rounded-lg shadow-sm">
            {order.progress.map((step, index) => {
              const isCanceledOrder = order.status === 'Canceled';
              const isCurrentStepCanceled = step === 'Canceled';
              const isActiveStepInNormalFlow = index <= order.currentProgressIndex && !isCanceledOrder;

              let circleBgColor = '#FFFFFF';
              let circleBorderColor = '#D1D5DB';
              let textColor = '#6B7280';
              let lineColor = '#D1D5DB';
              let iconComponent = null;

              if (isCanceledOrder && isCurrentStepCanceled) {
                circleBgColor = '#DC2626';
                circleBorderColor = '#DC2626';
                iconComponent = <Icon name="X" size={12} color="white" />;
              } else if (isActiveStepInNormalFlow) {
                circleBgColor = '#22C55E';
                circleBorderColor = '#22C55E';
                iconComponent = <Icon name="Check" size={12} color="white" />; // Changed color to white for checkmark on green circle
              }

              if (index < order.progress.length - 1) {
                const nextStep = order.progress[index + 1];
                const nextStepIsCanceled = nextStep === 'Canceled';

                if (isCanceledOrder && (isCurrentStepCanceled || (order.currentProgressIndex > index && nextStepIsCanceled))) {
                  lineColor = '#DC2626';
                } else if (index < order.currentProgressIndex && !isCanceledOrder) {
                  lineColor = '#22C55E';
                }
              }

              return (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center flex-1 min-w-0">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center`}
                      style={{
                        backgroundColor: circleBgColor,
                        borderColor: circleBorderColor,
                        minWidth: '20px', // Ensure circles don't shrink too much
                        minHeight: '20px',
                      }}
                    >
                      {iconComponent}
                    </div>
                    <p className={`mt-2 text-xs text-center ${index === order.currentProgressIndex ? 'font-semibold' : 'font-normal'}`}
                      style={{ color: textColor }}>
                      {step.replace(' ', '\n')}
                    </p>
                  </div>
                  {index < order.progress.length - 1 && (
                    <div className={`flex-1 h-0.5`} style={{ backgroundColor: lineColor }}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Main Content: Order ID, Items, Location, Payment */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order ID & Items */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: '#1F2937' }}>Order Id: {order.customerDetails.orderNumber}</h3>
                <span className="text-sm font-medium" style={{ color: '#6B7280' }}>{order.customerDetails.itemsCount} Items</span>
              </div>
              <div className="space-y-3">
                {order.customerDetails.products.map((product, index) => (
                  <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium" style={{ color: '#1F2937' }}>{product.name}</p>
                      <p className="text-sm" style={{ color: '#6B7280' }}>${product.price}.00</p>
                      <p className="text-xs" style={{ color: '#9CA3AF' }}>{product.quantity} Items</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Details */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Location Details</h3>
              <img src={order.customerDetails.locationDetails.mapImage} alt="Map" className="w-full h-48 object-cover rounded-lg mb-4" />
              <div className="space-y-2 text-sm" style={{ color: '#4B5563' }}>
                <p className="font-medium">ETA: {order.customerDetails.locationDetails.eta}</p>
                <p>Current Location: {order.customerDetails.locationDetails.currentLocation}</p>
                <p>Customer Location: {order.customerDetails.locationDetails.customerLocation}</p>
              </div>
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 mt-4 rounded-lg text-white font-medium w-full justify-center"
                style={{ backgroundColor: '#22C55E' }}>
                <Icon name="LocateFixed" size={16} />
                <span>Track</span>
              </button>
            </div>

            {/* Payment Details */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Payment Details</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between" style={{ color: '#4B5563' }}>
                  <span>Subtotal</span>
                  <span>${order.customerDetails.paymentDetails.subtotal}</span>
                </div>
                <div className="flex justify-between" style={{ color: '#4B5563' }}>
                  <span>Shipping Cost</span>
                  <span className="font-semibold" style={{color: '#22C55E'}}>{order.customerDetails.paymentDetails.shippingCost}</span>
                </div>
                <div className="flex justify-between" style={{ color: '#4B5563' }}>
                  <span>Discount</span>
                  <span>{order.customerDetails.paymentDetails.discount}</span>
                </div>
                <div className="flex justify-between pt-2 border-t" style={{ borderColor: '#E5E7EB', color: '#1F2937' }}>
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold">${order.customerDetails.paymentDetails.total}</span>
                </div>
              </div>

              <h4 className="font-semibold mb-2" style={{ color: '#1F2937' }}>Credit Card</h4>
              <div className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: '#D1D5DB' }}>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Icon name="CreditCard" size={24} style={{ color: '#9CA3AF' }} />
                  <span className="font-medium" style={{ color: '#1F2937' }}>{order.customerDetails.paymentDetails.creditCard}</span>
                </div>
                {/* <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/PayPal_Logo_set_2014.svg" alt="PayPal" className="h-6" /> */}
              </div>

              <div className="mt-4 text-sm" style={{ color: '#6B7280' }}>
                Order Statuses: <span className="font-semibold text-blue-600 flex items-center inline-flex space-x-1 rtl:space-x-reverse">
                  <FiTruck size={16} /> {order.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const App = () => {
  // Placeholder data for demonstration
  const originalOrders = [
    {
      orderId: '00075',
      clientName: 'Yara Yazgi',
      avatar: 'https://placehold.co/40x40/B3E5FC/2196F3?text=YY',
      date: '10Oct2025',
      address: 'Ramallah, Al-Tireh St',
      assignedTime: '12:30 PM',
      status: 'Picked Up',
      progress: ['Waiting Picked up', 'Picked Up', 'In Transit', 'Delivered'],
      currentProgressIndex: 1,
      customerDetails: { // Added customerDetails for modal
        id: 'CUST001',
        name: 'Yara Yazgi',
        location: 'Ramallah, Al-Tireh St',
        assignedTime: '12:30 PM',
        orderNumber: '00075',
        itemsCount: 2,
        products: [
          { name: 'Olive Tree', image: '/imges/ma1.webp', price: 50, quantity: 1 },
          { name: 'Jasmine', image: '/imges/ma4.webp', price: 20, quantity: 1 },
        ],
        locationDetails: {
          eta: '25 min',
          currentLocation: 'Near Beitunia checkpoint',
          customerLocation: 'Al-Tireh St, Ramallah',
          mapImage: 'map.png',
        },
        paymentDetails: {
          subtotal: '70.00',
          shippingCost: 'Free',
          discount: '$0.00',
          total: '70.00',
          creditCard: '**** **** **** 1234',
        },
      },
    },
    {
      orderId: '00076',
      clientName: 'Nael Abd',
      avatar: 'https://placehold.co/40x40/FFCCBC/E64A19?text=NA',
      date: '10Oct2025',
      address: 'Gaza, Al-Rimail St',
      assignedTime: '10:30 PM',
      status: 'In Transit',
      progress: ['Waiting Picked up', 'Picked Up', 'In Transit', 'Delivered'],
      currentProgressIndex: 2,
      customerDetails: {
        id: 'CUST002',
        name: 'Nael Abd',
        location: 'Gaza, Al-Rimail St',
        assignedTime: '10:30 PM',
        orderNumber: '00076',
        itemsCount: 1,
        products: [
          { name: 'Imported Coffee', image: 'https://via.placeholder.com/60', price: 35, quantity: 1 },
        ],
        locationDetails: {
          eta: '15 min',
          currentLocation: 'Near Gaza Port',
          customerLocation: 'Al-Rimail St, Gaza',
          mapImage: 'https://via.placeholder.com/400x200?text=Map+of+Gaza',
        },
        paymentDetails: {
          subtotal: '35.00',
          shippingCost: '$5.00',
          discount: '$0.00',
          total: '40.00',
          creditCard: '**** **** **** 5678',
        },
      },
    },
    {
      orderId: '00077',
      clientName: 'Yara Yazgi',
      avatar: 'https://placehold.co/40x40/B3E5FC/2196F3?text=YY',
      date: '10Oct2025',
      address: 'Ramallah, Al-Tireh St',
      assignedTime: '12:30 PM',
      status: 'In Transit',
      progress: ['Waiting Picked up', 'Picked Up', 'In Transit', 'Delivered'],
      currentProgressIndex: 2,
      customerDetails: {
        id: 'CUST003',
        name: 'Yara Yazgi',
        location: 'Ramallah, Al-Tireh St',
        assignedTime: '12:30 PM',
        orderNumber: '00077',
        itemsCount: 3,
        products: [
          { name: 'Bread', image: 'https://via.placeholder.com/60', price: 5, quantity: 2 },
          { name: 'Cheese', image: 'https://via.placeholder.com/60', price: 15, quantity: 1 },
        ],
        locationDetails: {
          eta: '10 min',
          currentLocation: 'Near Ramallah City Center',
          customerLocation: 'Al-Tireh St, Ramallah',
          mapImage: 'https://via.placeholder.com/400x200?text=Map+of+Ramallah',
        },
        paymentDetails: {
          subtotal: '25.00',
          shippingCost: 'Free',
          discount: '$2.00',
          total: '23.00',
          creditCard: '**** **** **** 9012',
        },
      },
    },
    {
      orderId: '00078',
      clientName: 'Ahmed Ali',
      avatar: 'https://placehold.co/40x40/C8E6C9/4CAF50?text=AA',
      date: '11Oct2025',
      address: 'Nablus, Main St',
      assignedTime: '09:00 AM',
      status: 'Waiting Picked up',
      progress: ['Waiting Picked up', 'Picked Up', 'In Transit', 'Delivered'],
      currentProgressIndex: 0,
      customerDetails: {
        id: 'CUST004',
        name: 'Ahmed Ali',
        location: 'Nablus, Main St',
        assignedTime: '09:00 AM',
        orderNumber: '00078',
        itemsCount: 1,
        products: [
          { name: 'Laptop', image: 'https://via.placeholder.com/60', price: 1200, quantity: 1 },
        ],
        locationDetails: {
          eta: '45 min',
          currentLocation: 'Near Nablus Old City',
          customerLocation: 'Main St, Nablus',
          mapImage: 'https://via.placeholder.com/400x200?text=Map+of+Nablus',
        },
        paymentDetails: {
          subtotal: '1200.00',
          shippingCost: '$10.00',
          discount: '$50.00',
          total: '1160.00',
          creditCard: '**** **** **** 3456',
        },
      },
    },
    {
      orderId: '00079',
      clientName: 'Sara Omar',
      avatar: 'https://placehold.co/40x40/F8BBD0/E91E63?text=SO',
      date: '11Oct2025',
      address: 'Jenin, University Rd',
      assignedTime: '01:00 PM',
      status: 'Delivered',
      progress: ['Waiting Picked up', 'Picked Up', 'In Transit', 'Delivered'],
      currentProgressIndex: 3,
      customerDetails: {
        id: 'CUST005',
        name: 'Sara Omar',
        location: 'Jenin, University Rd',
        assignedTime: '01:00 PM',
        orderNumber: '00079',
        itemsCount: 4,
        products: [
          { name: 'Books', image: 'https://via.placeholder.com/60', price: 75, quantity: 4 },
        ],
        locationDetails: {
          eta: '30 min',
          currentLocation: 'Near Jenin Refugee Camp',
          customerLocation: 'University Rd, Jenin',
          mapImage: 'https://via.placeholder.com/400x200?text=Map+of+Jenin',
        },
        paymentDetails: {
          subtotal: '75.00',
          shippingCost: 'Free',
          discount: '$0.00',
          total: '75.00',
          creditCard: '**** **** **** 7890',
        },
      },
    },
    {
      orderId: '00080',
      clientName: 'Omar Khaled',
      avatar: 'https://placehold.co/40x40/D1C4E9/673AB7?text=OK',
      date: '12Oct2025',
      address: 'Hebron, Old City',
      assignedTime: '02:00 PM',
      status: 'Canceled', // Added a canceled status for testing
      progress: ['Waiting Picked up', 'Picked Up', 'In Transit', 'Delivered', 'Canceled'], // Adding canceled to progress for this one
      currentProgressIndex: 4, // Index for Canceled
      customerDetails: {
        id: 'CUST006',
        name: 'Omar Khaled',
        location: 'Hebron, Old City',
        assignedTime: '02:00 PM',
        orderNumber: '00080',
        itemsCount: 1,
        products: [
          { name: 'Fragile Ceramics', image: 'https://via.placeholder.com/60', price: 150, quantity: 1 },
        ],
        locationDetails: {
          eta: '50 min',
          currentLocation: 'Near Abraham Mosque',
          customerLocation: 'Old City, Hebron',
          mapImage: 'https://via.placeholder.com/400x200?text=Map+of+Hebron',
        },
        paymentDetails: {
          subtotal: '150.00',
          shippingCost: '$15.00',
          discount: '$0.00',
          total: '165.00',
          creditCard: '**** **** **** 2345',
        },
      },
    },
    {
      orderId: '00081',
      clientName: 'Layla Said',
      avatar: 'https://placehold.co/40x40/CFD8DC/607D8B?text=LS',
      date: '12Oct2025',
      address: 'Ramallah, An-Najah St',
      assignedTime: '03:00 PM',
      status: 'Waiting Picked up',
      progress: ['Waiting Picked up', 'Picked Up', 'In Transit', 'Delivered'],
      currentProgressIndex: 0,
      customerDetails: {
        id: 'CUST007',
        name: 'Layla Said',
        location: 'Ramallah, An-Najah St',
        assignedTime: '03:00 PM',
        orderNumber: '00081',
        itemsCount: 2,
        products: [
          { name: 'Documents', image: 'https://via.placeholder.com/60', price: 10, quantity: 1 },
        ],
        locationDetails: {
          eta: '20 min',
          currentLocation: 'Near An-Najah University',
          customerLocation: 'An-Najah St, Ramallah',
          mapImage: 'https://via.placeholder.com/400x200?text=Map+of+Ramallah',
        },
        paymentDetails: {
          subtotal: '10.00',
          shippingCost: '$3.00',
          discount: '$0.00',
          total: '13.00',
          creditCard: '**** **** **** 6789',
        },
      },
    },
    {
      orderId: '00082',
      clientName: 'Khaled Nader',
      avatar: 'https://placehold.co/40x40/DCEDC8/8BC34A?text=KN',
      date: '13Oct2025',
      address: 'Gaza, Beach Rd',
      assignedTime: '09:30 AM',
      status: 'Picked Up',
      progress: ['Waiting Picked up', 'Picked Up', 'In Transit', 'Delivered'],
      currentProgressIndex: 1,
      customerDetails: {
        id: 'CUST008',
        name: 'Khaled Nader',
        location: 'Gaza, Beach Rd',
        assignedTime: '09:30 AM',
        orderNumber: '00082',
        itemsCount: 1,
        products: [
          { name: 'Beach Towels', image: 'https://via.placeholder.com/60', price: 25, quantity: 3 },
        ],
        locationDetails: {
          eta: '10 min',
          currentLocation: 'Near Gaza Beach',
          customerLocation: 'Beach Rd, Gaza',
          mapImage: 'https://via.placeholder.com/400x200?text=Map+of+Gaza',
        },
        paymentDetails: {
          subtotal: '75.00',
          shippingCost: 'Free',
          discount: '$0.00',
          total: '75.00',
          creditCard: '**** **** **** 0123',
        },
      },
    },
    {
      orderId: '00083',
      clientName: 'Fatima Yousef',
      avatar: 'https://placehold.co/40x40/FFEBEE/F44336?text=FY',
      date: '13Oct2025',
      address: 'Bethlehem, Manger Sq',
      assignedTime: '11:45 AM',
      status: 'In Transit',
      progress: ['Waiting Picked up', 'Picked Up', 'In Transit', 'Delivered'],
      currentProgressIndex: 2,
      customerDetails: {
        id: 'CUST009',
        name: 'Fatima Yousef',
        location: 'Bethlehem, Manger Sq',
        assignedTime: '11:45 AM',
        orderNumber: '00083',
        itemsCount: 2,
        products: [
          { name: 'Souvenirs', image: 'https://via.placeholder.com/60', price: 40, quantity: 2 },
        ],
        locationDetails: {
          eta: '18 min',
          currentLocation: 'Near Church of Nativity',
          customerLocation: 'Manger Sq, Bethlehem',
          mapImage: 'https://via.placeholder.com/400x200?text=Map+of+Bethlehem',
        },
        paymentDetails: {
          subtotal: '80.00',
          shippingCost: '$7.00',
          discount: '$5.00',
          total: '82.00',
          creditCard: '**** **** **** 4567',
        },
      },
    },
  ];

  // Duplicate data to create more pages for demonstration
  const duplicatedOrders1 = originalOrders.map((o) => ({
    ...o,
    orderId: `DUP1_${o.orderId}`,
    clientName: `${o.clientName} (Dupe1)`,
    // Ensure customerDetails is also duplicated and has unique data if needed,
    // or just reference the same details if they are generic.
    customerDetails: {
      ...o.customerDetails,
      id: `DUP1_${o.customerDetails.id}`,
      name: `${o.customerDetails.name} (Dupe1)`,
      orderNumber: `DUP1_${o.customerDetails.orderNumber}`,
    }
  }));

  const duplicatedOrders2 = originalOrders.map((o) => ({
    ...o,
    orderId: `DUP2_${o.orderId}`,
    clientName: `${o.clientName} (Dupe2)`,
    customerDetails: {
      ...o.customerDetails,
      id: `DUP2_${o.customerDetails.id}`,
      name: `${o.customerDetails.name} (Dupe2)`,
      orderNumber: `DUP2_${o.customerDetails.orderNumber}`,
    }
  }));

  const allOrdersData = [...originalOrders, ...duplicatedOrders1, ...duplicatedOrders2];

  const [recentOrders, setRecentOrders] = useState(allOrdersData);
  const [activeTab, setActiveTab] = useState('All orders');
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3; // Display 3 orders per page

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Open modal handler
  const openOrderDetailsModal = useCallback((order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  }, []);

  // Close modal handler
  const closeOrderDetailsModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  }, []);

  // Calculate filtered orders based on activeTab and searchTerm
  const filteredOrders = useMemo(() => {
    let currentFiltered = recentOrders.filter(order => {
      // Global search filter
      const matchesSearch =
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Tab filter
    switch (activeTab) {
      case 'All orders':
        return currentFiltered;
      case 'Picked Up':
      case 'In Transit':
      case 'Delivered':
      case 'Canceled':
      case 'Waiting Picked up':
        return currentFiltered.filter(order => order.status === activeTab);
      default:
        return currentFiltered;
    }
  }, [recentOrders, activeTab, searchTerm]);

  // Calculate total counts for tabs dynamically
  const totalCounts = useMemo(() => {
    const counts = {
      'All orders': recentOrders.length,
      'Picked Up': recentOrders.filter(order => order.status === 'Picked Up').length,
      'In Transit': recentOrders.filter(order => order.status === 'In Transit').length,
      'Canceled': recentOrders.filter(order => order.status === 'Canceled').length,
      'Waiting Picked up': recentOrders.filter(order => order.status === 'Waiting Picked up').length,
      'Delivered': recentOrders.filter(order => order.status === 'Delivered').length,
    };
    return counts;
  }, [recentOrders]);


  // Calculate orders for the current page from filteredOrders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate total pages for filtered orders
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const chartRef = useRef(null); // Ref for the chart canvas
  const chartInstance = useRef(null); // Ref for the chart instance

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy existing chart instance before creating a new one
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [
            {
              label: 'Deliveries',
              data: [15, 20, 30, 54, 35, 25, 40], // Dummy data, Thursday is 54 to match image
              borderColor: '#34D399', // Green color (equivalent to Tailwind green-500/600 sometimes)
              backgroundColor: 'rgba(52, 211, 153, 0.2)', // Light green fill
              tension: 0.4, // Smooth curve
              fill: true,
              pointRadius: 0, // Hide points by default, could be increased for small circles if desired
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false, // Hide legend
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false, // Hide x-axis grid lines
              },
              ticks: {
                color: '#6B7280', // Gray text for labels (equivalent to Tailwind gray-500)
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: '#E5E7EB', // Light gray grid lines (equivalent to Tailwind gray-200)
                borderDash: [5, 5], // Dashed grid lines
              },
              ticks: {
                callback: function (value) {
                  return value + 'k'; // Add 'k' to y-axis labels
                },
                color: '#6B7280', // Gray text (equivalent to Tailwind gray-500)
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Cleanup chart on component unmount
      }
    };
  }, []);

  // Function to handle clicking on a progress step
  const handleProgressStepClick = useCallback((orderId, newStatus) => {
    setRecentOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.orderId === orderId) {
          const newProgressIndex = order.progress.indexOf(newStatus);
          const currentCanceledIndex = order.progress.indexOf('Canceled');

          // If clicking on 'Canceled' status
          if (newStatus === 'Canceled') {
            return {
              ...order,
              status: newStatus,
              currentProgressIndex: newProgressIndex,
            };
          } else {
            // If the order was canceled and a non-canceled step is clicked (to "uncancel" or revert)
            if (order.status === 'Canceled' && newProgressIndex < currentCanceledIndex) {
              return {
                ...order,
                status: newStatus,
                currentProgressIndex: newProgressIndex,
              };
            }
            // Normal progression: only allow moving forward or staying at the same step
            else if (newProgressIndex >= order.currentProgressIndex) {
                // Also ensures that if a step after 'Canceled' (if Canceled isn't current) is clicked, it won't jump past it.
                // This logic may need refinement based on exact desired behavior for re-activating canceled orders.
                // For now, it prevents "jumping over" canceled if it's already past it in index.
                if (currentCanceledIndex !== -1 && newProgressIndex > currentCanceledIndex && order.currentProgressIndex <= currentCanceledIndex) {
                    // Prevent activating steps *after* Canceled if Canceled hasn't been passed yet.
                    // Or you might want to allow this, depending on business logic.
                    return order;
                }
              return {
                ...order,
                status: newStatus,
                currentProgressIndex: newProgressIndex,
              };
            }
            // Do nothing if trying to go backward on an active order or other invalid transitions
            return order;
          }
        }
        return order;
      })
    );
  }, []);


  const SummaryCard = ({ iconName, value, label }) => (
    <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm w-full">
      <div className="p-3 rounded-full" style={{ backgroundColor: '#D1FAE5' }}> {/* bg-green-100 */}
        <Icon name={iconName} size={24} style={{ color: '#059669' }} /> {/* text-green-600 */}
      </div>
      <div>
        <p className="text-xl font-semibold" style={{ color: '#1F2937' }}>{value}</p> {/* text-gray-800 */}
        <p className="text-sm" style={{ color: '#6B7280' }}>{label}</p> {/* text-gray-500 */}
      </div>
    </div>
  );

  const OrderItem = ({ order, onStatusClick, onOpenDetails }) => { // Added onOpenDetails prop
    const isCallEnabled = useMemo(() => {
      // Enable Call button if status is Waiting Picked up, Picked Up, or In Transit
      return ['Waiting Picked up', 'Picked Up', 'In Transit'].includes(order.status);
    }, [order.status]);

    const isTrackEnabled = useMemo(() => {
      // Enable Track button if status is Picked Up or In Transit
      return ['Picked Up', 'In Transit'].includes(order.status);
    }, [order.status]);

    return (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={order.avatar}
              alt={order.clientName}
              className="w-10 h-10 rounded-full border"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/B3E5FC/2196F3?text=YY'; }} // Fallback for avatar
              style={{ borderColor: '#E5E7EB' }} // border-gray-200
            />
            <div>
              <p className="font-medium" style={{ color: '#1F2937' }}>{order.clientName}</p> {/* text-gray-800 */}
              <p className="text-sm" style={{ color: '#6B7280' }}>Order#{order.orderId}</p> {/* Changed order.id to order.orderId */}
            </div>
          </div>
          <div className="cursor-pointer" style={{ color: '#9CA3AF' }} onClick={() => onOpenDetails(order)}> {/* Added onClick to open modal */}
            <Icon name="MoreVertical" size={20} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm mb-4" style={{ color: '#4B5563' }}> {/* text-gray-600 */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2 md:mb-0">
            <Icon name="MapPin" size={16} style={{ color: '#9CA3AF' }} /> {/* Using FaMapMarkerAlt */}
            <span>{order.address}</span>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Icon name="Clock" size={16} style={{ color: '#9CA3AF' }} /> {/* Using FaClock */}
            <span>Assigned: {order.assignedTime}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm mb-4">
          <span
            className={`font-medium px-2 py-1 rounded-full text-xs`}
            style={{
              backgroundColor:
                order.status === 'Picked Up' ? '#FFF7ED' : // bg-orange-100 (light orange)
                order.status === 'In Transit' ? '#FFFBEB' : // bg-yellow-100 (light yellow)
                order.status === 'Delivered' ? '#D1FAE5' : // bg-green-100 (light green)
                order.status === 'Waiting Picked up' ? '#DBEAFE' : // bg-blue-100 (light blue)
                '#FEE2E2', // default for other statuses like Canceled (red-100)
              color:
                order.status === 'Picked Up' ? '#EA580C' : // text-orange-600
                order.status === 'In Transit' ? '#D97706' : // text-yellow-600
                order.status === 'Delivered' ? '#059669' : // text-green-600
                order.status === 'Waiting Picked up' ? '#2563EB' : // text-blue-600
                '#DC2626', // default for other statuses like Canceled (red-600)
            }}
          >
            {order.status}
          </span>
          <div className="flex space-x-2">
            <button
              className={`flex items-center space-x-1 rtl:space-x-reverse px-3 py-1 rounded-md transition-colors ${!isCallEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-100'}`}
              style={{ backgroundColor: '#F0FDF4', color: '#065F46' }}
              disabled={!isCallEnabled}
            >
              <Icon name="Phone" size={16} />
              <span>Call</span>
            </button>
            <button
              className={`flex items-center space-x-1 rtl:space-x-reverse px-3 py-1 rounded-md transition-colors ${!isTrackEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-100'}`}
              style={{ backgroundColor: '#F0FDF4', color: '#065F46' }}
              disabled={!isTrackEnabled}
            >
              <Icon name="LocateFixed" size={16} />
              <span>Track</span>
            </button>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="flex justify-between items-center relative py-2 mt-4">
          {order.progress.map((step, index) => {
            // Determine if the current order's status is 'Canceled'
            const isCanceledOrder = order.status === 'Canceled';
            // Determine if the current step in the progress array is 'Canceled'
            const isCurrentStepCanceled = step === 'Canceled';

            // Logic for active styling (green circles/lines) for non-canceled orders
            const isActiveStepInNormalFlow = index <= order.currentProgressIndex && !isCanceledOrder;

            // Define colors based on conditions
            let circleBgColor = '#FFFFFF'; // Default inactive circle background
            let circleBorderColor = '#D1D5DB'; // Default inactive circle border
            let textColor = '#6B7280'; // Default inactive text color
            let fontWeight = 'normal'; // Default text weight
            let lineColor = '#D1D5DB'; // Default inactive line color

            if (isCanceledOrder && isCurrentStepCanceled) {
                // If the order is Canceled and this is the 'Canceled' step
                circleBgColor = '#DC2626'; // Red
                circleBorderColor = '#DC2626'; // Red
                textColor = '#1F2937';
                fontWeight = '500';
            } else if (isActiveStepInNormalFlow) {
                // If it's an active step in a non-canceled order
                circleBgColor = '#22C55E'; // Green
                circleBorderColor = '#22C55E';
                textColor = '#1F2937';
                fontWeight = '500';
            }

            // Line color logic
            if (index < order.progress.length - 1) { // Only for lines between steps
              // Check if the current segment (from 'step' to 'nextStep') should be active
              const nextStep = order.progress[index + 1];
              const nextStepIsCanceled = nextStep === 'Canceled';

              if (isCanceledOrder && (isCurrentStepCanceled || (order.currentProgressIndex > index && nextStepIsCanceled))) {
                lineColor = '#DC2626'; // Red line if current order is canceled and this line leads to or is part of canceled path
              } else if (index < order.currentProgressIndex && !isCanceledOrder) {
                lineColor = '#22C55E'; // Green for active lines in normal flow
              }
            }


            return (
              <React.Fragment key={step}>
                <div
                    className="flex flex-col items-center flex-1 min-w-0 cursor-pointer" // Added cursor-pointer
                    onClick={() => onStatusClick(order.orderId, step)} // Added onClick handler
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center`}
                    style={{
                      backgroundColor: circleBgColor,
                      borderColor: circleBorderColor,
                    }}
                  >
                    {isCurrentStepCanceled && isCanceledOrder ? (
                        <Icon name="X" size={12} color="white" /> // 'X' for Canceled
                    ) : isActiveStepInNormalFlow ? (
                        <Icon name="Check" size={12} color="white" /> // Check for active non-canceled steps, color white
                    ) : null}
                  </div>
                  <p
                    className={`mt-2 text-xs text-center overflow-hidden text-ellipsis`} // Removed whitespace-nowrap
                    style={{
                      color: textColor,
                      fontWeight: fontWeight,
                    }}
                  >
                    {step.replace(' ', '\n')} {/* Break long status names for better fit */}
                  </p>
                </div>
                {index < order.progress.length - 1 && (
                  <div
                    className={`flex-1 h-0.5`}
                    style={{
                      backgroundColor: lineColor,
                    }}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  // Pagination page numbers rendering function
  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
      if (currentPage > 2 && currentPage < totalPages - 1) {
        pageNumbers.push(currentPage - 1);
      }
      if (currentPage !== 1 && currentPage !== totalPages) {
        pageNumbers.push(currentPage);
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push(currentPage + 1);
      }
      if (currentPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      if (!pageNumbers.includes(totalPages)) {
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers.filter((value, index, self) => self.indexOf(value) === index);
  };


  return (
    <div className="min-h-screen font-sans p-4 sm:p-6 lg:p-8" style={{ backgroundColor: '#F3F4F6', color: '#1F2937' }}> {/* bg-gray-100 text-gray-900 */}
      {/* Header - Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SummaryCard iconName="Truck" value="25" label="Active Orders" />
        <SummaryCard iconName="Package" value="10" label="Delivered Today" />
        <SummaryCard iconName="Clock" value="30min" label="Avg. Delivery Time" />
      </div>

      {/* Next Delivery */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4 sm:mb-0">
          <div className="p-3 rounded-full" style={{ backgroundColor: '#FEE2E2' }}> {/* bg-red-100 */}
            <Icon name="MapPin" size={24} style={{ color: '#DC2626' }} />
          </div>
          <div>
            <p className="text-lg font-semibold" style={{ color: '#1F2937' }}>10:30 AM - Al-Balou', Ramallah</p> {/* text-gray-800 */}
            <p className="text-sm" style={{ color: '#6B7280' }}>Next Delivery</p> {/* text-gray-500 */}
          </div>
        </div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-12 h-12 flex flex-col items-center justify-center rounded-lg font-bold text-lg relative"
               style={{ backgroundColor: '#DBEAFE', color: '#2563EB' }}> {/* bg-blue-100 text-blue-700 */}
            <span className="text-xs absolute top-1" style={{ color: '#6B7280' }}>July</span> {/* text-gray-500 */}
            <span className="mt-3">17</span>
          </div>
          <p className="text-sm" style={{ color: '#6B7280' }}>remaining orders</p> {/* text-gray-500 */}
          <p className="text-lg font-semibold" style={{ color: '#1F2937' }}>5</p> {/* text-gray-800 */}
        </div>
      </div>

      {/* Order List Section */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-4">Order List</h2>

        {/* Global Search Bar */}
        <div className="relative w-full mb-4">
          <input
            type="text"
            placeholder="Search by Order ID, Client Name, or Address"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: '#D1D5DB', color: '#1F2937', outlineColor: '#22C55E' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 flex items-center pl-3 rtl:pr-3 pointer-events-none">
            <Icon name="Search" size={18} style={{ color: '#9CA3AF' }} />
          </div>
        </div>

        {/* Tabs and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            {['All orders', 'Waiting Picked up', 'Picked Up', 'In Transit', 'Delivered', 'Canceled'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors`}
                style={{
                  backgroundColor: activeTab === tab ? '#22C55E' : '#F3F4F6', // bg-green-500 or bg-gray-100
                  color: activeTab === tab ? '#FFFFFF' : '#374151', // text-white or text-gray-700
                  boxShadow: activeTab === tab ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
                }}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1); // Reset to first page on tab change
                }}
              >
                {tab} ({totalCounts[tab] || 0}) {/* Dynamic counts */}
              </button>
            ))}
          </div>
          {/* Search bar removed from here, now global */}
        </div>

        {/* Order Items */}
        <div>
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => ( // Display orders for the current page
              <OrderItem
                key={order.orderId}
                order={order}
                onStatusClick={handleProgressStepClick}
                onOpenDetails={openOrderDetailsModal} // Pass the handler to open the modal
              />
            ))
          ) : (
            <p className="text-center text-gray-600">No orders found matching your criteria.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t" style={{ borderColor: '#E5E7EB' }}> {/* border-gray-200 */}
          <button
            className="flex items-center space-x-1 rtl:space-x-reverse hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed mb-2 sm:mb-0"
            style={{ color: '#4B5563' }}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <Icon name="ChevronLeft" size={20} />
            <span>Previous</span>
          </button>
          <div className="flex space-x-2">
            {renderPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium
                  ${typeof page !== 'number' ? 'cursor-default border-transparent bg-transparent hover:bg-transparent' : ''}
                `}
                style={{
                  backgroundColor: currentPage === page ? '#22C55E' : '#F3F4F6', // Active page styling
                  color: currentPage === page ? '#FFFFFF' : '#374151',
                }}
                disabled={typeof page !== 'number'}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="flex items-center space-x-1 rtl:space-x-reverse hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed mt-2 sm:mt-0"
            style={{ color: '#4B5563' }}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <span>Next</span>
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={closeOrderDetailsModal}
        order={selectedOrder}
      />
    </div>
  );
};

export default App;