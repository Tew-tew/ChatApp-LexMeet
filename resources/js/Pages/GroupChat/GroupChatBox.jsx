import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import '../../../css/chat.css';
import GroupConversation from "./GroupConversation";
import GroupMessageForm from "./GroupMessageForm";
import { useState } from "react";

const GroupChatBox = ({auth, conversationId}) => {
    const [messages, setMessages] = useState([]);
    conversationId = 1; //group chat id
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
                        <GroupConversation auth={auth} messages={messages} conversationId={conversationId}/>
                        <GroupMessageForm addMessage={addMessage} conversationId={conversationId}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default GroupChatBox;
