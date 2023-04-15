import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import axios from 'axios';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    const authenticateUser = () =>{
        let loginFields={
                email:loginState['email-address'],
                password:loginState['password']
        };
           
        // const endpoint=`https://api.loginradius.com/identity/v2/auth/login?apikey=${apiKey}&apisecret=${apiSecret}`;
        //  fetch(endpoint,
        //      {
        //      method:'POST',
        //      headers: {
        //      'Content-Type': 'application/json'
        //      },
        //      body:JSON.stringify(loginFields)
        //      }).then(response=>response.json())
        //      .then(data=>{
        //         //API Success from LoginRadius Login API
        //      })
        //      .catch(error=>console.log(error))
        async function loginRequest() {
            try {
                const response = await axios.post('https://expensetracker-backend-production.up.railway.app/login',{'username':loginFields.email,'password':loginFields.password});
              console.log("User data fetched:", response.data);
            //   window.location.href = "/";
            } catch (error) {
              console.error(error);
              alert(error.response.data.message)
                // if(error.response.status === 401){
                // }
            }
          }
            loginRequest();
        }
    

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            minLength={field.minLength}
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />,
                )
            }
        </div>

       
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}