import React, { useState, useEffect, useRef } from 'react';

const App = () => {
    // Static data for chat contacts
    const [contacts, setContacts] = useState([
        {
            id: '1',
            name: 'Amina Emad',
            lastMessage: 'Ok, got your order will be delivered soon',
            time: '9m',
            avatar: 'https://placehold.co/40x40/94A3B8/F8FAFC?text=AE', // Neutral gray
            status: 'online',
            unread: 0,
        },
        {
            id: '2',
            name: 'Ahmad Ali',
            lastMessage: 'Sure',
            time: '1h',
            avatar: 'https://placehold.co/40x40/FECACA/EF4444?text=AA', // Red
            status: 'offline',
            unread: 1,
        },
        {
            id: '3',
            name: 'Samia Baker',
            lastMessage: 'Thank You',
            time: '2h',
            avatar: 'https://placehold.co/40x40/D1FAE5/059669?text=SB', // Green - Active chat
            status: 'online',
            unread: 3, // For active chat
        },
        {
            id: '4',
            name: 'Abeer Khaleel',
            lastMessage: 'Ok',
            time: '3h',
            avatar: 'https://placehold.co/40x40/BFDBFE/2563EB?text=AK', // Blue
            status: 'offline',
            unread: 0,
        },
        {
            id: '5',
            name: 'Mona Abd',
            lastMessage: 'Ok',
            time: '2d',
            avatar: 'https://placehold.co/40x40/DDD6FE/7C3AED?text=MA', // Purple
            status: 'online',
            unread: 0,
        },
        {
            id: '6',
            name: 'Yara Yaseen',
            lastMessage: 'Ok',
            time: '2w',
            avatar: 'https://placehold.co/40x40/DBEAFE/6D28D9?text=YY', // Darker Blue
            status: 'offline',
            unread: 0,
        },
    ]);

    // Static data for chat messages
    const [messages, setMessages] = useState([
        {
            id: 'msg1',
            senderId: '3', // Samia Baker
            text: 'Omg, this is amazing',
            time: 'August 14',
            isMe: false,
        },
        {
            id: 'msg2',
            senderId: 'user', // Current user
            text: 'perfect!',
            time: 'August 14',
            isMe: true,
        },
        {
            id: 'msg3',
            senderId: '3', // Samia Baker
            text: 'Wow, this is totally EPIC',
            time: 'August 14',
            isMe: false,
        },
        {
            id: 'msg4',
            senderId: 'user', // Current user
            text: 'Thank You, Happy to help you, add app to help you more!',
            time: 'August 14',
            isMe: true,
        },
        {
            id: 'msg5',
            senderId: '3', // Samia Baker
            text: 'Hi...where are you now?',
            time: 'August 15',
            isMe: false,
        },
    ]);

    // State to manage sidebar visibility on small screens
    // Sidebar starts open on md and larger screens (>= 768px), closed on small screens (< 768px)
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

    // State for the currently selected chat contact
    const [selectedContactId, setSelectedContactId] = useState('3'); // Samia Baker is active by default
    // State for the new message input field
    const [newMessage, setNewMessage] = useState('');

    // Ref for the messages container to enable auto-scrolling to the latest message
    const messagesEndRef = useRef(null);

    // Effect to scroll to the bottom of the messages display whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle sidebar toggle for small screens
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Adjust sidebar visibility on window resize to ensure correct behavior on desktop vs mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(true); // Always open sidebar on larger screens
            } else {
                // On small screens, keep the sidebar closed initially after a resize,
                // unless explicitly opened by the user.
                setIsSidebarOpen(false);
            }
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
        // Cleanup function to remove event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount


    // Get the selected contact object for displaying in the chat header
    const selectedContact = contacts.find(contact => contact.id === selectedContactId);

    // Helper function to render Lucide-like icons using inline SVGs
    // This approach avoids the 'Could not resolve "react-icons/*"' error.
    const Icon = ({ name, size = 20, color = 'currentColor', className = '' }) => {
        // Default size is 20px, but it will be overridden by responsive classes or specific inline sizes
        // We'll use a smaller base size and rely more on Tailwind's responsive sizing for different screens.
        let defaultSize = 20;
        if (['Menu', 'Search', 'MoreHorizontal', 'Plus', 'Send', 'Smile', 'Paperclip'].includes(name)) {
            // Adjust default size for icons that might need to be smaller on tiny screens
            defaultSize = 18; // Slightly smaller default
        }

        switch (name) {
            case 'Menu':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width={size || defaultSize} height={size || defaultSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                        <line x1="4" y1="12" x2="20" y2="12"></line>
                        <line x1="4" y1="6" x2="20" y2="6"></line>
                        <line x1="4" y1="18" x2="20" y2="18"></line>
                    </svg>
                );
            case 'Search':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width={size || defaultSize} height={size || defaultSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                );
            case 'MoreHorizontal':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width={size || defaultSize} height={size || defaultSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                );
            case 'Plus': // Corresponds to IoMdAdd
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width={size || defaultSize} height={size || defaultSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                );
            case 'Send': // Corresponds to IoMdSend
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width={size || defaultSize} height={size || defaultSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                );
            case 'Smile': // Corresponds to FaRegSmile
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width={size || defaultSize} height={size || defaultSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                );
            case 'Paperclip': // Corresponds to GoPaperclip
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width={size || defaultSize} height={size || defaultSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                        <path d="M21.44 11.02L13.02 2.6a2 2 0 0 0-2.83 0L3.6 9.19a2 2 0 0 0 0 2.83l8.42 8.42a2 2 0 0 0 2.83 0l7.82-7.82a2 2 0 0 0 0-2.83z"></path>
                    </svg>
                );
            default:
                return null;
        }
    };

    // Function to handle sending a new message
    const handleSendMessage = () => {
        if (newMessage.trim()) { // Only send if message is not empty
            const newMsg = {
                id: `msg${messages.length + 1}`, // Generate a unique ID for the new message
                senderId: 'user', // Assuming 'user' is the current sender
                text: newMessage.trim(),
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), // Current time
                isMe: true, // Mark message as sent by current user
            };
            setMessages([...messages, newMsg]); // Add new message to the messages array
            setNewMessage(''); // Clear the input field
        }
    };

    return (
        // Main container for the chat application
        // Added overflow-hidden to the main container to explicitly prevent horizontal scrolling
        <div className="relative flex min-h-screen font-sans overflow-hidden" style={{ backgroundColor: '#F8FAFC' }}>
            {/* Overlay for mobile when sidebar is open, covers the chat area */}
            {isSidebarOpen && window.innerWidth < 768 && (
                <div
                    className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
                    onClick={toggleSidebar} // Clicking overlay closes sidebar
                ></div>
            )}

            {/* Sidebar - Contacts List Section */}
            {/* Conditional classes for responsive behavior: fixed for mobile overlay, relative for desktop */}
            {/* translate-x-0 or -translate-x-full for slide-in/out animation */}
            <div
                className={`fixed top-0 left-0 h-full bg-white shadow-md md:mt-2 md:ml-2 z-30 transition-transform duration-300 ease-in-out
                            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                            md:relative md:translate-x-0 md:flex md:w-1/3 lg:w-1/4 xl:w-1/5 md:min-w-[280px] md:shadow-none
                            w-full max-w-[280px] sm:max-w-[320px] flex-col flex`} // Further reduced max-width for very small screens
                style={{ borderColor: '#E2E8F0', backgroundColor: '#FFFFFF', borderRightWidth: '1px' }}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: '#E2E8F0' }}>
                    <h2 className="text-lg md:text-xl font-semibold" style={{ color: '#1A202C' }}>Inbox</h2> {/* Smaller on mobile, larger on md */}
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#D1FAE5', color: '#047857' }}>
                        3 New
                    </span>
                    {/* Menu icon to close sidebar on mobile (only visible on mobile) */}
                    <button onClick={toggleSidebar} className="md:hidden p-0.5 rounded-md hover:bg-gray-100">
                        <Icon name="Menu" size={18} style={{ color: '#A0AEC0' }} />
                    </button>
                </div>

                {/* Sidebar Search Input */}
                <div className="p-3 border-b" style={{ borderColor: '#E2E8F0' }}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-8 pr-3 py-1.5 text-sm rounded-lg focus:outline-none focus:ring-2" // Reduced pl for icon, text-sm for font
                            style={{ backgroundColor: '#F8FAFC', borderColor: '#CBD5E0', color: '#1A202C', outlineColor: '#38A169' }}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <Icon name="Search" size={16} style={{ color: '#A0AEC0' }} />
                        </div>
                    </div>
                </div>

                {/* Contacts List */}
                {/* Adjusted maxHeight to use viewport height (vh) for better full-screen fit on mobile */}
                <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}> {/* Adjust based on actual header/footer height on mobile */}
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            className={`flex items-center justify-between px-3 py-2 border-b border-b-gray-100 cursor-pointer transition-colors
                                        ${selectedContactId === contact.id ? 'bg-[#D1FAE5]' : 'hover:bg-[#F3F4F6]'} `}
                            style={{
                                backgroundColor: selectedContactId === contact.id ? '#D1FAE5' : 'transparent',
                                borderLeft: selectedContactId === contact.id ? '4px solid #38A169' : 'none',
                            }}
                            onClick={() => {
                                setSelectedContactId(contact.id);
                                if (window.innerWidth < 768) { // Close sidebar after selecting contact on mobile
                                    setIsSidebarOpen(false);
                                }
                            }}
                        >
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <div className="relative">
                                    <img src={contact.avatar} alt={contact.name} className="w-8 h-8 rounded-full md:w-10 md:h-10" /> {/* Smaller on mobile */}
                                    {contact.status === 'online' && (
                                        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full md:w-2.5 md:h-2.5" style={{ backgroundColor: '#38A169', border: '1px solid #FFFFFF' }}></span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate" style={{ color: '#1A202C' }}>{contact.name}</p>
                                    <p className="text-xs truncate" style={{ color: '#6B7280' }}>{contact.lastMessage}</p>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0 ml-1">
                                <p className="text-xs" style={{ color: '#A0AEC0' }}>{contact.time}</p>
                                {contact.unread > 0 && (
                                    <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-xs font-bold mt-0.5" style={{ backgroundColor: '#38A169', color: '#FFFFFF' }}> {/* Smaller unread badge */}
                                        {contact.unread}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area Section */}
            {/* Conditional display for mobile to hide chat when sidebar is open */}
            <div className={`flex flex-col flex-1 min-w-0 ${isSidebarOpen && window.innerWidth < 768 ? 'hidden' : 'flex'}`}>
                {/* Chat Header */}
                <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' }}>
                    {/* Menu icon for mobile to open sidebar (only visible on mobile) */}
                    <button onClick={toggleSidebar} className="md:hidden p-0.5 rounded-md hover:bg-gray-100">
                        <Icon name="Menu" size={20} />
                    </button>
                    {selectedContact && (
                        <div className="flex items-center space-x-2 rtl:space-x-reverse flex-1 ml-2 md:ml-0">
                            <div className="relative">
                                <img src={selectedContact.avatar} alt={selectedContact.name} className="w-9 h-9 rounded-full md:w-10 md:h-10" />
                                {selectedContact.status === 'online' && (
                                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full md:w-2.5 md:h-2.5" style={{ backgroundColor: '#38A169', border: '1px solid #FFFFFF' }}></span>
                                )}
                            </div>
                            <div>
                                <p className="font-semibold text-sm md:text-base" style={{ color: '#1A202C' }}>{selectedContact.name}</p>
                                <p className="text-xs md:text-sm" style={{ color: '#4A5568' }}>{selectedContact.status === 'online' ? 'Online' : 'Offline'}</p>
                            </div>
                        </div>
                    )}
                    <Icon name="MoreHorizontal" size={20} style={{ color: '#A0AEC0' }} />
                </div>

                {/* Messages Display */}
                {/* Reduced padding, adjusted max-height to ensure it fits without scrolling on small screens */}
                <div className="flex-1 p-3 overflow-y-auto space-y-3" style={{ backgroundColor: '#F8FAFC', maxHeight: 'calc(100vh - 100px)' }}> {/* Total header + input area height approx 100px */}
                    {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                            ابدأ المحادثة...
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                            >
                                {!message.isMe && (
                                    <img
                                        src={contacts.find(c => c.id === message.senderId)?.avatar || 'https://placehold.co/30x30/E2E8F0/A0AEC0?text=?'} // Even smaller avatar
                                        alt="Sender Avatar"
                                        className="w-7 h-7 rounded-full mr-1 rtl:mr-0 rtl:ml-1 flex-shrink-0"
                                    />
                                )}
                                <div
                                    className={`max-w-[75%] p-2 rounded-lg shadow-sm ${message.isMe
                                        ? 'text-white'
                                        : 'text-gray-900'
                                        }`}
                                    style={{
                                        backgroundColor: message.isMe ? '#4299E1' : '#FFFFFF',
                                    }}
                                >
                                    <p className="text-xs break-words">{message.text}</p> {/* Text-xs for messages */}
                                    <p className="text-[10px] text-right mt-0.5" style={{ color: message.isMe ? '#E2E8F0' : '#A0AEC0' }}>{message.time}</p>
                                </div>
                                {message.isMe && (
                                    <img
                                        src={contacts.find(c => c.id === 'user')?.avatar || 'https://placehold.co/30x30/E2E8F0/A0AEC0?text=U'} // Even smaller avatar
                                        alt="My Avatar"
                                        className="w-7 h-7 rounded-full ml-1 rtl:ml-0 rtl:mr-1 flex-shrink-0"
                                    />
                                )}
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Message Input Area */}
                {/* Reduced padding, smaller icons, smaller input font and padding */}
                <div className="p-2 border-t flex items-center space-x-1 rtl:space-x-reverse" style={{ borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' }}>
                    <Icon name="Plus" size={20} className="text-xl" style={{ color: '#A0AEC0' }} />
                    <Icon name="Smile" size={20} className="text-xl" style={{ color: '#A0AEC0' }} />
                    <Icon name="Paperclip" size={20} className="text-xl" style={{ color: '#A0AEC0' }} />
                    <input
                        type="text"
                        placeholder="Write a message..."
                        className="flex-1 px-3 py-1.5 text-sm rounded-lg focus:outline-none focus:ring-2"
                        style={{ backgroundColor: '#F8FAFC', borderColor: '#CBD5E0', color: '#1A202C', outlineColor: '#38A169' }}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                    />
                    <button
                        className="p-2 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#4299E1', color: '#FFFFFF' }}
                        onClick={handleSendMessage}
                    >
                        <Icon name="Send" size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;