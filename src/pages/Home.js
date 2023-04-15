import React from "react";
import axios from 'axios';

export default function Home() {
    const [showPopup, setShowPopup] = React.useState({show: false, type: ''});
    const [userData, setUserData] = React.useState(null)
    const [balance, setBalance] = React.useState({
        totalBalance: 0.00,
        totalIncome: 0.00,
        totalExpense: 0.00
    })
    const [popUpUser, setPopUpUser] = React.useState([{
        amount: 0, reason: 'Others', date: '', is_private: 'No'
    }]);
    const [balanceList, setBalanceList] = React.useState({
        currentName: [], currentBalance: [], currentReason: 'Others', currentPrivate: false,
        userName: [], userBalance: [], userReason: [], userPrivate: []
    })
    const [updated, setUpdated] = React.useState(0)
    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://expensetracker-backend-production.up.railway.app/expenses/total", {
                    withCredentials: true
                });
                const userTable = await axios.get("https://expensetracker-backend-production.up.railway.app/expenses/users", {
                    withCredentials: true
                });
                setUserData(response.data);
                setBalance(prevBalance => {return {...prevBalance, totalBalance: response.data.total_balance}})
                setBalance(prevBalance => {return {...prevBalance, totalIncome: response.data.total_incoming}})
                setBalance(prevBalance => {return {...prevBalance, totalExpense: response.data.total_outgoing}})
                setBalanceList(prevBal => {return {...prevBal, userName: userTable.data.users}})
                setBalanceList(prevBal => {return {...prevBal, userBalance: userTable.data.amounts}})
                console.log("User data fetched:", response.data);
            } 
            catch (error) {
              console.error(error);
              alert(error.response.data.message);
              window.location.href = '/login';
            }
          }
          fetchData();
    },[updated])

    function handleIncomeValue(e) {
        // setAddIncome(prevAdd => {return {...prevAdd,value: e.target.value}})
        setBalanceList(prevBal => {return {...prevBal,currentBalance: e.target.value}})
    }
    function handleExpenseValue(e) {
        // setAddExpense(prevAdd => {return {...prevAdd,value: e.target.value}})
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

        let newBalance = balanceList.currentBalance /*value = addIncome.value, incomeType = 'totalIncome'*/
        if(showPopup.type !== 'Credit'){
            newBalance = -balanceList.currentBalance
        }
        async function postExpense() {
            try {
                const response = await axios.post("https://expensetracker-backend-production.up.railway.app/expenses", {
                    withCredentials: true,
                    'other_username': balanceList.currentName,
                    'amount': newBalance,
                    'reason': balanceList.currentReason,
                    'is_private': balanceList.currentPrivate
                });
                setUpdated(prevUpdate => prevUpdate + 1)
                console.log("Expense posted:", response.data);
            }
            catch(error) {
                console.error(error);
            }
        }
        postExpense();
        setShowPopup(prevPopup => false);
    }
    const [showUserPopup, setShowUserPopup] = React.useState({show: false, name: ''});
    const toggleUserPopup = (event, name) => {
        event.preventDefault();
        async function fetchUserData() {
            try {
                console.log("Name:", name)
                const response = await axios.get(`https://expensetracker-backend-production.up.railway.app/expenses/${name}`, {
                    withCredentials: true
                });
                setPopUpUser(response.data);
                console.log("User data fetched:", response.data);
            } 
            catch (error) {
              console.error(error);
            }
            }
            fetchUserData();
            setShowUserPopup(prevPopup => {return{...prevPopup,show: true,name: name}});
    }
    const toggleUserPopdown = () => {
        setShowUserPopup(prevPopup => {return{...prevPopup,show: false,name: ''}});
    }

    React.useEffect(function() {
        const income = balance.totalIncome
        const expense = balance.totalExpense
        setBalance(prevBal => {return {...prevBal, totalBalance: income + expense}})
    },[balance.totalIncome, balance.totalExpense, balanceList.userReason])

    const balanceType = balance.totalBalance === 0.00 ? "" : balance.totalBalance > 0.00 ? "+" : "-"

    const userList = balanceList.userName.map((name, index) => (
            <button 
                key={index} 
                title="Click to view all transactions" 
                className="user-btn text-md text-[#553939] font-medium"
                onClick={(event) => toggleUserPopup(event, name)}
            >
                {name}
            </button>
      ));
    const amountList = balanceList.userName.map((balance, index) => (
        <p key={index} className="text-xl text-[#553939] font-medium mb-1.5">
            {balanceList.userBalance[index] < 0 ? '-' : '+'}
            ₹{Math.abs(balanceList.userBalance[index])}
        </p>
    ));

    const userAmountList = popUpUser.map((balance, index) => (
        <p key={index} className="text-medium text-[#553939] font-medium mb-1.5">
            {popUpUser[index].amount < 0 ? '-' : '+'}
            ₹{Math.abs(popUpUser[index].amount)}
        </p>
    ));
    const userReasonList = popUpUser.map((reason, index) => (
        <p key={index} className="text-medium text-[#553939] font-medium mb-1.5">
            {popUpUser[index].reason}
        </p>
    ));
    const userDateList = popUpUser.map((date, index) => (
        <p key={index} className="text-medium text-[#553939] font-medium mb-1.5 w-40">
            {popUpUser[index].date.slice(0,-12)}
        </p>
    ));
    const userPrivateList = popUpUser.map((prvt, index) => (
        <p key={index} className="text-medium text-[#553939] font-medium mb-1.5">
            {popUpUser[index].is_private ? 'Yes' : 'No'}
        </p>
    ));

    function togglePopup(typ) {
        setShowPopup(prevPopup => {return{...prevPopup,show: true,type: typ}});
    }
    function togglePopdown() {
        setShowPopup(prevPopup => false);
    }

    return (
        <div className="main-content">
        {showPopup.show ?
            <div className="pop-up-1 shadow-xl bg-gray-50">
                <p className="text-center text-xl mt-2 font-semibold text-[#675D50]">{showPopup.type}</p>
                <form className="grid grid-cols-2 p-8 gap-2 pt-6" onSubmit={handleSubmit}>
                    <input className="" 
                        type="text" 
                        placeholder="Username"
                        onChange={handleName}
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
                        <option value="Movie">Movie</option>
                    </select>
                    <div className="pt-2">
                        <input className="" type="checkbox" id="check" onChange={handleCheck}/>
                        <label htmlFor="check" className="">Keep it private</label>
                    </div>
                    <button type="button" className="popup-btn text-red-600" onClick={togglePopdown}>Cancel</button>
                    <button className="popup-btn text-green-600">Update</button>
                </form>
            </div>
            : null
        }
        {showUserPopup.show ?
            <div className="user-pop-up shadow-xl bg-gray-50">
                <p className="text-center text-2xl mt-2 mb-4 font-bold text-[#3C2A21]">Transactions with {showUserPopup.name}</p>
                <div className="flex flex-row p-5 pt-0 space-bet">
                        <div className="pr-10 pl-10">
                            <p className="text-xl text-[#3C2A21] font-bold mb-2">Amount</p>
                            {userAmountList}
                        </div>
                        <div className="pl-10 pr-10">
                            <p className="text-xl text-[#3C2A21] font-bold mb-2">Reason</p>
                            {userReasonList}
                        </div>
                        <div className="pl-10 pr-10">
                            <p className="text-xl text-[#3C2A21] font-bold mb-2">Date</p>
                            {userDateList}
                        </div>
                        <div className="pl-10 pr-10">
                            <p className="text-xl text-[#3C2A21] font-bold mb-2">Private</p>
                            {userPrivateList}
                        </div>
                    </div>
                <button type="button" className="popup-btn-2 ml-14 mb-10 text-red-600 self-center" onClick={toggleUserPopdown}>Close</button>
            </div>
            : null
        }
            <p 
                className="text-4xl font-bold tracking-normal ml-1 mt-8"
            >
                <span className="text-purple-600">Hello</span>, {userData ? userData.username : 'kkk'}!
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
                            <p className="text-2xl">-₹{Math.abs(balance.totalExpense).toLocaleString()}</p>
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