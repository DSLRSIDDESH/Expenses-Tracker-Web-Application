import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Verify(){
    const [message, setMessage] = useState('Verifying your email address...');

    useEffect(() => {
        async function VerifyEmail(){
            const params = new URLSearchParams(window.location.search);
            const accessToken = params.get('token');

            try{
                const response = await axios.get('http://localhost:5000/verify', {
                    params: {
                        token: accessToken
                    }
                });
                setMessage('Your email address has been verified!');
                console.log(response.data);
            }catch(error){
                console.log(error);
            }
        }
        VerifyEmail();
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}