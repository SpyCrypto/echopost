# EchoPost

![EchoPost Logo](./docs/echopost-logo.png)

**EchoPost** is a privacy-first, multi-platform publishing platform built for the Midnight ecosystem. It enables creators, developers, researchers, and organizations to publish content across multiple platforms from a single interface while keeping credentials private through Midnight's privacy-preserving technologies.

Instead of repeatedly authenticating with every platform, users securely connect their accounts once. OAuth credentials are encrypted locally and protected using Midnight's privacy architecture, allowing one-click publishing without exposing or permanently storing sensitive credentials.

## Key Features

* 🔒 **Privacy-First Authentication** – OAuth credentials are encrypted and never publicly exposed.
* ⚡ **One-Click Publishing** – Publish simultaneously to multiple supported platforms.
* 🌐 **Multi-Platform Support** – Medium, Devpost, X, LinkedIn, Notion, GitHub, Hashnode, and additional platforms.
* 🛡️ **Selective Disclosure** – Share only the information required for authorization while protecting sensitive account data.
* 📜 **Verifiable Publishing** – Generate cryptographically verifiable audit records without revealing private credentials.
* 🚀 **Built for Midnight** – Leverages Midnight's privacy-enhancing infrastructure to protect users throughout the publishing workflow.

---

# Midnight Blockchain Integration

EchoPost extends traditional OAuth authentication with Midnight's zero-knowledge capabilities, enabling users to prove authorization without revealing the underlying credentials.

## Smart Contracts

Compact smart contracts provide:

* Credential authorization verification
* Immutable publishing audit trails
* Privacy-preserving permission management
* Future support for decentralized identity integration

## Zero-Knowledge Circuits

Noir ZK circuits enable:

* Proof of valid authorization without revealing OAuth tokens
* Private credential verification
* Selective disclosure of publishing permissions
* Cryptographic integrity for publishing workflows

## Wallet Integration

EchoPost integrates with the Midnight Wallet SDK for:

* Testnet deployment
* Transaction signing
* Contract interaction
* Identity verification
* Secure blockchain communication

---

# Why EchoPost?

Traditional publishing platforms require users to repeatedly trust centralized services with long-lived API keys and OAuth tokens.

EchoPost takes a different approach by combining encrypted credential management with Midnight's privacy-preserving blockchain infrastructure. Users retain control over their credentials while benefiting from verifiable publishing, selective disclosure, and zero-knowledge authentication.

This creates a publishing experience that is:

* Private by default
* Cryptographically verifiable
* User-controlled
* Ready for decentralized identity
* Built for the next generation of Web3 applications

---

# Blockchain Setup

Follow the steps below to configure your Midnight development environment before deploying EchoPost's Compact contracts and Noir circuits.

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
