import React from 'react'
import PropTypes from 'prop-types'

function Conversation({recipientId}) {


  return (
    <ul className="chat-list" style={{ height: '500px', overflowY: 'auto'}}>
        {/* classname in and out */}
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
  )
}


export default Conversation
