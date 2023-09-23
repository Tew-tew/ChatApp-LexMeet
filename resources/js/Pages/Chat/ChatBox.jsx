import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import '../../../css/chat.css';
import Conversation from "./Conversation";
import MessageForm from "./MessageForm";
import { useState } from "react";

const ChatBox = ({recipientId}) => {
    const [messages, setMessages] = useState([]);

    // Callback function to add a new message to the messages state
    const addMessage = (newMessage) => {
        setMessages([...messages, newMessage]);
    };

  return (
    <div className="container content">
        <div className="row d-flex justify-content-center">
            <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 col-12">
                <div className="card">
                    <div className="card-header">Chat</div>
                    <div className="card-body height3">
                        <Conversation recipientId={recipientId} messages={messages}/>
                        <MessageForm recipientId={recipientId} addMessage={addMessage}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ChatBox;
