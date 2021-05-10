import React, { useContext,useState,useRef,useEffect } from "react";
import "../App.css";
import { chatContext } from "../contexts/Contexts";

export default function Chat() {
  const {
    message,
    messageList,
    setMessage,
    sendMessage,
    name,
    users,
  } = useContext(chatContext);

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
      scrollToBottom()
  }, [messageList])


  return (
    <div className="column-container">
        <div className="room-container">
        </div>
        <div className="row-container">
            <div className="chatContainer" >
                <div className="messages" ref={messagesEndRef}>
                {messageList.map((val, key) => {
                    return (
                        <div
                        className="messageContainer"
                        id={val.author === name ? "You" : "Other"}>
                        <div className="messageIndividual">{val.message}</div>
                        <h1> {val.author}</h1>
                    </div>
                    );
                })}
                </div>

                <div className="messageInputs">
                <input
                    type="text"
                    placeholder="Type Here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                <button type="submit" onClick={sendMessage}>
                    Send
                </button>
                </div>
            </div>

            <div className="userNames">
                {users.map((val, key) => {
                    return <h1> {val}</h1>;
                })}
            </div>

        </div>
    </div>    
  );
}
