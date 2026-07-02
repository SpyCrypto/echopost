import { createHash, randomBytes } from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

async function generateWallet() {
  console.log('Generating Midnight wallet (simulation)...');
  
  try {
    // Generate a random private key (32 bytes)
    const privateKey = randomBytes(32).toString('hex');
    
    // Derive address from private key (simplified)
    const addressHash = createHash('sha256')
      .update(privateKey)
      .digest('hex')
      .slice(0, 40);
    const address = `midnight_test_${addressHash}`;
    
    console.log('Wallet Address:', address);
    console.log('Private Key (SAVE SECURELY):', privateKey);
    
    // Save wallet info to file (for development only)
    const walletInfo = {
      address: address,
      privateKey: privateKey,
      networkId: 'testnet',
      createdAt: new Date().toISOString()
    };
    
    const fs = await import('fs');
    fs.writeFileSync(
      './wallet-info.json',
      JSON.stringify(walletInfo, null, 2)
    );
    console.log('Wallet info saved to wallet-info.json');
    
    return walletInfo;
  } catch (error) {
    console.error('Error generating wallet:', error);
    throw error;
  }
}

generateWallet()
  .then(() => console.log('Wallet generated successfully'))
  .catch(console.error);
