import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import echo from '../../Components/EchoComponent/Echo';

function Conversation({recipientId }) {
    const [chatMessages, setChatMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const chatListRef = useRef(null);

    useEffect(() => {
        // Make a GET request to fetch messages
        axios.get('/messages/'+recipientId)
            .then(response => {
                setChatMessages(response.data.conversation.messages);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });

            // Join the private channel for real-time messages
            echo.private(`private-chat.${recipientId}`)
                .listen('PrivateMessageEvent', (message) => {
                    // Add the received message to the state
                    setChatMessages(prevMessages => [...prevMessages, message]);
                    scrollToBottom(); // Scroll to the latest message
                    console.log("ito yung laman ng message:" + message);
                });

    }, [recipientId, chatMessages]);

    // Function to scroll to the bottom of the chat list
    const scrollToBottom = () => {
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);
  return (
    <div>
        {isLoading ? (
        <div className='no-chat' style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ textAlign: 'center', margin: '0' }}>Currently, there are no conversations.</p>
        </div>
        ) : (
        <ul ref={chatListRef} className="chat-list" style={{ height: '400px', overflowY: 'auto'}}>
        {chatMessages.map((message, index) => (
            <li key={message.id} className={message.user.id == recipientId ? 'in' : 'out'}>
                {index === 0 || message.user.id !== chatMessages[index - 1].user.id ? (
                <div className="chat-img">
                    <img alt="Avatar" src={'/images/' + message.user.image} />
                </div>
                ) : null}
                <div className="chat-body">
                    <div className="chat-message">
                        <h5>{message.user.name}</h5>
                        <p>{message.content}</p>
                    </div>
                </div>
            </li>
        ))}
        </ul>
        )}
    </div>
  )
}


export default Conversation
