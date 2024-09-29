// import { useState, useEffect, useCallback } from 'react';

// const useWalletConnection = () => {
//   const [account, setAccount] = useState(null);
//   const [chainId, setChainId] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [addressInput, setAddressInput] = useState('');
//   const [balance, setBalance] = useState(0);

//   const ethereum = window.ethereum;

//   const connectWallet = useCallback(async () => {
//     if (ethereum) {
//       try {
//         const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//         const chainId = await ethereum.request({ method: 'eth_chainId' });
//         setAccount(accounts[0]);
//         setChainId(chainId);
//         setProvider(ethereum);
//       } catch (error) {
//         if (error.code === 4001) {
//           console.error('User denied account access');
//         } else {
//           console.error('Failed to connect wallet:', error.message);
//         }
//       }
//     } else {
//       console.error('No Ethereum provider found. Please install a wallet like MetaMask.');
//     }
//   }, [ethereum]);

//   const disconnectWallet = useCallback(() => {
//     setAccount(null);
//     setChainId(null);
//     setProvider(null);
//   }, []);

//   const getBalance = useCallback(async (address) => {
//     if (provider) {
//       try {
//         const balance = await provider.request({
//           method: 'eth_getBalance',
//           params: [address, 'latest'],
//         });
//         return parseInt(balance, 16) / 1e18;
//       } catch (error) {
//         console.error('Failed to get balance:', error.message);
//         return null;
//       }
//     }
//     return null;
//   }, [provider]);

//   useEffect(() => {
//     if (provider) {
//       const handleAccountsChanged = (accounts) => {
//         setAccount(accounts[0] || null);
//       };

//       const handleChainChanged = (chainId) => {
//         setChainId(chainId);
//       };

//       const handleDisconnect = () => {
//         disconnectWallet();
//       };

//       provider.on('accountsChanged', handleAccountsChanged);
//       provider.on('chainChanged', handleChainChanged);
//       provider.on('disconnect', handleDisconnect);

//       return () => {
//         provider.removeListener('accountsChanged', handleAccountsChanged);
//         provider.removeListener('chainChanged', handleChainChanged);
//         provider.removeListener('disconnect', handleDisconnect);
//       };
//     }
//   }, [provider, disconnectWallet]);

//   return {
//     account,
//     chainId,
//     connectWallet,
//     disconnectWallet,
//     getBalance,
//   };
// };

// const App = () => {
//   const {
//     account,
//     chainId,
//     connectWallet,
//   } = useWalletConnection();

//   useEffect(() => {
//     if (account) {
//       setAddressInput(account);
//     }
//   }, [account]);

//   const handleAddressChange = (e) => {
//     setAddressInput(e.target.value);
//   };

//   const handleGetBalance = async () => {
//     if (addressInput) {
//       const balance = await getBalance(addressInput);
//       setBalance(balance);
//     }
//   };

//   return (
//     <div className='h-screen w-screen flex justify-center items-center bg-green-200'>
//       <main className='backdrop-blur-md shadow-2xl shadow-green-200 bg-gray-50 h-[400px] w-[450px] rounded-2xl overflow-hidden flex flex-col justify-between'>
//         <span className='flex bg-gray-200 h-10'>
//           <input type="text" className='w-full bg-transparent px-4 outline-none' />
//           <button onClick={handleGetBalance} className='bg-gray-300 hover:bg-green-300 px-4'>Search</button>
//         </span>
        
//         <section className='p-5 flex flex-col items-center'>
//           <p>Account: {account}</p>
//           <p>Chain ID: {chainId}</p>
//           <button onClick={disconnectWallet}></button>
//           <button onClick={handleGetBalance}></button>
//           <button onClick={handleAddressChange}></button>
//         </section>
        
//         <section className='flex flex-col justify-between'>
//           <button onClick={connectWallet} className='px-6 py-4 bg-red-500 w-full text-white'>Connect Wallet</button>
//         </section>
//       </main>
//     </div>
//   );
// }


// export default App;


import WalletConnect from "./components/walletConnect";

import React from 'react'

const App = () => {
  return (
    <div>
      <WalletConnect />
    </div>
  )
}

export default App
