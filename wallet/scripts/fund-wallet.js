import dotenv from 'dotenv';

dotenv.config();

async function fundWallet() {
  console.log('Funding wallet on Midnight testnet (simulation)...');
  
  try {
    const fs = await import('fs');
    const walletInfo = JSON.parse(fs.readFileSync('./wallet-info.json', 'utf8'));
    
    console.log('Wallet Address:', walletInfo.address);
    console.log('Current Balance: 0 DUST (simulated)');
    
    // For testnet, you would typically get funds from a faucet
    console.log('\nTo fund your wallet on the real Midnight testnet, visit:');
    console.log(`https://faucet.midnight.network/?address=${walletInfo.address}`);
    console.log('\nFor this simulation, we will add 1000 testnet DUST tokens.');
    
    // Simulate funding
    walletInfo.balance = 1000;
    walletInfo.lastFunded = new Date().toISOString();
    
    fs.writeFileSync(
      './wallet-info.json',
      JSON.stringify(walletInfo, null, 2)
    );
    
    console.log('Simulated funding complete: 1000 DUST added');
    console.log('Updated wallet-info.json with balance');
    
    return walletInfo;
  } catch (error) {
    console.error('Error funding wallet:', error);
    throw error;
  }
}

fundWallet()
  .then(() => console.log('Funding complete'))
  .catch(console.error);
