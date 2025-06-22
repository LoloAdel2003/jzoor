import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { BiTimeFive } from 'react-icons/bi';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { BsCheckCircleFill } from 'react-icons/bs';

const TrackOrder = () => {
  // هذه الحالة ستمثل بيانات الطلب التي ستحصل عليها من الـ Backend
  // Order phases: 'waiting_pickup', 'picked_up', 'pickup_done', 'out_for_delivery', 'delivered'
  const [currentDeliveryPhase, setCurrentDeliveryPhase] = useState('waiting_pickup'); // الحالة الأولية
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('15/02/25');
  const [deliveryStatusText, setDeliveryStatusText] = useState('On Time');
  const [driverName, setDriverName] = useState('Ahmad'); // يمكن أن يأتي من الـ Backend
  const [showOrderDetailsButtonActive, setShowOrderDetailsButtonActive] = useState(true); // لزر Show Order Details

  // ة useEffect لمحاكاة جلب البيانات من الـ Backend
  useEffect(() => {
    
    const simulateBackendUpdate = () => {
      // For demonstration, let's change status after some time
      setTimeout(() => setCurrentDeliveryPhase('picked_up'), 3000); // After 3s
      setTimeout(() => setCurrentDeliveryPhase('pickup_done'), 6000); // After 6s
      setTimeout(() => {
        setCurrentDeliveryPhase('out_for_delivery');
        setEstimatedDeliveryDate('15/02/25'); // تحديث التاريخ إذا تغير
        setDeliveryStatusText('Out For Delivery');
      }, 9000); // After 9s
      setTimeout(() => {
        setCurrentDeliveryPhase('delivered');
        setEstimatedDeliveryDate('14/02/25'); // تحديث التاريخ بعد التسليم
        setDeliveryStatusText('Delivered');
        setShowOrderDetailsButtonActive(true); // افتراض أن الزر يكون نشطًا بعد التسليم
      }, 12000); // After 12s
    };

    simulateBackendUpdate(); // لمحاكاة التغيير التلقائي
  }, []);

  const getOrderStatusSteps = () => {
    const steps = [
      { id: 1, label: 'Waiting Picked up', date: '10 Feb, 2025', phase: 'waiting_pickup' },
      { id: 2, label: 'Picked up', date: '10 Feb, 2025', phase: 'picked_up' },
      { id: 3, label: 'Pickup Done', date: `Your Delivery Is: ${driverName}`, phase: 'pickup_done', showDriverInfo: true },
      { id: 4, label: 'Out For Delivery', date: '15 Feb, 2025', phase: 'out_for_delivery' }, // Update date dynamically if needed
      { id: 5, label: 'Order Delivered', date: '', phase: 'delivered' },
    ];

    let currentPhaseReached = false;
    return steps.map(step => {
      // قم بتحديد 'completed' بناءً على ما إذا كانت هذه الخطوة هي أو قبل المرحلة الحالية
      if (step.phase === currentDeliveryPhase) {
        currentPhaseReached = true;
      }
      return {
        ...step,
        completed: !currentPhaseReached // كل الخطوات قبل الحالية (أو الحالية) تعتبر مكتملة
      };
    }).reverse().map((step, index, arr) => {
      // Re-reverse to get original order and adjust 'completed' logic
      // This logic ensures previous steps are true, and current/future are false unless explicitly set by backend
      const actualStep = arr[arr.length - 1 - index];
      const isCurrentOrPast = steps.findIndex(s => s.phase === actualStep.phase) <= steps.findIndex(s => s.phase === currentDeliveryPhase);
      return {
        ...actualStep,
        completed: isCurrentOrPast
      };
    });
  };

  const orderStatusSteps = getOrderStatusSteps();

  // تحديد مسار الصورة بناءً على حالة التسليم الحالية
  const getIllustrationImage = () => {
    switch (currentDeliveryPhase) {
      case 'out_for_delivery':
        return '/imges/map.png'; // الصورة مع الخريطة والسائق
      case 'delivered':
        return '/imges/delivery.png'; // الصورة مع التسليم للعميل
      default:
        return '/imges/amico.png'; // الصورة الافتراضية للدراجة
    }
  };

  const handleCancelOrder = () => {
    alert("Order cancellation initiated. Please contact support for further assistance.");
    // في تطبيق حقيقي، سترسل طلب إلغاء إلى الـ Backend
    // وبعد النجاح، يمكنك تحديث currentDeliveryPhase إلى 'cancelled' مثلاً
  };

  return (
    <div className="pt-[60px] md:pt-[120px] container min-h-screen px-4 md:px-0">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#333]">Track Order</h1>
          <p className="text-gray-600 text-sm md:text-base">Keep In Touch With Your Order...</p>
        </div>
        <button
          className={`px-4 py-2 rounded-md font-semibold text-white transition ${
            showOrderDetailsButtonActive ? 'bg-[#4B5929] hover:bg-[#3c471f]' : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!showOrderDetailsButtonActive}
        >
          Show Order Details
        </button>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-2 rounded-lg shadow-md border border-gray-200">
        {/* Left Section: Illustration */}
        <div className="flex justify-center items-center p-4">
          <img
            src={getIllustrationImage()} // تحديث مسار الصورة ديناميكيًا
            alt="Order Tracking Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Right Section: Order Status */}
        <div className="p-4">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#333]">Order Status</h2>

          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <div>
              <p className="text-gray-600 text-sm">Estimated Delivery Date</p>
              <p className="text-lg font-semibold text-[#4B5929]">{estimatedDeliveryDate}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                deliveryStatusText === 'On Time' ? 'bg-green-100 text-green-700' :
                deliveryStatusText === 'Out For Delivery' ? 'bg-blue-100 text-blue-700' : // لون جديد لـ Out For Delivery
                deliveryStatusText === 'Delivered' ? 'bg-green-100 text-green-700' :
                'bg-yellow-100 text-yellow-700' // افتراضي للحالات الأخرى
              }`}
            >
              {deliveryStatusText}
            </span>
          </div>

          {/* Order Tracking Steps */}
          <div className="relative border-l-2 border-gray-300 ml-2 md:ml-4 pl-6 space-y-2">
            {orderStatusSteps.map((step) => (
              <div key={step.id} className="relative flex items-start">
                <div
                  className={`absolute mr-3 -left-3.5 md:-left-4 top-0 w-7 h-7 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-[#4B5929] text-white' : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {step.completed ? <BsCheckCircleFill size={16} /> : <div className="w-3 h-3 mr-2 rounded-full bg-gray-500"></div>}
                </div>
                <div>
                  <p className={`font-semibold pl-5 ${step.completed ? 'text-[#4B5929]' : 'text-gray-600'}`}>
                    {step.label}
                  </p>
                  <p className="text-sm text-gray-500">
                    {step.date}
                  </p>
                  {step.showDriverInfo && step.completed && ( // إظهار معلومات السائق فقط إذا كانت الخطوة مكتملة
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2">
                      <MdOutlineLocalShipping size={20} className="text-[#4B5929]" />
                      <BiTimeFive size={20} className="text-[#4B5929]" />
                    </div>
                  )}
                  {step.phase === 'out_for_delivery' && step.completed && ( // نص "Stay Nearby" فقط لـ Out For Delivery
                    <p className="text-blue-600 font-medium mt-2">Stay Nearby</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Cancel Button */}
          {currentDeliveryPhase !== 'delivered' && ( // زر الإلغاء لا يظهر إذا تم التسليم
            <div className="flex justify-end mt-8">
              <button
                onClick={handleCancelOrder}
                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;