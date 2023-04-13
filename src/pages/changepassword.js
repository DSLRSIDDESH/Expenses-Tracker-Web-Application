import React from "react";
import {useState} from 'react';

export default function Profile(props) {
    return(props.trigger)?( 
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={()=>props.setTrigger(false)}>close</button>
            {props.children}
            </div>
        </div>
    ):"";
}