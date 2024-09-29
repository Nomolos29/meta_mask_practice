import React, { useState } from 'react';

import chains from "../../chains.json";
import { LuWallet } from 'react-icons/lu';

const WalletConnect = () => {

  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState([]);
  const [chainId, setChainId] = useState(null);
  const [accountNouce, setAccountNouce] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  

  const unitOfEth = Math.pow(10, 18);
  const ethBalance = parseInt(balance) / unitOfEth;



  let accounts;
  let accountBalance;
  let chainName;

  const chainObject = chains.find((ID) => ID.chainID === chainId);

  chainObject ? chainName = chainObject.name : chainId;


  const ethereum = window.ethereum;
  const handleWalletConnect = async () => {
    try {
      accounts = await ethereum.request({method: 'eth_requestAccounts'});
      setAccount(accounts);

      setChainId(await ethereum.request({method: 'eth_chainId'}));

      setAccountNouce(await ethereum.request({ method: 'eth_getTransactionCount', params:[accounts[index]] }))
      
      console.log(accounts);
    } catch (error) {
      console.log(error)
    }

  }

  const handleBalanceCheck = async (index) => {
    
    try {
      accountBalance = await ethereum.request({method: 'eth_getBalance', params: [account[index]]});
      setBalance(accountBalance);

      handleAccountNouce(index);
      setInputAddress(account[index]);
    } catch (error) {
      console.log(error.message);
    }
  } 

  const handleAccountNouce = async(index) => {
    try {

      let nouce = await ethereum.request({ method: 'eth_getTransactionCount', params:[account[index]] })
      setAccountNouce(nouce);
      console.log(nouce);

    } catch (error) {
      console.log(error.message)
    }
    
  }

  const handleChangeInAccount = (currentAccount) => {

    setAccount(currentAccount);

    setBalance(parseInt(currentAccount))

  }

  const handleOnChainChange = () => {
    handleWalletConnect();
  }


  const handleGetBalance = (event) => {
    event.preventDefault();

    setInputAddress("");
    setAccountNouce(null)

    console.log(inputValue);
    
    let accountArray = [];
    accountArray.push(inputValue)
  
    handleChangeInAccount(accountArray);
    // setInputAddress(inputValue);


    setInputValue("");

  }

  ethereum.on('accountsChanged', handleChangeInAccount);
  ethereum.on('chainChanged', handleOnChainChange);

  // ethereum.removeListener('accountsChanged', handleChangeInAccount)


  const cardContainer = " w-[420px] h-[400px]";

  



  return (
    <main className='flex w-screen h-screen justify-center items-center'>

      <span className='flex items-center justify-center gap-x-10'>

        <section className={`${cardContainer} shadow-lg border-[1px] overflow-hidden rounded-xl p-5 flex flex-col justify-between items-start`}>
          <div className='flex flex-col w-full'>
            <h1 className='text-4xl font-bold text-gray-400'>Accounts</h1>
            <form onSubmit={handleGetBalance} className='flex justify-between w-full gap-x-3'>
              <input 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
              type="text" className='w-full px-2 outline-none bg-gray-300 rounded-lg' /><button type='submit' className='w-[50%] bg-gray-300 py-1 rounded-lg px-2 text-center'>check balance</button>
            </form>
          </div>
          <main className='w-full space-y-3'>
            {account.map((address, index) => (
              <div key={index} onClick={() => handleBalanceCheck(index)}className={`w-full cursor-pointer px-3 py-2 font-medium text-sm shadow-md flex justify-between items-center rounded-lg ${address == "" ? "bg-red-500 text-gray-50" : ""}`}>{address == "" ? "Please input an Address to check it's balance" : address}<span><LuWallet /></span></div>
            ))}
            <button onClick={handleWalletConnect} className='text-xl font-medium py-2 px-4 bg-white/50 text-gray-500 shadow-md border-[1px] hover:bg-gray-400 hover:text-gray-50 rounded-lg'>Connect Wallet</button>
          </main>
        </section>

        <section className={`${cardContainer} flex flex-col justify-between`}>
          <span className='flex flex-col bg-gradient-to-br from-gray-300 to-gray-600 rounded-xl justify-between h-[60%] py-10 px-6'>
            <span className='flex justify-between'>
              <h4 className='text-lg font-medium text-gray-200/60'>{chainName}</h4>
              <span className='h-6 px-2 bg-gray-300 shadow-md font-medium text-gray-500 flex justify-center items-center rounded-full'>{accountNouce}</span>
            </span>
            <span className='text-right space-y-4'>
              <h1 className='text-4xl text-white font-bold'>{`${ethBalance.toFixed(2)}`}</h1>
              <p className='text-sm text-gray-400 font-medium'>{inputAddress}</p>
            </span>
          </span>
          <span className='rounded-xl p-5 shadow-lg h-[35%] border-[1px]'>
            <h3 className='font-medium'>Transactions</h3>
          </span>
        </section>

      </span>

    </main>
  )
  
}

export default WalletConnect
