import React from "react";
import "./css/MessageBox.css";

const MessageBox = (props) => {
	
	const { message } = props;

if (message.username === "SERVER") {
	return (
        <div className="message server-message" >
          	<span className="time">({ message.time })</span> 
          	<span className="username">{ message.username }:</span> 
          	<span className="text">{ message.message }</span>
        </div>
	);
} else {
	return (
        <div className="message" >
          	<span className="time">({ message.time })</span> 
          	<span className="username">{ message.username }:</span> 
          	<div className="text">{ message.message }</div>
        </div>
	);
}
}

export default MessageBox;