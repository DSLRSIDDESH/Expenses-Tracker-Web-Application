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

    function handleAddIncome() {
        setAddIncome(prevAdd => {return {...prevAdd,show: !prevAdd.show}})
        setAddExpense(prevAdd => {return {...prevAdd,show: false}})
    }
    function handleAddExpense() {
        setAddExpense(prevAdd => {return {...prevAdd,show: !prevAdd.show}})
        setAddIncome(prevAdd => {return {...prevAdd,show: false}})
    }
    function handleIncomeValue(e) {
        const inputValue = e.target.value
        if (/^\d*\.?\d*$/.test(inputValue)) {
        setAddIncome(prevAdd => {return {...prevAdd,value: e.target.value}})
        }
    }
    function handleIncomeSubmit(event) {
        event.preventDefault()
        setBalance(prevBal => {return {...prevBal,totalIncome: prevBal.totalIncome + parseFloat(addIncome.value)}})
        setAddIncome(prevAdd => { return {...prevAdd,show: false, value: 0.00}})
    }
    function handleExpenseValue(e) {
        const inputValue = e.target.value
        if (/^\d*\.?\d*$/.test(inputValue)) {
        setAddExpense(prevAdd => {return {...prevAdd,value: e.target.value}})
        }
    }
    function handleExpenseSubmit(event) {
        event.preventDefault()
        setBalance(prevBal => {return {...prevBal,totalExpense: prevBal.totalExpense + parseFloat(addExpense.value)}})
        setAddExpense(prevAdd => { return {...prevAdd,show: false, value: 0.00}})
    }

    React.useEffect(function() {
        const income = balance.totalIncome
        const expense = balance.totalExpense
        setBalance(prevBal => {return {...prevBal, totalBalance: income - expense}})
    },[balance.totalIncome, balance.totalExpense])

    const handleKeyPress = (event) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const regex = /^[0-9.]+$/;
    
        if (!regex.test(keyValue)) {
          event.preventDefault();
        }
      };

    const balanceType = balance.totalBalance === 0.00 ? "" : balance.totalBalance > 0.00 ? "+" : "-"

    return (
        <div>
            <p>Hello, {user_name}!</p>
            <div>
                <p>Total Balance</p>
                <p>{balanceType}₹{Math.abs(balance.totalBalance)}</p>

                <p>Incoming</p>
                <p>+₹{balance.totalIncome}</p>
                { !addIncome.show && <button onClick={handleAddIncome}>Add</button>}
                {   
                    addIncome.show &&
                    <form onSubmit={handleIncomeSubmit}>
                        <input 
                            placeholder="Enter Amount" 
                            onKeyDown={handleKeyPress}
                            onChange={handleIncomeValue}
                        />
                        <button>Update</button>
                    </form>
                    
                }

                <p>Outgoing</p>
                <p>-₹{balance.totalExpense}</p>
                { !addExpense.show && <button onClick={handleAddExpense}>Add</button>}
                {   
                    addExpense.show &&
                    <form onSubmit={handleExpenseSubmit}>
                        <input 
                            placeholder="Enter Amount" 
                            onKeyDown={handleAddExpense}
                            onChange={handleExpenseValue}
                        />
                        <button>Update</button>
                    </form>
                }
            </div>
        </div>
    )
}