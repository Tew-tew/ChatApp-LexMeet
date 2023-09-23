import { FaPaperclip } from 'react-icons/fa';
import React, { useRef, useState } from 'react';
import axios from 'axios';

export default function MessageForm({recipientId, addMessage}) {
    const [content, setContent] = useState('');
    const fileInputRef = useRef(null);

    const handleAttachmentClick = () => {
        fileInputRef.current.click(); // Trigger the file input
    };

    const handleFileChange = (e) => {
        // Handle the selected file here
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const selectedFileName = selectedFile.toString(); // Convert to string
            console.log('Selected File:', selectedFileName);
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

        // Call the onSendMessage callback with the message text and recipient ID
        const sendMessage = (content, recipientId, messageType) => {
            const messageData = {
                text: content,
                recipientId: recipientId,
                messageType: messageType,
            };

            axios
            .post("/send-message", messageData)
            .then((response) => {
                console.log("Message sent successfully:", response.data);
                addMessage({ content,  messageData});

                setContent('');
            })
            .catch((error) => {
            console.error("Error sending message:", error);
                // Handle the error and show an error message to the user
            });
        };

        // Clear the message input field

        // Determine content type and send the message
        if (isImage) {
            // Handle sending images here
            sendMessage(content, recipientId, messageType);
        } else {
            // Handle sending text here
            sendMessage(content, recipientId, messageType);
        }
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
  )
};
