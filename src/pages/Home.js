import React from "react";

export default function Home() {
    const user_name = "John Doe"

    const [balance, setBalance] = React.useState({
        totalBalance: 0.00,
        totalIncome: 0.00,
        totalExpense: 0.00
    })

    const [addIncome, setAddIncome] = React.useState({show: false, value: 0.00})
    const [addExpense, setAddExpense] = React.useState({show: false, value: 0.00})
    const [balanceList, setBalanceList] = React.useState({
        currentName: [],
        currentBalance: [],
        userName: [],
        userBalance: []
    })

    function handleAddIncome() {
        setAddIncome(prevAdd => {return {...prevAdd,show: !prevAdd.show}})
        setAddExpense(prevAdd => {return {...prevAdd,show: false}})
    }
    function handleAddExpense() {
        setAddExpense(prevAdd => {return {...prevAdd,show: !prevAdd.show}})
        setAddIncome(prevAdd => {return {...prevAdd,show: false}})
    }
    function handleIncomeValue(e) {
        setAddIncome(prevAdd => {return {...prevAdd,value: e.target.value}})
        setBalanceList(prevBal => {return {...prevBal,currentBalance: e.target.value}})
    }
    function handleExpenseValue(e) {
        setAddExpense(prevAdd => {return {...prevAdd,value: e.target.value}})
        setBalanceList(prevBal => {return {...prevBal,currentBalance: e.target.value}})
    }
    function handleIncomeName(e) {
        setBalanceList(prevBal => {return {...prevBal,currentName: e.target.value}})
    }
    function handleExpenseName(e) {
        setBalanceList(prevBal => {return {...prevBal,currentName: e.target.value}})
    }
    function handleIncomeSubmit(event) {
        event.preventDefault()
        setBalance(prevBal => {return {...prevBal,totalIncome: prevBal.totalIncome + parseFloat(addIncome.value)}})
        setBalanceList(prevBal => {
        return {...prevBal,
            userName: [...prevBal.userName, prevBal.currentName],
            userBalance: [...prevBal.userBalance, prevBal.currentBalance]
        }})
        setAddIncome(prevAdd => { return {...prevAdd,show: false, value: 0.00}})
    }
    function handleExpenseSubmit(event) {
        event.preventDefault()
        setBalance(prevBal => {return {...prevBal,totalExpense: prevBal.totalExpense + parseFloat(addExpense.value)}})
        setBalanceList(prevBal => {
        return {...prevBal,
            userName: [...prevBal.userName, prevBal.currentName],
            userBalance: [...prevBal.userBalance, -prevBal.currentBalance]
        }})
        setAddExpense(prevAdd => { return {...prevAdd,show: false, value: 0.00}})
    }

    React.useEffect(function() {
        const income = balance.totalIncome
        const expense = balance.totalExpense
        setBalance(prevBal => {return {...prevBal, totalBalance: income - expense}})
    },[balance.totalIncome, balance.totalExpense])

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

    return (
        <div>
            <p 
                className="text-4xl font-bold tracking-normal ml-5 mt-8"
            >
                <span className="text-purple-600">Hello</span>, {user_name}!
            </p>
            <div className="flex flex-row cards">
                <div className="bg-[#144272] w-fit py-6 px-10 my-10 ml-5 mr-10 rounded-xl shadow-2xl text-[#A5D7E8] transition-all duration-1000">
                    <p className="text-2xl font-medium">Total Balance</p>
                    <p className="text-4xl text-[#A5D7E8] font-normal">{balanceType}₹{Math.abs(balance.totalBalance).toLocaleString()}</p>
                    <div className="flex flex-row">
                        <div className="m-5 ml-0">
                            <p className="text-xl font-medium"><span className="text-green-600 text-2xl">&#x25B4;</span> Incoming</p>
                            <p className="text-2xl">+₹{balance.totalIncome.toLocaleString()}</p>
                            { !addIncome.show && <button className="btn mt-2 hover:bg-[#144272]" onClick={handleAddIncome}>+ Add</button>}
                            {   
                                addIncome.show &&
                                <form className="flex flex-col" onSubmit={handleIncomeSubmit}>
                                    <input 
                                        type="text" 
                                        className="bg-slate-200"
                                        placeholder="Enter Name" 
                                        onChange={handleIncomeName}
                                        required
                                    />
                                    <input 
                                        type="number"
                                        className="bg-slate-200"
                                        placeholder="Enter Amount" 
                                        onChange={handleIncomeValue}
                                        required
                                    />
                                    <button className="btn mt-2 hover:bg-[#144272]">Update</button>
                                </form>
                            }
                        </div>
                        <div className="m-5">
                            <p className="text-xl font-medium"><span className="text-[#ED2B2A] text-2xl">&#x25BE;</span> Outgoing</p>
                            <p className="text-2xl">-₹{balance.totalExpense.toLocaleString()}</p>
                            { !addExpense.show && <button className="btn mt-2 hover:bg-[#144272]" onClick={handleAddExpense}>+ Add</button>}
                            {   
                                addExpense.show &&
                                <form className="flex flex-col" onSubmit={handleExpenseSubmit}>
                                    <input 
                                        type="text" 
                                        className="bg-slate-200"
                                        placeholder="Enter Name" 
                                        onChange={handleExpenseName}
                                        required
                                    />
                                    <input 
                                        type="number"
                                        className="bg-slate-200"
                                        placeholder="Enter Amount" 
                                        onChange={handleExpenseValue}
                                        required
                                    />
                                    <button className="btn mt-2 hover:bg-[#144272]">Update</button>
                                </form>
                            }
                        </div>
                    </div>
                </div>
                <div className="rounded-xl shadow-sm bg-[#F4EEE0] w-2/6 border border-gray-800 m-10">
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