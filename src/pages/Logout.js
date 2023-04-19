import {useEffect} from 'react';
import axios from 'axios';

export default function Logout() {
   useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post("/logout", {
                    withCredentials: true
                });
              window.location.href = "/login";
              console.log("User data fetched:", response.data);
            }
            catch (error) {
              console.error(error);
            }
          }
          fetchData();
    },[]);
}