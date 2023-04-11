import React from "react";

export default function Home() {
    const user_name = "John Doe"

    const [balance, setBalance] = React.useState({
        totalBalance: 0.00,
        totalIncome: 0.00,
        totalExpense: 0.00
    })

    const [addIncome, setAddIncome] = React.useState({value: 0.00})
    const [addExpense, setAddExpense] = React.useState({value: 0.00})
    const [balanceList, setBalanceList] = React.useState({
        currentName: [], currentBalance: [], currentReason: 'Others', currentPrivate: false,
        userName: [], userBalance: [], userReason: [], userPrivate: []
    })

    function handleIncomeValue(e) {
        setAddIncome(prevAdd => {return {...prevAdd,value: e.target.value}})
        setBalanceList(prevBal => {return {...prevBal,currentBalance: e.target.value}})
    }
    function handleExpenseValue(e) {
        setAddExpense(prevAdd => {return {...prevAdd,value: e.target.value}})
        setBalanceList(prevBal => {return {...prevBal,currentBalance: e.target.value}})
    }
    function handleName(e) {
        setBalanceList(prevBal => {return {...prevBal,currentName: e.target.value}})
    }
    function handleReason(e) {
        setBalanceList(prevBal => {return {...prevBal,currentReason: e.target.value}})
    }
    function handleCheck(e) {
        setBalanceList(prevBal => {return {...prevBal, currentPrivate: e.target.checked}})
    }

    function handleSubmit(event) {
        event.preventDefault()
        let newBalance = balanceList.currentBalance, value = addIncome.value, incomeType = 'totalIncome'
        if(showPopup.type !== 'Credit'){
            newBalance = -balanceList.currentBalance
            value = addExpense.value
            incomeType = 'totalExpense'
        }
        setBalance(prevBal => {return {...prevBal, [incomeType]: prevBal[incomeType] + parseFloat(value)}})
        setBalanceList(prevBal => {
        return {...prevBal,
            userName: [...prevBal.userName, prevBal.currentName],
            userBalance: [...prevBal.userBalance, newBalance],
            userReason: [...prevBal.userReason, prevBal.currentReason], 
            userPrivate: [...prevBal.userPrivate, prevBal.currentPrivate]
        }})
        showPopup.type === 'Credit'
           ? setAddIncome(prevAdd => { return {...prevAdd,show: false, value: 0.00}})
           : setAddExpense(prevAdd => { return {...prevAdd,show: false, value: 0.00}})
        setShowPopup(prevPopup => false);
    }

    React.useEffect(function() {
        console.log(balanceList.userReason)
        console.log(balanceList.userPrivate)
        const income = balance.totalIncome
        const expense = balance.totalExpense
        setBalance(prevBal => {return {...prevBal, totalBalance: income - expense}})
    },[balance.totalIncome, balance.totalExpense, balanceList.userReason])

    const balanceType = balance.totalBalance === 0.00 ? "" : balance.totalBalance > 0.00 ? "+" : "-"

    const userList = balanceList.userName.map((name, index) => (
            <p key={index} className="text-xl text-[#553939] font-medium">{name}</p>
      ));
    const amountList = balanceList.userName.map((balance, index) => (
        <p key={index} className="text-xl text-[#553939] font-medium">
            {balanceList.userBalance[index] < 0 ? '-' : '+'}
            ₹{Math.abs(balanceList.userBalance[index])}
        </p>
    ));
    const [showPopup, setShowPopup] = React.useState({show: false, type: ''});

    function togglePopup(typ) {
        setShowPopup(prevPopup => {return{...prevPopup,show: true,type: typ}});
    }
    function togglePopdown() {
        setShowPopup(prevPopup => false);
    }

    return (
        <div className="main-content">
        {showPopup.show ?
            <div className="pop-up shadow-xl bg-gray-50">
                <p className="text-center text-xl mt-2 font-semibold text-[#675D50]">{showPopup.type}</p>
                <form className="grid grid-cols-2 p-8 gap-2 pt-6" onSubmit={handleSubmit}>
                    <input className="" 
                        type="text" 
                        placeholder="Username"
                        onChange={showPopup.type === 'Credit' ? handleName : handleName}
                        required
                    />
                    <input 
                        type="number" 
                        placeholder="Amount" 
                        onChange={showPopup.type === 'Credit' ? handleIncomeValue : handleExpenseValue}
                        required
                        />
                    <select 
                        type="text" 
                        placeholder="Reason"
                        onChange={handleReason}
                        required
                    >
                        <option value="Others">Others</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Movies">Movie</option>
                    </select>
                    <div className="pt-2">
                        <input className="" type="checkbox" id="check" onChange={handleCheck}/>
                        <label htmlFor="check" className="">Keep it private</label>
                    </div>
                    <button className="popup-btn text-green-600">Update</button>
                    <button type="button" className="popup-btn text-red-600" onClick={togglePopdown}>Cancel</button>
                </form>
            </div>
            : null
        }
            <p 
                className="text-4xl font-bold tracking-normal ml-1 mt-8"
            >
                <span className="text-purple-600">Hello</span>, {user_name}!
            </p>
            <div className="flex flex-row cards">
                <div className="bg-[#144272] w-fit py-6 px-10 my-10 rounded-xl shadow-2xl text-[#A5D7E8] transition-all duration-1000">
                    <p className="text-2xl font-medium">Total Balance</p>
                    <p className="text-4xl text-[#A5D7E8] font-normal">{balanceType}₹{Math.abs(balance.totalBalance).toLocaleString()}</p>
                    <div className="flex flex-row">
                        <div className="m-5 ml-0">
                            <p className="text-xl font-medium"><span className="text-green-600 text-2xl">&#x25B4;</span> Incoming</p>
                            <p className="text-2xl">+₹{balance.totalIncome.toLocaleString()}</p>
                            <button className="btn mt-2 hover:bg-[#144272]" onClick={() => togglePopup('Credit')}>+ Add</button>
                        </div>
                        <div className="m-5">
                            <p className="text-xl font-medium"><span className="text-[#ED2B2A] text-2xl">&#x25BE;</span> Outgoing</p>
                            <p className="text-2xl">-₹{balance.totalExpense.toLocaleString()}</p>
                            <button className="btn mt-2 hover:bg-[#144272]" onClick={() => togglePopup('Debt')}>+ Add</button>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl shadow-sm bg-[#F4EEE0] w-96 border border-gray-800 m-10">
                    <p className="text-2xl font-bold text-center m-5 text-[#3C2A21]">Transactions</p>
                    <div className="flex flex-row p-5 pt-0 space-bet">
                        <div className="pr-10 pl-10">
                            <p className="text-xl text-[#3C2A21] font-bold mb-2">User</p>
                            {userList}
                        </div>
                        <div className="pl-10 pr-10">
                            <p className="text-xl text-[#3C2A21] font-bold mb-2">Amount</p>
                            {amountList}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}