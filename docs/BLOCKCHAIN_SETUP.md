# EchoPost Blockchain Integration Setup Guide

This guide explains how to set up EchoPost with Midnight blockchain smart contracts, ZK circuits, and wallet integration.

## Prerequisites

- Node.js 18+ and npm
- Midnight CLI tools (for Compact contract compilation)
- Noir compiler (for ZK circuits)
- Access to Midnight testnet

## Installation

### 1. Install Dependencies

```bash
# Install contract dependencies
cd contract
npm install

# Install circuit dependencies
cd ../circuits
npm install

# Install wallet dependencies
cd ../wallet
npm install
```

### 2. Generate Wallet

```bash
cd wallet
cp .env.example .env
# Edit .env with your secure password
npm run generate
```

This will:
- Create a new Midnight wallet
- Save wallet address and private key to `wallet-info.json`
- **IMPORTANT**: Store the private key securely!

### 3. Fund Wallet

```bash
npm run fund
```

This will display the faucet URL. Visit the URL to fund your wallet with testnet DUST tokens.

### 4. Check Balance

```bash
npm run balance
```

Verify your wallet has sufficient testnet funds before deploying contracts.

### 5. Compile ZK Circuits

```bash
cd ../circuits
nargo build
```

This compiles the Noir ZK circuits for credential privacy verification.

### 6. Deploy Smart Contract

```bash
cd ../contract
cp .env.example .env
# Edit .env with your configuration
npm run deploy
```

This will:
- Compile the Compact smart contract
- Deploy it to Midnight testnet
- Save deployment info to `deployment-info.json`

## Architecture

### Smart Contract (`contract/EchoPost.compact`)

The Compact smart contract manages:
- **Public credential hashes** for verification
- **Encrypted credentials** stored privately
- **Publish records** for audit trail
- **User nonce** for replay protection

### ZK Circuits (`circuits/src/main.nr`)

Noir circuits provide:
- **Credential ownership proof** without revealing sensitive data
- **Publish authorization proof** for platform access
- **Encryption validity proof** for credential security

### Wallet Integration (`wallet/`)

Wallet scripts manage:
- **Wallet generation** with Midnight SDK
- **Testnet funding** via faucet
- **Balance checking** and transaction management

## Usage

### Interacting with the Contract

After deployment, you can interact with the contract from your frontend:

```typescript
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';

// Find deployed contract
const contract = await findDeployedContract(providers, contractAddress);

// Store credential hash
await contract.callTx.store_credential_hash(userId, platform, hash);

// Record publish event
await contract.callTx.record_publish(userId, contentHash, platforms, true);
```

### Generating ZK Proofs

```typescript
// Generate credential ownership proof
const proof = await generateCredentialProof({
  userId: user.id,
  platformHash: hash(platform),
  credentialHash: hash(credential),
  timestamp: Date.now()
});
```

## Security Considerations

1. **Private Keys**: Never commit `wallet-info.json` to version control
2. **Environment Variables**: Use `.env` files and never commit them
3. **Testnet First**: Always test on testnet before mainnet deployment
4. **Credential Encryption**: Credentials are encrypted with AES-256-GCM
5. **ZK Proofs**: Proofs verify ownership without revealing data

## Troubleshooting

### Wallet Generation Fails
- Ensure Midnight SDK is properly installed
- Check network connectivity
- Verify password strength

### Contract Deployment Fails
- Verify wallet has sufficient testnet funds
- Check contract syntax is valid
- Ensure network ID is correct

### ZK Circuit Compilation Fails
- Verify Noir compiler is installed
- Check circuit syntax
- Ensure dependencies are installed

## Next Steps

- Integrate contract calls in the frontend (`apps/frontend`)
- Add ZK proof generation to the relay server (`apps/relay`)
- Test end-to-end credential storage and publishing
- Deploy to mainnet when ready

## Resources

- [Midnight Documentation](https://docs.midnight.network/)
- [Midnight.js SDK](https://docs.midnight.network/sdks/official/midnight-js)
- [Noir Documentation](https://noir-lang.org/)
- [Compact Contract Guide](https://docs.midnight.network/compact-runtime)
