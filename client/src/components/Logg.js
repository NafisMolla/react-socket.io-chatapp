import React, { useContext } from "react";
import "../App.css";
import { logContext } from "../contexts/Contexts";

export default function Logg() {
  const { setName, setRoom, connectRoom } = useContext(logContext);
  return (
    <div className="background">
      <div className="box">
        <span className="text-center">login</span>
        <div className="input-container">
          <input
            type="text"
            required=""
            onChange={(e) => setName(e.target.value)}
          />
          <label>Full Name</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            required=""
            onChange={(e) => setRoom(e.target.value)}
          />
          <label>Room</label>
        </div>
        <button type="button" className="btn" onClick={connectRoom}>
          submit
        </button>
      </div>
    </div>
  );
}
