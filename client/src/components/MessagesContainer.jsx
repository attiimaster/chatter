import React from "react";

import MessageBox from "./MessageBox";

const MessagesContainer = (props) => {
	
	const { messages } = props;

	return (
        <div className="messages">
          { messages.map((message, i) => <MessageBox user={ props.user } message={ message } key={i} />) }
        </div>
	);
}

export default MessagesContainer;