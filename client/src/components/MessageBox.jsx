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
} else if (message.username && props.user && message.username === props.user) {
  return (
        <div className="message message-left" >
            <span className="time">({ message.time })</span> 
            <span className="username">{ message.username }:</span> 
            <div className="text">{ message.message }</div>
        </div>
  );
} else if (message.username && message.username !== props.user) {
  return (
        <div className="message message-right" >
            <span className="time">({ message.time })</span> 
            <span className="username">{ message.username }:</span> 
            <div className="text">{ message.message }</div>
        </div>
  );
} else {
  console.error("ERROR: ", "MessageBox");
  return (<div>ERROR WITH MESSAGE</div>);
}
}

export default MessageBox;