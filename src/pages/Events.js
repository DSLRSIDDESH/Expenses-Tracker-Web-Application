import React, {useState} from "react";
import axios from 'axios';

export default function Events() {

    const [showEventPopup, setShowEventPopup] = React.useState([false,false]);
    const [eventDateList, setEventDateList] = useState({
        eventId: [],
        eventName: [],
        dates: []
    });
    const [updated, setUpdated] = React.useState(0)
    const [numberOfDivs, setNumberOfDivs] = useState(1);
    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/events", {
                    withCredentials: true
                });
                setEventDateList(prevEventDateList => {return {...prevEventDateList, eventId: response.data.map(event => event.id)}});
                setEventDateList(prevEventDateList => {return {...prevEventDateList, eventName: response.data.map(event => event.name)}});
                setEventDateList(prevEventDateList => {return {...prevEventDateList, dates: response.data.map(event => event.date)}});
                console.log("User data fetched:", response.data);
            } 
            catch (error) {
              console.error(error);
            }
          }
          fetchData();
    },[updated])

    const [paymentDetails, setPaymentDetails] = useState([{place: "",reason: "", expenses: [], paid: []}]);
    const [eventDetails, setEventDetails] = useState({eventName: "", eventDate: "", users: ['']});
    const [eventId, setEventId] = useState(0);

    const toggleEventPopup = () => {
        setShowEventPopup([true,false])
    }
    const toggleEventPopdown = () => {
        setShowEventPopup([false,false])
        setEventDetails({eventName: "", eventDate: "", users: ['']})
        // setEventId(0)
    }

    const handleAddUser = () => {
        setEventDetails(prevEventDetails => 
            {return {...prevEventDetails, users: [...prevEventDetails.users, '']}})
    };

    const handleRemoveInput = (index) => {
        const updatedEventDetails = {...eventDetails};
        updatedEventDetails.users.splice(index, 1);
        setEventDetails(updatedEventDetails);
    };

    const handleInputChange = (event, index) => {
        const newUsers = [...eventDetails.users];
        newUsers[index] = event.target.value;
        setEventDetails(prevDetails => { return { ...prevDetails, users: newUsers }});
    };

    const togglePopupNext = (event) => {
        event.preventDefault()
        
        async function postEvent() {
            try {
                const response = await axios.post("/events", {
                    withCredentials: true,
                    'event_name': eventDetails.eventName,
                    'date': eventDetails.eventDate,
                    'users': eventDetails.users
                });
                console.log("Event posted:", response.data);
                setEventId(response.data.id)

                console.log(`/events/${response.data.id}/`)
                const response2 = await axios.get(`/events/${response.data.id}`, {
                    withCredentials: true
                });
                console.log("User data users extra fetched:", response2.data);
                setEventDetails(prevDetails => { return { ...prevDetails, users: response2.data.users }})
                setEventDetails(prevDetails => { return { ...prevDetails, eventName: response2.data.name }})
                setEventDetails(prevDetails => { return { ...prevDetails, eventDate: response2.data.date }})
                console.log('after error')
                setUpdated(prevUpdate => prevUpdate + 1)
            }
            catch(error) {
                console.error(error);
            }
        }
        postEvent();
        setShowEventPopup([false,true])
        setPaymentDetails([{
                place: "", 
                reason: "", 
                expenses: Array(eventDetails.users.length + 1).fill(0),
                paid: Array(eventDetails.users.length + 1).fill(0)
            },{
                place: "", 
                reason: "", 
                expenses: Array(eventDetails.users.length + 1).fill(0),
                paid: Array(eventDetails.users.length + 1).fill(0)
            }])
    }
    const handlePostPlaces = (event) => {
        event.preventDefault()
        
        async function postPlaces() {
            try {
                const response = await axios.post("/events/payments", {
                    withCredentials: true,
                    'event_id': eventId,
                    'payments': paymentDetails
                });
                console.log("Event posted:", response.data);
                // setUpdated(prevUpdate => prevUpdate + 1)
            }
            catch(error) {
                console.error(error);
            }
        }
        postPlaces();
        setShowEventPopup([false,false])
        setPaymentDetails([{
                place: "", 
                reason: "", 
                expenses: [],
                paid: []
            }])
        setEventDetails({eventName: "", eventDate: "", users: ['']})
    }

    const eventList = eventDateList.eventName.map((name, index) => (
        <button key={index + '-name'} className="user-btn text-md text-[#553939] font-medium">{name}</button>
    ));

    const dateList = eventDateList.dates.map((date, index) => (
        <p key={index + '-date'} className="text-medium text-[#553939] font-medium py-1">{date.slice(0,-12)}</p>
    ));

    const handleAddDiv = () => {
        setNumberOfDivs(prev => prev + 1);
        setPaymentDetails(prevPaymentDetails => {
            return [
                ...prevPaymentDetails, {
                    place: "", 
                    reason: "", 
                    expenses: Array(eventDetails.users.length + 1).fill(0),
                    paid: Array(eventDetails.users.length + 1).fill(0)
                    }
                ]
        });
        console.log(paymentDetails)
    };
    
    const handleRemoveDiv = () => {
        if (numberOfDivs > 1) {
          setNumberOfDivs(prev => prev - 1);
        }
        setPaymentDetails(prevDetails => prevDetails.slice(0, -1));
    };
    
    const handlePaymentsChange = (event, index, field) => {
        const updatedPaymentDetails = [...paymentDetails];
        updatedPaymentDetails[index][field] = event.target.value;
        setPaymentDetails(updatedPaymentDetails);
      };
    const handleExpensesChange = (event, index, field, userIndex) => {
        const updatedPaymentDetails = [...paymentDetails];
        updatedPaymentDetails[index][field][userIndex] = event.target.value;
        setPaymentDetails(updatedPaymentDetails);
    };

    // React.useEffect(() => {
    //     renderDivs()
    // },[numberOfDivs])
    
    const renderDivs = () => {
        const divs = [];
        for (let i = 0; i < numberOfDivs; i++) {
          divs.push(
            <div key={i}>
                    <div className="flex flex-row w-fit px-10">
                        <label key={i + '-pl'} className="my-3 mr-2 text-base font-semibold">Place-{i+1}</label>
                        <input
                            key = {i + '-place'}
                            className="mr-8 w-44"
                            type="text"
                            placeholder="Enter Place"
                            onChange={(event) => handlePaymentsChange(event, i, "place")}
                        />
                        <label key={i + '-rl'} className="my-3 mr-2 text-base font-semibold">Reason-{i+1}</label>
                        <select
                            key = {i + '-reason'}
                            type="text"
                            className="mr-3 w-32"
                            placeholder="Reason"
                            onChange={(event) => handlePaymentsChange(event, i, "reason")}
                            required
                        >
                            <option value="Others">Others</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Movie">Movie</option>
                        </select>
                    </div>
                    <div className="flex flex-row w-fit px-10">
                        <div className="flex flex-col mr-10">
                            <label className="my-3 text-base text-gray-50">.</label>
                            {eventDetails.users.map((user, ind) => (
                                <label
                                    key={ind}
                                    className="my-4 text-base font-semibold font-normal"
                                >
                                    {user}
                                </label>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <label className="my-3 ml-12 mr-20 text-lg font-normal">
                                User Expense
                                </label>
                                <label className="my-3 ml-10 mr-2 text-lg font-normal">
                                User Paid
                                </label>
                            </div>
                                {eventDetails.users.map((user, index) => (
                                <div key={user.id} className="flex flex-row">
                                    <input
                                    key={user.id + '-expenses'}
                                    type="number"
                                    onChange={(event) => handleExpensesChange(event, i, "expenses", index)}
                                    // required
                                    />
                                    <input
                                    key={user.id + '-paid'}
                                    type="number"
                                    onChange={(event) => handleExpensesChange(event, i, "paid", index)}
                                    // required
                                    />
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
        }
        return divs;
      };

    return (
        <div className="main-content">
            <script src="http://localhost:8097"></script>
            <div className="flex flex-row space-bet justify-items-center items-center mt-6 mb-4">
                <p className=" text-3xl font-bold tracking-normal ml-1">Events</p>
                <button 
                    className="event-btn mt-2 bg-[#3C2A21] hover:bg-[[#3C2A21] w-fit h-10 text-[#F4EEE0]"
                    onClick={() => toggleEventPopup()}
                >
                    + New Event
                </button>
            </div>
            
            <div className="p-6 rounded-xl shadow-sm bg-[#F4EEE0] w-[35rem] h-[30rem] border border-gray-800 my-4">
                    <div className="flex flex-row space-bet">
                        <div className="px-10">
                            <p className="text-xl text-[#3C2A21] font-bold mb-2">Event</p>
                            <div className="flex flex-col">
                                {eventList}
                            </div>
                        </div>
                        <div className="px-10">
                            <p className="text-xl text-[#3C2A21] font-bold mb-2">Date</p>
                            <div className="flex flex-col">
                                {dateList}
                            </div>
                        </div>
                    </div>
            </div>

            {showEventPopup[0] ?
                <div className="pop-up shadow-xl bg-gray-50">
                    <p className="text-center text-xl mt-2 font-semibold text-[#675D50]">New Event</p>
                    <form className="grid grid-cols-2 p-8 gap-2 pt-6" onSubmit={togglePopupNext}>
                        <input className="" 
                            type="text" 
                            placeholder="Event Name"
                            value={eventDetails.eventName}
                            onChange={(e) => setEventDetails(prevDetails => 
                                { return {...prevDetails,eventName: e.target.value}})}
                            required
                        />
                        <input 
                            type="date" 
                            placeholder="Enter Date" 
                            value={eventDetails.eventDate}
                            onChange={(e) => setEventDetails(prevDetails => 
                                { return {...prevDetails,eventDate: e.target.value }})}
                            required
                        />

                        {eventDetails.users.map((input, index) => (
                            <div key={index} className="">
                                <input
                                    type="text"
                                    value={input.value}
                                    placeholder="Enter Username"
                                    onChange={(event) => handleInputChange(event, index)}
                                    required
                                /> 
                                {eventDetails.users.length !== 1 && (
                                    <label>
                                        <button 
                                            className="popup-btn text-red-700" 
                                            onClick={() => handleRemoveInput(index)}
                                        >
                                            Remove User
                                        </button>
                                    </label>
                                )}
                            </div>
                        ))}
                        <button 
                            onClick={handleAddUser} 
                            style={{ gridColumn: "2 / span 1",
                                    height: "34px" }}
                            className="popup-btn text-blue-600"
                        >
                            Add User
                        </button>
                        <button style={{ gridColumn: "1 / span 1" }} type="button" className="popup-btn text-red-600" onClick={toggleEventPopdown}>Cancel</button>
                        <button 
                            className="popup-btn text-green-600" 
                            style={{ gridColumn: "2 / span 1" }}
                        >
                            Next
                        </button>
                    </form>
                </div>
                : null
            }
            {showEventPopup[1] ?
                <div className="pop-up-2 shadow-xl bg-gray-50 w-fit">
                    <p className="text-center text-xl mt-2 font-semibold text-[#675D50]">Details</p>
                    <form className="p-8 gap-2 pt-6" onSubmit={handlePostPlaces}>
                        {renderDivs()}
                        <div className="ml-8 w-full">
                            <button style={{ gridColumn: "1 / span 1" }} type="button" className="popup-btn text-red-600 w-2/5" onClick={handleRemoveDiv}>Remove Place</button>
                            <button style={{ gridColumn: "1 / span 1" }} type="button" className="popup-btn text-sky-600 w-2/5" onClick={handleAddDiv}>+ Add Place</button>
                            <button 
                                className="popup-btn text-green-600 w-2/5 self-center"
                                // onClick={togglePopupNext}
                            >
                                Done
                            </button>
                        </div>
                    </form>
                </div>
                : null
            }
        </div>
    );
}