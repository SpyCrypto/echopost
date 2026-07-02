import { WalletFacade } from '@midnight-ntwrk/wallet-sdk-facade';
import { NetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import dotenv from 'dotenv';

dotenv.config();

async function checkBalance() {
  console.log('Checking wallet balance...');
  
  try {
    const fs = await import('fs');
    const walletInfo = JSON.parse(fs.readFileSync('./wallet-info.json', 'utf8'));
    
    const wallet = await WalletFacade.create({
      networkId: NetworkId.testnet,
      password: process.env.WALLET_PASSWORD || 'default-password'
    });
    
    const balance = await wallet.getBalance();
    console.log('Wallet Address:', walletInfo.address);
    console.log('Balance:', balance);
    console.log('Network:', NetworkId.testnet);
    
    return balance;
  } catch (error) {
    console.error('Error checking balance:', error);
    throw error;
  }
}

checkBalance()
  .then((balance) => console.log('Balance check complete'))
  .catch(console.error);
