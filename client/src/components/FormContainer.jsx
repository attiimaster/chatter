import React from "react";

const FormContainer = (props) => {
	
	const { onSubmit, onChange, value } = props;

	return (
        <div className="form">
          <form onSubmit={ onSubmit }>
            <input type="text" placeholder="Message" className="form-control" value={ value } onChange={ onChange } required />
            <button type="submit" className="btn btn-primary form-control">Send</button>
          </form>
        </div>
	);
}

export default FormContainer;