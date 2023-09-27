import { FaPaperclip } from 'react-icons/fa';
import React, { useRef, useState } from 'react';
import axios from 'axios';

export default function GroupMessageForm({ addMessage, conversationId }) {
    const [content, setContent] = useState('');
    const fileInputRef = useRef(null);

    const handleAttachmentClick = () => {
        fileInputRef.current.click(); // Trigger the file input
    };

    const handleFileChange = (e) => {
        // Handle the selected file here
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // You can perform additional actions here if needed
            console.log('Selected File:', selectedFile.name);
        }
    };

    const handleSendMessage = () => {
        // Check if the message text is not empty
        if (content.trim() === '') {
            return; // Do not send an empty message
        }

        // Determine if the content is an image
        const isImage = isImageContent(content);

        // Define the content type based on the 'isImage' flag
        const messageType = isImage ? 'image' : 'text';

        // Create a FormData object for sending data (text or image)
        const formData = new FormData();
        formData.append('messageType', messageType);
        formData.append('text', content);
        formData.append('conversationId', conversationId);
        if (isImage) {
            formData.append('imageData', fileInputRef.current.files[0]);
        }

        // Send the message
        axios
            .post("/send-message", formData)
            .then((response) => {
                console.log("Message sent successfully:", response.data);
                // You can add the new message to the chat here
                addMessage(response.data);

                // Clear the input fields
                setContent('');
                fileInputRef.current.value = null;
            })
            .catch((error) => {
                console.error("Error sending message:", error);
                // Handle the error and show an error message to the user
            });
    };

    // Function to check if content is an image based on specific criteria
    const isImageContent = (content) => {
        // Check if the content starts with a data URI or contains specific keywords
        return content.startsWith('data:image/') || content.includes('image:');
    };

    return (
        <div className="chat-input-container">
            <input
                type="text"
                className="form-control"
                placeholder="Type your message..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSendMessage();
                    }
                }}
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
            <button className="btn btn-primary" onClick={handleSendMessage}>
                Send
            </button>
        </div>
    );
}
