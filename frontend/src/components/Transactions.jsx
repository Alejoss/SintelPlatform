import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const Transactions = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch token balance
    axios.get('/my_token_balance/')
      .then(response => {
        console.log('Token Balance Response:', response.data);  // Debug log
        setBalance(response.data.balance); // Assuming the response contains a balance field
      })
      .catch(error => {
        console.error('Token Balance Error:', error);  // Debug log
        if (error.response && error.response.status === 404) {
          setBalance(0);  // Set balance to 0 if no balance is found
        } else {
          setError('Failed to fetch token balance.');  // Handle general errors
        }
      });

    // Fetch token transactions
    axios.get('/my_token_transactions/')
      .then(response => {
        console.log('Token Transactions Response:', response.data);  // Debug log
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Token Transactions Error:', error);  // Debug log
        setError('Failed to fetch transactions.');
      });
  }, []);

  const formatAddress = (address) => {
    return address.slice(0, 8) + '......' + address.slice(-6);
  };

  return (
    <div className="text-lg py-6 w-full">
      <h1 className="text-lg font-bold lg:text-xl xl:text-2xl">
        Balance Total: {balance} USDT
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 gap-6 bg-gray-700/50 rounded-xl p-3 my-4 xl:grid-cols-3">
        {transactions.map((transaction, index) => (
            <React.Fragment key={index}>
                <div className="bg-gray-600 rounded-xl p-3">
                    <p className="font-semibold">Remitente</p>
                    <p>{formatAddress(transaction.sender.address)}</p>
                </div>
                <div className="bg-gray-600/90 rounded-xl p-3">
                    <p className="font-semibold">Beneficiario</p>
                    <p>{formatAddress(transaction.recipient.address)}
                </p>
            </div>
            <div className="bg-gray-600 rounded-xl p-3">
              <p className="font-semibold">Fecha y Hora</p>
              <p>{new Date(transaction.timestamp).toLocaleString()}</p>
            </div>
            <div className="bg-gray-600 rounded-xl p-3">
              <p className="font-semibold">Cantidad</p>
              <p>{transaction.amount} USDT</p>
            </div>
            <div className="bg-gray-600/90 rounded-xl p-3">
              <p className="font-semibold">Nota</p>
              <p>{transaction.note || "N/A"}</p>
            </div>
            <div className="bg-gray-600 rounded-xl p-3">
              <p className="font-semibold">Recibo</p>
              <p className="break-words">{transaction.receipt || "N/A"}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
