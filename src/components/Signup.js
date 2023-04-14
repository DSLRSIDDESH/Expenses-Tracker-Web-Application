import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

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