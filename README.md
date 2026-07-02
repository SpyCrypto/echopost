# EchoPost

![EchoPost Logo](./docs/echopost-logo.png)

EchoPost is a privacy-first publishing platform powered by Midnight. Users connect their social and content accounts once, OAuth credentials are encrypted, and a single click publishes to Medium, Devpost, X, LinkedIn, Notion, and other platforms without ever exposing or permanently storing sensitive credentials.

## Blockchain Integration

EchoPost now includes Midnight blockchain integration with:

- **Smart Contracts**: Compact smart contracts for credential verification and audit trails
- **ZK Circuits**: Noir zero-knowledge circuits for privacy-preserving credential proofs
- **Wallet Integration**: Midnight wallet SDK for testnet deployment and transaction management

### Blockchain Setup

For detailed setup instructions, see [`BLOCKCHAIN_SETUP.md`](./docs/BLOCKCHAIN_SETUP.md)

Quick start:
```bash
# Generate wallet
cd wallet && npm install && npm run generate

# Fund wallet (visit faucet URL)
npm run fund

# Compile ZK circuits
cd ../circuits && npm install && nargo build

# Deploy smart contract
cd ../contract && npm install && npm run deploy
```

## Deployment

- Local development and production deployment guide: [`DOCKER_DEPLOYMENT.md`](./docs/docker-deployment.md)
- One-click Railway deploy: connect your GitHub repo at [railway.app](https://railway.app) and use the provided `railway.json`.

## Architecture

- **Frontend**: React/Next.js with TypeScript
- **Backend**: Node.js/Express relay server
- **Blockchain**: Midnight smart contracts with ZK proofs
- **Security**: AES-256 credential encryption with ZK verification
