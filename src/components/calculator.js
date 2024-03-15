import React, { useState, useEffect } from 'react';
import "./calculator.css";

export function Calculator() {
    let tipAmounts = [5, 10, 15, 25, 50];

    const [bill, setBill] = useState("");
    const [numPeople, setNumPeople] = useState("");
    const [tipAmount, setTipAmount] = useState("");
    const [totalTip, setTotalTip] = useState((0).toFixed(2));
    const [total, setTotal] = useState((0).toFixed(2));
    const [activeButton, setActiveButton] = useState();
    const [reset, setReset] = useState(true);
    const [customTip, setCustomTip] = useState("");
    const [zero, setZero] = useState(false);

    function handleBillChange(totalBill) {
        setBill(totalBill);
    }

    function handleNumPeopleChange(totalPeople) {
        setNumPeople(totalPeople);
    }

    function handleTipAmountChange(e) {
        e.preventDefault();
        setTipAmount(e.target.value);
        setCustomTip("");
        setActiveButton(e.target.value);
    }

    function handleCustomTipChange(customTip) {
        setTipAmount(customTip);
        setCustomTip(customTip);
        setActiveButton("");
    }

    function handleResetChange(e) {
        e.preventDefault();

        setBill("");
        setTipAmount("");
        setNumPeople("");
        setCustomTip("");
        setActiveButton("");
    }

    function isValidNumber(value) {
        return /^-?\d+$/.test(value);
    }

    useEffect(() => {
        
        if (numPeople === "0") {
            setZero(true);
        } else {
            setZero(false);
        }

        if (bill !== "" && tipAmount !== "" && numPeople !== "" && numPeople !== "0" && isValidNumber(numPeople) && parseInt(numPeople) !== 0) {
            let totalTipAmount = (bill * (tipAmount / 100)) / numPeople;
            let totalAmount = (bill / numPeople) + totalTipAmount;

            if (!isNaN(totalTipAmount) && !isNaN(totalAmount)) {
                setTotalTip(parseFloat(totalTipAmount).toFixed(2));
                setTotal(parseFloat(totalAmount).toFixed(2));
                setReset(false);
            } else {
                setTotalTip((0).toFixed(2));
                setTotal((0).toFixed(2));
                setReset(true);
            }
        } else {
            setTotalTip((0).toFixed(2));
            setTotal((0).toFixed(2));
            setReset(true);
        }
    }, [bill, tipAmount, numPeople]);

  return (
    <div className="calculator_container">
        <div className="left_input_container">
            <form required>
                <div className="bills_container">
                    <label htmlFor="input_bill">Bill</label>
                    <span className="icon_dollar">&#36;</span>
                    <input id="input_bill" value={bill} onChange={(e) => handleBillChange(e.target.value)} placeholder="0"/>
                </div>

                <div className='tip_container'>
                <label htmlFor="select_tip_group">Select Tip %</label>
                <div id="select_tip_group">
                    {tipAmounts.map((amount, i) => {
                        return <button className={`tip_buttons ${activeButton === amount.toString() && "active"}`} value={amount} onClick={(e) => handleTipAmountChange(e)} key={i}>{amount}%</button>
                    })}
                    <input id="custom_tip_input" value={customTip} onChange={(e) => handleCustomTipChange(e.target.value)} placeholder="Custom"></input>
                </div>
                </div>

                <div className="num_people_container">
                    <div>
                        <label htmlFor="num_people_input">Number of People</label>
                        {zero && <p className="error_text">Can't be zero</p>}
                    </div>
                    <i className="fa fa-user icon_person"></i>
                    <input id="num_people_input" className={`num_people_input ${zero && "error"}`} value={numPeople} onChange={(e) => handleNumPeopleChange(e.target.value)} placeholder="0"></input>
                </div>
            </form>
        </div>
        <div className="right_display_container">
            <div className="display_values">
                <div>
                    <p className="display_value_title">Tip Amount</p>
                    <p className="display_value_subtitle">/ person</p>
                </div>
                <div>
                    <p className="display_amount">${totalTip}</p>
                </div>
            </div>
            <div className="display_values">
                <div>
                    <p className="display_value_title">Total</p>
                    <p className="display_value_subtitle">/ person</p>
                </div>
                <div>
                    <p className="display_amount">${total}</p>
                </div>
            </div>
            <button disabled={reset} onClick={(e) => handleResetChange(e)} className={`reset_button ${!reset && "active"}`}>RESET</button>
        </div>
    </div>
  )
}
