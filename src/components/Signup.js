import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from 'axios';

const fields=signupFields;
let fieldsState={};
fields.forEach(field => fieldsState[field.id]='');
export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});
  const handleSubmit=(e)=>{
   e.preventDefault();
   const hasSpecialChars = signupState["password"].match(/[!@#$%^&*()+\-=[\]{};':"\\|,.<>/?]+/);
   if (hasSpecialChars) {
    alert('Special characters are not allowed(except "_")');
    return;
  }
    const password=signupState["password"]
   signupState[password]===signupState["confirm-password"] ? createAccount():window.alert("Confirm password must be same as password")
  }

  const createAccount=()=>{
    let signupFields={
      'email':signupState['email-address'],
      'password':signupState['password'],
      'name':signupState['name'],
      'username':signupState['username'],
    };
    async function signupRequest() {
      try {
          const response = await axios.post('/register',signupFields);
        console.log("User data fetched:", response.data);
        alert(response.data.message);
      } catch (error) {
        console.error(error);
          // if(error.response.status === 401){
          // }
      }
    }
      signupRequest();
  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            minLength={field.minLength}
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
            
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>
      </form>
    )
}