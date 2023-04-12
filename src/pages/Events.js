import React, {useState} from "react";

export default function Events() {

    const [showEventPopup, setShowEventPopup] = React.useState([false,false]);

    const [event, setEvent] = useState({
        eventName: "",
        eventDate: "",
    });

    const [inputs, setInputs] = useState([{ value: "" }]);

    // const [details, setDetails] = useState({
    //     place: "", 
    //     reason: "", 
    //     users: []
    // })

    const toggleEventPopup = () => {
        setShowEventPopup([true,false])
    }
    const toggleEventPopdown = () => {
        setShowEventPopup([false,false])
        setInputs([{ value: "" }]);
    }

    const handleAddInput = () => {
        const newInputs = [...inputs, { value: "" }];
        setInputs(newInputs);
    };

    const handleRemoveInput = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
    };

    const handleInputChange = (event, index) => {
        const newInputs = [...inputs];
        newInputs[index].value = event.target.value;
        setInputs(newInputs);
    };

    // React.useEffect(() => {
    //     const userNames = inputs.map(user => ({ userName: user.value, expense: 0, paid: 0 }))
    //     setDetails(prevDetails => { return { ...prevDetails, users: userNames }})
    //     console.log(details)
    // },[inputs])

    const togglePopupNext = () => {
        setShowEventPopup([false,true])
    }
    const togglePopupBack = () => {
        setShowEventPopup([true,false])
    }

    return (
        <div className="main-content">
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
                            {/* {userList} */}
                        </div>
                        <div className="px-10">
                            <p className="text-xl text-[#3C2A21] font-bold mb-2">Date</p>
                            {/* {amountList} */}
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
                            value={event.eventName}
                            onChange={(e) => setEvent({ ...event, eventName: e.target.value })}
                            required
                        />
                        <input 
                            type="date" 
                            placeholder="Enter Date" 
                            value={event.eventDate}
                            onChange={(e) => setEvent({ ...event, eventDate: e.target.value })}
                            required
                        />
                        {/* ❌ */}
                        {inputs.map((input, index) => (
                            <div key={index}>
                            <input
                                type="text"
                                value={input.value}
                                placeholder="Enter Username"
                                onChange={(event) => handleInputChange(event, index)}
                                required
                            /> 
                            {inputs.length !== 1 && (
                                <label>
                                    <button className="remove-btn text-blue text-xl" onClick={() => handleRemoveInput(index)}>
                                        -
                                    </button>
                                </label>
                            )}
                            </div>
                        ))}
                        <button 
                            onClick={handleAddInput} 
                            style={{ gridColumn: "2 / span 1",
                                    height: "34px" }}
                            className="popup-btn"
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
                    <form className="p-8 gap-2 pt-6">
                        <div className="flex flex-row w-fit px-10">
                            <label className="my-3 mr-2 text-base font-semibold">Place</label>
                            <input className="mr-8 w-44"
                                    type="text" 
                                    placeholder="Enter Place"
                                    // onChange={}
                                />
                            <label className="my-3 mr-2 text-base font-semibold">Reason</label> 
                            <select 
                                type="text" 
                                className="mr-3 w-32"
                                placeholder="Reason"
                                // onChange={}
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
                                {inputs.map((input, index) => (
                                <label key={index} className="my-4 text-base font-semibold font-normal">{inputs[index].value}</label>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row">
                                    <label className="my-3 ml-12 mr-20 text-lg font-normal">User Expense</label>
                                    <label className="my-3 ml-10 mr-2 text-lg font-normal">User Paid</label>
                                </div>
                                {inputs.map((input, index) => (
                                    <div className="flex flex-row">
                                        <input
                                            key={index}
                                            type="number"
                                            // placeholder="Enter Amount"
                                            // onChange={}
                                            required
                                        />
                                        <input
                                            key={index}
                                            type="number"
                                            // placeholder="Enter Amount"
                                            // onChange={}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="ml-8 w-full">
                            <button style={{ gridColumn: "1 / span 1" }} type="button" className="popup-btn text-red-600 w-2/5" onClick={togglePopupBack}>Back</button>
                            <button 
                                className="popup-btn text-green-600 w-2/5" 
                                style={{ gridColumn: "2 / span 1" }}
                                onClick={togglePopupNext}
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