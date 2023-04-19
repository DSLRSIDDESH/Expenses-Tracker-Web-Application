import React,{useState} from "react";
import MyLine from "../statsPage/Line";
import MyComponent from "../statsPage/MyComp";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function Stats() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
    const [lineData,setLineData]= useState([
        {
          name: "Day 1",
          pay: 1000,
          receive: 2000
        },
        {
          name: "Day 2",
          pay: 1200,
          receive: 2200
        },
        {
          name: "Day 3",
          pay: 1500,
          receive: 2100
        },
        {
          name: "Day 4",
          pay: 1900,
          receive: 1700
        },
        {
          name: "Day 5",
          pay: 2200,
          receive: 1500
        },
        {
          name: "Day 6",
          pay: 2000,
          receive: 1800
        },
        {
          name: "Day 7",
          pay: 1700,
          receive: 2200
        },
        {
          name: "Day 8",
          pay: 1500,
          receive: 250
        },
        {
          name: "Day 9",
          pay: 1400,
          receive: 220
        },
        {
          name: "Day 10",
          pay: 1200,
          receive: 180        }
      ]);
    const [data,setInData]= useState([{ name: 'Abhishek', value: 310 },
    { name: 'Sujan', value: 300 },
    { name: 'Siddesh', value: 300 }]);

    const [data1,setOutData]= useState([{ name: 'Abiram', value: 220 },
    { name: 'Saikiran', value: 200 },
    { name: 'Karthik', value: 200 }]);

    React.useEffect(() => {
        async function fetch1Data() {
            try {
                const response = await axios.get("/stats/users", {
                    withCredentials: true
                });
                console.log("User data fetched:", response.data);
                setInData(response.data.incoming);
                // setLineData(response.data.line);
                setOutData(response.data.outgoing);
            }
            catch (error) {
              console.error(error);
            }
          }
          fetch1Data();
    }, []);

    React.useEffect(() => {
      async function fetch2Data() {
          try {
              const response = await axios.post('/stats/date', {
                  withCredentials: true,
                  'date1': startDate,
                  'date2': endDate
              });
              console.log("User data fetched:", response.data);
              setLineData(response.data);
          }
          catch (error) {
            console.error(error);
          }
        }
        fetch2Data();
  }, [startDate, endDate]);

    if(startDate>endDate){
      alert("Start date cannot be greater than end date");
    }
    return (
        <div>
            <>
<div style={{ display: "flex", alignItems: "center" }}>
  <div style={{ display: "flex", alignItems: "center" }}>
    <label style={{ marginRight: "0.5rem" }}>Start:</label>
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      selectsStart
      startDate={startDate}
      endDate={endDate}
      style={{
        backgroundColor: "#f5f5f5",
        border: "none",
        borderRadius: "4px",
        padding: "0.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
      }}
    />
  </div>
  <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
    <label style={{ marginLeft: "1rem", marginRight: "0.5rem" }}>End:</label>
    <DatePicker
      selected={endDate}
      onChange={(date) => setEndDate(date)}
      selectsEnd
      startDate={startDate}
      endDate={endDate}
      minDate={startDate}
      style={{
        backgroundColor: "#f5f5f5",
        border: "none",
        borderRadius: "4px",
        padding: "0.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
      }}
    />
  </div>
</div>

      </>
            <br />
            <br />
            <br />
            <MyLine data = {lineData}/>
            <br />
            <br />
            <br />
            <br />
            <MyComponent 
                data = {data} 
                data1 = {data1}
            />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}