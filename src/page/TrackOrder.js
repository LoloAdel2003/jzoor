import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiTimeFive } from 'react-icons/bi';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { LuMessageCircle } from "react-icons/lu";
 // Importing the phone icon

// Phone Call Modal Component
const PhoneCallModal = ({ isOpen, onClose, phoneNumber }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 animate-scaleIn">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Driver</h2>
        <p className="text-gray-700 mb-6">You can call the driver at:</p>
        <div className="text-center mb-6">
          <a href={`tel:${phoneNumber}`} className="text-3xl font-bold text-blue-600 hover:underline">{phoneNumber}</a>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
          <a
            href={`tel:${phoneNumber}`}
            className="px-4 py-2 bg-[rgb(4,120,87)] text-white rounded-md hover:bg-green-700 transition-colors no-underline flex items-center justify-center"
          >
            Call Now
          </a>
        </div>
      </div>
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};


const TrackOrder = () => {
  const [currentDeliveryPhase, setCurrentDeliveryPhase] = useState('waiting_pickup');
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('15/02/25');
  const [deliveryStatusText, setDeliveryStatusText] = useState('On Time');
  const [showOrderDetailsButtonActive, setShowOrderDetailsButtonActive] = useState(true);
  const [isCanceled, setIsCanceled] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [driverPhoneNumber, setDriverPhoneNumber] = useState('123-456-7890'); // رقم هاتف وهمي للسائق

  useEffect(() => {
    const simulateBackendUpdate = () => {
      // Clear any existing timeouts to prevent multiple simulations
      const timeouts = [];
      timeouts.push(setTimeout(() => setCurrentDeliveryPhase('picked_up'), 3000));
      timeouts.push(setTimeout(() => setCurrentDeliveryPhase('pickup_done'), 6000));
      timeouts.push(setTimeout(() => {
        setCurrentDeliveryPhase('out_for_delivery');
        setEstimatedDeliveryDate('15/02/25');
        setDeliveryStatusText('Out For Delivery');
      }, 9000));
      timeouts.push(setTimeout(() => {
        setCurrentDeliveryPhase('delivered');
        setEstimatedDeliveryDate('14/02/25');
        setDeliveryStatusText('Delivered');
        setShowOrderDetailsButtonActive(true);
      }, 12000));

      // Cleanup function to clear timeouts if component unmounts or isCanceled changes
      return () => timeouts.forEach(clearTimeout);
    };

    if (!isCanceled) {
      simulateBackendUpdate();
    }
  }, [isCanceled]);

  const getOrderStatusSteps = () => {
    const steps = [
      { id: 1, label: 'Waiting Picked up', date: '10 Feb, 2025', phase: 'waiting_pickup' },
      { id: 2, label: 'Picked up', date: '10 Feb, 2025', phase: 'picked_up' },
      { id: 3, label: 'Order Processed', date: `We Are Waiting for Driver to Pick Up Product From Pickup Location`, phase: 'pickup_done', showDriverInfo: false },
      { id: 4, label: 'Out For Delivery', date: '15 Feb, 2025', phase: 'out_for_delivery', showDriverInfo: true },
      { id: 5, label: 'Order Delivered', date: '', phase: 'delivered' },
    ];

    if (isCanceled) {
      let cancelledSteps = [];
      let currentPhaseIndex = steps.findIndex(s => s.phase === currentDeliveryPhase);

      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const isPastOrCurrentBeforeCancel = (currentDeliveryPhase !== 'canceled_state' && i < currentPhaseIndex);

        cancelledSteps.push({
          ...step,
          completed: isPastOrCurrentBeforeCancel,
          isCanceledMark: !isPastOrCurrentBeforeCancel
        });
      }
      cancelledSteps.push({ id: 6, label: 'Order Canceled', date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).replace(',', ''), phase: 'canceled', completed: true, isCanceledStatus: true });
      return cancelledSteps;

    } else {
      let currentPhaseIndex = steps.findIndex(s => s.phase === currentDeliveryPhase);
      return steps.map((step, index) => ({
        ...step,
        completed: index <= currentPhaseIndex
      }));
    }
  };

  const orderStatusSteps = getOrderStatusSteps();

  const getIllustrationImage = () => {
    if (isCanceled) {
        return '/imges/cansle.webp';
    }
    switch (currentDeliveryPhase) {
      case 'out_for_delivery':
        return '/imges/map.png';
      case 'delivered':
        return '/imges/delivery.png';
      case 'waiting_pickup':
      case 'picked_up':
      case 'pickup_done':
      default:
        return '/imges/amico.png';
    }
  };

  const handleCancelOrder = () => {
    const confirmCancellation = window.confirm("Are you sure you want to cancel the order?");
    if (confirmCancellation) {
        setIsCanceled(true);
        setDeliveryStatusText('Canceled');
        setShowOrderDetailsButtonActive(false);
        alert("Order has been canceled. Please contact support for further assistance.");
    }
  };

  return (
    <div className="pt-[60px] md:pt-[120px] container min-h-screen px-4 md:px-0">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#4B5929]">Track Order</h1>
          <p className="text-[#6C757D] text-sm md:text-base">Keep In Touch With Your Order...</p>
        </div>
        <Link
          to="/orderDetails"
          className={`px-4 py-2 no-underline rounded-md font-semibold text-white transition ${
            showOrderDetailsButtonActive ? 'bg-[#4B5929] hover:bg-[#3c471f]' : 'bg-[#6C757D] cursor-not-allowed opacity-50 pointer-events-none'
          }`}
          onClick={(e) => {
            if (!showOrderDetailsButtonActive) {
              e.preventDefault();
            }
          }}
        >
          Show Order Details
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center bg-white p-2 rounded-lg shadow-md border border-[#E0E0E0]">
        {/* Left Section: Illustration */}
        <div className="flex justify-center items-center p-2">
          <img
            src={getIllustrationImage()}
            alt="Order Tracking Illustration"
            className="max-w-full h-auto object-contain"
          />
        </div>

        {/* Right Section: Order Status */}
        <div className="p-4">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#4B5929]">Order Status</h2>

          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E0E0E0]">
            <div>
              <p className="text-[#6C757D] text-sm">Estimated Delivery Date</p>
              <p className="text-lg font-semibold text-[#4B5929]">{estimatedDeliveryDate}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isCanceled ? 'bg-[#F8D7DA] text-[#DC3545]' :
                deliveryStatusText === 'On Time' || deliveryStatusText === 'Delivered' ? 'bg-[#D4EDDA] text-[#28A745]' :
                deliveryStatusText === 'Out For Delivery' ? 'bg-[#CCE5FF] text-[#007BFF]' :
                'bg-[#FFF3CD] text-[#FFC107]'
              }`}
            >
              {deliveryStatusText}
            </span>
          </div>

          {/* Order Tracking Steps */}
          <div className="relative border-l-2 border-[#E9ECEF] ml-2 pl-4 space-y-2">
            {orderStatusSteps.map((step) => (
              <div key={step.id} className="relative flex items-start">
                {step.isCanceledStatus ? (
                    <div className="absolute -left-3.5 md:-left-4 top-0 w-7 h-7 rounded-full flex items-center justify-center bg-[#DC3545] text-white">
                        <FaTimes size={16} />
                    </div>
                ) : (
                    <div
                        className={`absolute -left-3.5 md:-left-4 top-0 w-7 h-7 rounded-full flex items-center justify-center ${
                            step.completed && !step.isCanceledMark ? 'bg-[#4B5929] text-white' :
                            step.isCanceledMark ? 'bg-[#DC3545] text-white' :
                            'bg-[#E9ECEF] text-[#6C757D]'
                        }`}
                    >
                        {step.completed && !step.isCanceledMark ? (
                            <BsCheckCircleFill size={16} />
                        ) : step.isCanceledMark ? (
                            <FaTimes size={16} />
                        ) : (
                            <div className="w-3 h-3 rounded-full bg-[#ADB5BD]"></div>
                        )}
                    </div>
                )}
                <div>
                  <p className={`font-semibold pl-5 ${step.completed && !step.isCanceledMark ? 'text-[#4B5929]' :
                                                  step.isCanceledMark ? 'text-[#DC3545] line-through' :
                                                  step.isCanceledStatus ? 'text-[#DC3545]' :
                                                  'text-[#6C757D]'}`}>
                    {step.label}
                  </p>
                  <p className="text-sm text-[#6C757D] pl-5">
                    {step.date}
                  </p>
                  {/* Show delivery and time icons for relevant phases, and phone icon for 'out_for_delivery' */}
                  {step.phase !== 'pickup_done' && step.showDriverInfo && step.completed && !isCanceled && (
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2 pl-5">
                      <MdOutlineLocalShipping size={20} className="text-[#4B5929]" />
                      <BiTimeFive size={20} className="text-[#4B5929]" />

                      <Link to="/profile/chat" ><LuMessageCircle size={20} className="text-[#4B5929]"  />
</Link>
                      {step.phase === 'out_for_delivery' && (
                        
                        <FiPhone size={20} className="text-[#4B5929] cursor-pointer" onClick={() => setShowCallModal(true)} />

                      )}
                    </div>
                  )}
                  {step.phase === 'out_for_delivery' && step.completed && !isCanceled && (
                    <p className="text-[#007BFF] font-medium mt-2 pl-5">Stay Nearby</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Cancel Button */}
          {currentDeliveryPhase !== 'delivered' && !isCanceled && (
            <div className="flex justify-end mt-8">
              <button
                onClick={handleCancelOrder}
                className="px-6 py-2 bg-[#DC3545] text-white font-semibold rounded-md hover:bg-[#C82333] transition"
              >
                Cancel
              </button>
            </div>
          )}
           {/* "Order has been canceled" text */}
           {isCanceled && (
             <div className="mt-8 text-center text-lg font-bold text-[#DC3545]">
               Order has been canceled.
             </div>
           )}
        </div>
      </div>

      {/* Render Phone Call Modal */}
      {showCallModal && (
        <PhoneCallModal
          isOpen={showCallModal}
          onClose={() => setShowCallModal(false)}
          phoneNumber={driverPhoneNumber}
        />
      )}
    </div>
  );
};

export default TrackOrder;
