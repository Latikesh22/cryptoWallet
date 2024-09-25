// src/Wallet.jsx
import React, { useState } from "react";
import Web3 from "web3";
import "./Wallet.css"; // Import the CSS file

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [web3, setWeb3] = useState(null);

  const createWallet = () => {
    const web3Instance = new Web3();
    const account = web3Instance.eth.accounts.create();
    setWalletAddress(account.address);
    setPrivateKey(account.privateKey);
    console.log(`Wallet Address: ${account.address}`);
    console.log(`Private Key: ${account.privateKey}`);
  };

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3Instance.eth.getAccounts();
        const address = accounts[0];

        setWalletAddress(address);
        setWeb3(web3Instance);
        console.log(`Connected to MetaMask account: ${address}`);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const connectGanache = async () => {
    const web3Instance = new Web3("http://127.0.0.1:7545"); // Default Ganache RPC server
    setWeb3(web3Instance);

    const accounts = await web3Instance.eth.getAccounts();
    if (accounts.length > 0) {
      const address = accounts[0];
      setWalletAddress(address);
      console.log(`Connected to Ganache account: ${address}`);
    } else {
      console.error("No accounts found in Ganache.");
    }
  };

  return (
    <div className="wallet-container">
      <h1>Crypto Wallet</h1>
      <button onClick={createWallet}>Create New Wallet</button>
      <button onClick={connectMetaMask}>Connect MetaMask</button>
      <button onClick={connectGanache}>Connect to Ganache</button>
      {walletAddress && <p>Wallet Address: {walletAddress}</p>}
      {privateKey && <p>Private Key: {privateKey}</p>}
    </div>
  );
};

export default Wallet;
