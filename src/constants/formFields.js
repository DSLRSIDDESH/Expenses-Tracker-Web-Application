const loginFields=[
    {
        
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"text",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Username or Email address" ,
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password" ,
        minLength:4,  
    }
]

const signupFields=[
    {
        
        labelText:"Name",
        labelFor:"name",
        id:"name",
        name:"name",
        type:"text",
        autoComplete:"name",
        isRequired:true,
        placeholder:"Name"   
    },
    {
        labelText:"Username",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Username"   
    },
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
      
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password",
        minLength:4 
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Confirm Password",
        minLength:4  
    },
    // {
    //     labelText:"Upiid",
    //     labelFor:"upiid",
    //     id:"upiid",
    //     name:"upiid",
    //     type:"email",
    //     autoComplete:"upiid",
    //     isRequired:true,
    //     placeholder:"UpiId",  
    // }
]

export {loginFields,signupFields}