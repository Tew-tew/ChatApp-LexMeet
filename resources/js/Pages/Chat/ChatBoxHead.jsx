import { Button, Card, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import '../../../css/chat.css';
import { FaPaperclip } from 'react-icons/fa';
const ChatBoxHead = () => {
    const fileInputRef = useRef(null);

    const handleAttachmentClick = () => {
        fileInputRef.current.click(); // Trigger the file input
    };

    const handleFileChange = (e) => {
        // Handle the selected file here
        const selectedFile = e.target.files[0];
        if (selectedFile) {
        // You can perform actions with the selected file here (e.g., upload it)
        console.log('Selected File:', selectedFile);
        }
    };

  return (
    <div className="container content">
        <div className="row d-flex justify-content-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="card">
                    <div className="card-header">Chat</div>
                    <div className="card-body height3">
                        <ul className="chat-list" style={{ height: '500px', overflowY: 'auto'}}>
                            <li className="in">
                                <div className="chat-img">
                                    <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png"/>
                                </div>
                                <div className="chat-body">
                                    <div className="chat-message">
                                        <h5>Jimmy Willams</h5>
                                        <p>Raw denim heard of them tofu master cleanse</p>
                                    </div>
                                </div>
                            </li>
                            <li className="out">
                                <div className="chat-img">
                                    <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                                </div>
                                <div className="chat-body">
                                    <div className="chat-message">
                                        <h5>Serena</h5>
                                        <p>Next level veard</p>
                                    </div>
                                </div>
                            </li>
                            <li className="in">
                                <div className="chat-img">
                                    <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png"/>
                                </div>
                                <div className="chat-body">
                                    <div className="chat-message">
                                        <h5 className="name">Jimmy Willams</h5>
                                        <p>Will stumptown scenes coffee viral.</p>
                                    </div>
                                </div>
                            </li>
                            <li className="out">
                                <div className="chat-img">
                                    <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                                </div>
                                <div className="chat-body">
                                    <div className="chat-message">
                                        <h5>Serena</h5>
                                        <p>Tofu master best deal</p>
                                    </div>
                                </div>
                            </li>
                            {/*  */}
                            <li className="in">
                                <div className="chat-img">
                                    <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png"/>
                                </div>
                                <div className="chat-body">
                                    <div className="chat-message">
                                        <h5>Jimmy Willams</h5>
                                        <p>Raw denim heard of them tofu master cleanse</p>
                                    </div>
                                </div>
                            </li>
                            <li className="out">
                                <div className="chat-img">
                                    <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                                </div>
                                <div className="chat-body">
                                    <div className="chat-message">
                                        <h5>Serena</h5>
                                        <p>Next level veard</p>
                                    </div>
                                </div>
                            </li>
                            <li className="in">
                                <div className="chat-img">
                                    <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png"/>
                                </div>
                                <div className="chat-body">
                                    <div className="chat-message">
                                        <h5 className="name">Jimmy Willams</h5>
                                        <p>Will stumptown scenes coffee viral.</p>
                                    </div>
                                </div>
                            </li>
                            <li className="out">
                                <div className="chat-img">
                                    <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                                </div>
                                <div className="chat-body">
                                    <div className="chat-message">
                                        <h5>Serena</h5>
                                        <p>Tofu master best deal</p>
                                    </div>
                                </div>
                            </li>

                        </ul>
                            <div className="chat-input-container">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type your message..."
                                />
                                <FaPaperclip
                                    className="attachment-icon"
                                    onClick={handleAttachmentClick} // Handle click on the icon
                                />
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="form-control-file"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <button
                                    className="btn btn-primary"
                                >
                                    Send
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ChatBoxHead;
