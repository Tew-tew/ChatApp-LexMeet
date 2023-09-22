import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Conversation({recipientId}) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Make a GET request to fetch messages
        axios.get('/messages/'+recipientId)
            .then(response => {
                setMessages(response.data.conversation.messages);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });

    }, [recipientId]);
  return (
    <div>
        {isLoading ? (
        <div className='no-chat' style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ textAlign: 'center', margin: '0' }}>Currently, there are no conversations.</p>
        </div>
        ) : (
        <ul className="chat-list" style={{ height: '400px', overflowY: 'auto'}}>
        {messages.map((message, index) => (
            <li key={message.id} className={message.user.id == recipientId ? 'in' : 'out'}>
                {index === 0 || message.user.id !== messages[index - 1].user.id ? (
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
