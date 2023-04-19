import React from "react";
import {useState} from 'react';
import ChangePassword from './changepassword';
import axios from 'axios';

export default function Profile() {
    const [buttonPopup,setButtonPopup]=useState(false);
    const [editing, setEditing] = useState(false);
    const [sub, setSub] = useState(false);
    const [editable, setEditable] = React.useState({
        username:"hello",
        email:"123@gmail.com",
        upiid:"sbi@123.in",
        name:"JOHN",
        ch:false
    })
    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/users", {
                    withCredentials: true
                });
                setEditable(prevEditable=>{ return {...prevEditable,username:response.data.username,email:response.data.email,upiid:response.data.upi,name:response.data.name}})
                console.log("User data fetched:", response.data);
            } 
            catch (error) {
              console.error(error);
              window.location.href = "/login";
            }
          }
          fetchData();
    },[])

    function handleClick(){
        setSub(false);
        setEditing(false);
        window.alert("Details are saved")
      };
    function edit(){  
        setSub(true)
        setEditing(true);
    }
    function userChange(event){
          setEditable(prevEditable=>{
            return{
                ...prevEditable,
                [event.target.name]:event.target.value
        
        }})}

    const handleLogout=(e)=>{
        window.location.href = "/logout";
    }

    return ( 
    <>
    <div className="rounded-xl shadow-  w-3/6 m-11 " id="main">
    <div className="flex flex-row p-5 pt-0 space-bet" id="di">
    <div>
    <p className="text-2xl font-bold text-left pt-10 ">{editable.name}</p>
    <p className="text-base"><small>Since 2023</small></p>
    </div>
    <p className="pt-5 pr-4 text-xl text-[#3C2A21] font-bold " id="details"><button id="editb" onClick={edit}><svg width="25" height="30" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"></path></svg></button></p>
    </div>
    <hr className="hrr"></hr>
    <div className="flex flex-row p-5 pt-0 space-bet" id="di">
        <div className="flex pr-10">
            <p className="pt-5 pl-3 text-xl text-[#3C2A21] font-bold ">Username</p>
        </div>
        <p className="pt-5 pr-4 text-xl text-[#3C2A21] font-bold" id="details"><input className="w-[20rem] font-normal" id="user" value={editable.username} onChange={userChange} name="username" disabled={!editing} required/>
        </p>
    </div>
    <div className="flex flex-row p-5 pt-0 space-bet" id="di">
        <div className="flex pr-10">
            <p className="pl-3 text-xl text-[#3C2A21] font-bold ">Name</p>
        </div>
        <p className="pr-4 text-xl text-[#3C2A21] font-bold " id="details"><input className="w-[20rem] font-normal" id="user" value={editable.name} onChange={userChange} name="name" disabled={!editing}/></p>
    </div>
    <div className="flex flex-row p-5 pt-0 space-bet" id="di">
        <div className="flex pr-10">
            <p className=" pl-3 text-xl text-[#3C2A21] font-bold ">EmailId</p>
        </div>
        <p className=" pr-4 text-xl text-[#3C2A21] font-bold " id="details"><input className="w-[20rem] font-normal" id="user" value={editable.email} onChange={userChange} name="email" disabled={!editing}/></p>
    </div>
    <div className="flex flex-row p-5 pt-0 space-bet" id="di">
        <div className="flex pr-10">
            <p className="pl-3 text-xl text-[#3C2A21] font-bold ">Upiid</p>
        </div>
        <p className="pr-4 text-xl text-[#3C2A21] font-bold " id="details"><input className="w-[20rem] font-normal" id="user" value={editable.upiid} onChange={userChange} name="upiid" disabled={!editing}/></p>
    </div>
    <div className="flex flex-row  pt-0" id="subm">
    <div className="flex pr-10">
    {sub?  <button type="submit" className="save popup-btn-2" onClick={handleClick}>Save</button>:null}
    </div>
</div>
<div className="flex flex-row p-5 pt-0 space-bet" id="di">
        <div className="flex pr-10">
            <button id="editbn" className="popup-btn-2" onClick={()=>setButtonPopup(true)}>Change Password</button>
        </div>
    </div>
</div>
<ChangePassword trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h3>Change Password</h3>
                <input id="pass" type="password" onChange={userChange} placeholder="Old password"/>
                <input id="pass" type="password" onChange={userChange} placeholder="New password"/>
                <input id="pass" type="text" onChange={userChange} placeholder="Confirm Password"/>
            </ChangePassword>
        <button onClick={handleLogout} className="popup-btn-2 mt-5">Logout</button>
</>
    )
}