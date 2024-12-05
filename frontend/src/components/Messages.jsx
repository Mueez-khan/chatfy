import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

// Socket connection to the server
const socket = io('http://localhost:8000');

const Messages = () => {
    const dispatch = useDispatch();
    // console.log(dispatch)
    const { receiverId } = useParams();
    const user = useSelector((state) => state.auth.user); // Get current user from Redux
    const [messages, setMessages] = useState([]); // State to store messages
    const [newMessage, setNewMessage] = useState(''); // State to hold the new message input

    // Fetch existing messages when the component mounts
    useEffect(() => {
        // Fetch existing messages (you can implement your backend call here)
        const fetchMessages = async () => {
            try {
                const response = await fetch(`${import.meta.env.URL}/${receiverId}`);
                // const data = await response.json();
                 console.log(response);
                if (response.data.success) {
                    setMessages(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        // Listen for incoming messages in real-time
        socket.on('newMessage', (message) => {
            // If the incoming message is for this chat
            if (message.receiverId === receiverId || message.senderId === receiverId) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        // Cleanup on unmount
        return () => {
            socket.off('newMessage');
        };
    }, [receiverId]);

    // Handle message input change
    const handleChange = (e) => {
        setNewMessage(e.target.value);
    };

    // Handle send message
    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            // Send the message to the backend to save and broadcast via Socket.IO
            const response = await fetch(`http://localhost:8000/api/v1/message/${receiverId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newMessage }),
            });

            console.log("Response " , response);

            const data = await response.json();

            if (data.success) {
                socket.emit('sendMessage', {
                    content: newMessage,
                    receiverId,
                });

                setMessages((prevMessages) => [
                    ...prevMessages,
                    { content: newMessage, senderId: user.id, receiverId },
                ]);

                setNewMessage(''); // Clear the input field
            } else {
                toast.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Error sending message');
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={message.senderId === user.id ? 'sent-message' : 'received-message'}>
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={handleChange}
                    placeholder="Type a message"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Messages;
