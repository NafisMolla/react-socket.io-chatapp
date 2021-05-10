import "./App.css";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { chatContext, logContext } from "./contexts/Contexts";
import Chat from "./components/Chat";
import Logg from "./components/Logg";

let socket;
const CONNECTION_PORT = "localhost:3003/";

function App() {
  //before login
  const [logged, setLogged] = useState(false);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  //after login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [users,setUsers] = useState([]);


  useEffect(() => {
    socket = io(CONNECTION_PORT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.on("recieve_message", (data) => {
      setMessageList(messageList => 
      [...messageList, data]);
    });

    socket.on("joined_user", (data) => {
      setUsers(data);
      console.log(users)
    });
    
    return () => socket.disconnect();

  }, []);

  function connectRoom() {
    socket.emit("join", { room, name });
    socket.emit("user",{ room, name });
    setUsers( users => [...users,name]);
    setLogged(true);
  }

  function sendMessage() {
    let messageContent = {
      room: room,
      content: {
        author: name,
        message: message,
      },
    };
    socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");

  
	  
  }

  return (
    <div className="App">
      {!logged ? (
        <logContext.Provider value={{ setName, setRoom, connectRoom }}>
          <Logg />
        </logContext.Provider>
      ) : (
        <>
          <chatContext.Provider
            value={{
              message,
              messageList,
              setMessage,
              sendMessage,
			        name,
              users
            }}>
            <Chat />
          </chatContext.Provider>
        </>
      )}
    </div>
  );
}

export default App;

