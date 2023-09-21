import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import '../../../css/chat.css';
import Conversation from "./Conversation";
import MessageForm from "./MessageForm";

const ChatBox = ({recipientId}) => {

  return (
    <div className="container content">
        <div className="row d-flex justify-content-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="card">
                    <div className="card-header">Chat</div>
                    <div className="card-body height3">
                        <Conversation recipientId={recipientId}/>
                        <MessageForm recipientId={recipientId}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ChatBox;
