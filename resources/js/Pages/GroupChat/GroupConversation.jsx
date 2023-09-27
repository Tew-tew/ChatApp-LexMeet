import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import echo from '../../Components/EchoComponent/Echo';

function GroupConversation({auth, conversationId}) {
    const [chatMessages, setChatMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const chatListRef = useRef(null);
    useEffect(() => {

                const chatChannel = `group-chat`;
                echo.join(chatChannel)
                    .listen('GroupMessageEvent', (message) => {
                        console.log('Listening to channel:', chatChannel); // Log the channel you're listening to
                        console.log('Received message:', message);
                        // Add the received message to the state
                        console.log(message.message);
                        setChatMessages(prevMessages => [...prevMessages, message.message]);
                        scrollToBottom(); // Scroll to the latest message
                    });
                    // Make a GET request to fetch messages
                    axios.get(`/messages/${conversationId}`)
                    .then(response => {
                        setChatMessages(response.data.messages);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching messages:', error);
                    });
        return () => {
            // Clean up the Echo instance when the component unmounts
            echo.disconnect();
          };

    }, []);

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
                <p style={{ textAlign: 'center', margin: '0' }}>Loading...</p>
            </div>
        ) : chatMessages.length === 0 ? (
            <div className='no-chat' style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ textAlign: 'center', margin: '0' }}>Currently, there are no conversations.</p>
            </div>
        ) : (
        <ul ref={chatListRef} className="chat-list" style={{ height: '400px', overflowY: 'auto'}}>
        {chatMessages.map((message, index) => (
            <li key={message.id} className={message.user.id == auth.user.id ? 'out' : 'in'}>
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


export default GroupConversation
