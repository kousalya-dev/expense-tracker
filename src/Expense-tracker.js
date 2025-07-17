// Expense Tracker App - React Project

import React, { useState, useEffect } from 'react';
import './ExpenseTracker.css';

export default function ExpenseTracker() {
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const addTransaction = () => {
        if (!description || !amount) return;
        const newTransaction = {
            id: Date.now(),
            description,
            amount: parseFloat(amount),
            date: new Date().toLocaleDateString()
        };
        setTransactions([...transactions, newTransaction]);
        setDescription('');
        setAmount('');
    };

    const getBalance = () => {
        return transactions.reduce((acc, txn) => acc + txn.amount, 0).toFixed(2);
    };

    const income = transactions
        .filter(t => t.amount > 0)
        .reduce((acc, t) => acc + t.amount, 0)
        .toFixed(2);

    const expense = transactions
        .filter(t => t.amount < 0)
        .reduce((acc, t) => acc + t.amount, 0)
        .toFixed(2);

    return (
        <div className="container">
            <h1 className="heading">💰 Expense Tracker</h1>

            <div className="balance">Balance: ₹{getBalance()}</div>
            <div className="summary">
                <div className="income">Income: ₹{income}</div>
                <div className="expense">Expense: ₹{Math.abs(expense)}</div>
            </div>

            <div className="input-group">
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount (+income, -expense)"
                />
                <button onClick={addTransaction}>Add</button>
            </div>

            <div className="transactions">
                <h2>Transaction History</h2>
                <ul>
                    {transactions.map((txn) => (
                        <li key={txn.id} className={txn.amount > 0 ? 'plus' : 'minus'}>
                            <span>{txn.description}</span>
                            <span>
                                ₹{txn.amount} <small>({txn.date})</small>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
