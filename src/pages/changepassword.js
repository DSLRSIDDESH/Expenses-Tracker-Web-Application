import React from "react";

export default function Profile(props) {
    function check(){
        props.setTrigger(false)
    }
    return(props.trigger)?( 
        <div className="popup">
            <div className="popup-inner">
                <button id="editbn" onClick={check}>Close</button>
            {props.children}
            </div>
        </div>
    ):"";
}