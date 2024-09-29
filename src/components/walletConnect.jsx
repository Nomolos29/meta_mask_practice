import React, { useState } from 'react'

const WalletConnect = () => {

  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState([]);
  const [chainId, setChainId] = useState(null);
  const [inputAddress, setInputAddress] = useState("");

  let accounts;
  let accountBalance;

  const ethereum = window.ethereum;
  const handleWalletConnect = async () => {
    try {
      accounts = await ethereum.request({method: 'eth_requestAccounts'});
      setAccount(accounts);
      setChainId(await ethereum.request({method: 'eth_chainId'}));
      console.log(accounts);
    } catch (error) {
      console.log(error)
    }

  }

  const handleBalanceCheck = async (index) => {
    
    try {
      accountBalance = await ethereum.request({method: 'eth_getBalance', params: [account[index]]});
      setBalance(accountBalance);
    } catch (error) {
      console.log(error.message);
    }
    setInputAddress(account[index]);
  }


  const cardContainer = " w-[400px] h-[400px]";


  const unitOfEth = Math.pow(10, 18);
  const ethBalance = parseInt(balance) / unitOfEth;
  console.log(ethBalance);
  



  return (
    <main className='flex w-screen h-screen justify-center items-center'>

      <span className='flex items-center justify-center gap-x-10'>

        <section className={`${cardContainer} shadow-lg border-[1px] overflow-hidden rounded-xl p-5 flex flex-col justify-between items-start`}>
          <h1 className='text-4xl font-bold text-gray-400'>Accounts</h1>
          <main className='w-full space-y-3'>
            {account.map((address, index) => (
              <div key={index} onClick={() => handleBalanceCheck(index)}className='w-full cursor-pointer px-4 py-2 font-medium text-sm shadow-md rounded-lg'>{address}</div>
            ))}
            <button onClick={handleWalletConnect} className='text-xl font-medium py-2 px-4 bg-white/50 text-gray-500 shadow-md border-[1px] hover:bg-gray-400 hover:text-gray-50 rounded-lg'>Connect Wallet</button>
          </main>
        </section>

        <section className={`${cardContainer} flex flex-col justify-between`}>
          <span className='flex flex-col bg-gradient-to-br from-gray-300 to-gray-600 rounded-xl justify-between h-[60%] py-10 px-6'>
            <span>
              <h4>{chainId}</h4>
            </span>
            <span className='text-right space-y-4'>
              <h1 className='text-4xl text-white font-bold'>{`${ethBalance.toFixed(4)}`}</h1>
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
