import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import {useState} from 'react';
export default function Profile(props) {
    const [but,setBut]=useState(false);
    function tr(){
        setBut(true)
        props.setTrigger(false)
    }
    function check(){
        props.setTrigger(false)
    }
    return(props.trigger)?( 
        <div className="popup">
            <div className="popup-inner">
                {props.children}
                <div className="con">
                <button id="edits" onClick={tr}>Save</button>
                <button id="editbn" onClick={check}>Close</button>
                </div>
            </div>
        </div>
    ):"";
}