import React from "react";
import "./css/MessageBox.css";

const MessageBox = (props) => {
	
	const { message } = props;

	return (
        <div className="message" >
          	<span className="time">({ message.time })</span> 
          	<span className="username">{ message.username }:</span> 
          	<span className="text">{ message.message }</span>
        </div>
	);
}

export default MessageBox;