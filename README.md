# EchoPost

![EchoPost Logo](./docs/echopost-logo.png)

EchoPost is a **privacy-first publishing platform powered by Midnight blockchain**. Users connect their social and content accounts once, OAuth credentials are encrypted using Midnight's zero-knowledge proofs, and a single click publishes to Medium, Devpost, X, LinkedIn, Notion, and other platforms without ever exposing or permanently storing sensitive credentials. On-chain, only post metadata is visible—credentials remain encrypted and private.

## Product Vision

EchoPost solves the credential sprawl problem for content creators. Instead of managing OAuth tokens across multiple platforms with centralized storage risks, EchoPost uses Midnight's privacy-preserving smart contracts to keep credentials encrypted on-chain while proving their validity through zero-knowledge proofs. A creator publishes once, and the contract orchestrates distribution to all platforms—no credentials ever exposed to third parties, no backend credentials database to compromise.

## Tech Stack

- **Frontend**: Next.js (React, TypeScript)
- **Backend Relay**: Node.js + Express
- **Blockchain**: Midnight + Compact (privacy-first contracts)
- **Zero-Knowledge**: Proof server for circuit generation & verification
- **OAuth Integration**: Medium, X, LinkedIn, Devpost, Notion
- **Containerization**: Docker & Docker Compose

## Quick Start

### Local Development (All Services)

```bash
docker compose up
```

This starts:
- **Frontend**: http://localhost:3000
- **Relay API**: http://localhost:8080
- **Proof Server**: http://localhost:6800
- **Contracts Dev**: Ready for `docker compose run contracts bash`

### Midnight Contract Development

```bash
# Compile Compact contract to ZK circuits
docker compose run --rm contracts bash
compact compile ./EchoPost.compact

# Deploy to Preprod
export MIDNIGHT_PRIVATE_KEY=0x...
compact deploy --network preprod --contract EchoPost
```

For complete setup and deployment guide, see [`MIDNIGHT_SETUP.md`](./MIDNIGHT_SETUP.md).

## Project Structure

```
echopost-repo/
├── apps/
│   ├── frontend/          # Next.js UI
│   └── relay/             # OAuth relay server
├── contracts/             # Compact smart contracts
│   ├── EchoPost.compact   # Main contract (public posts + private credentials)
│   ├── compact.config.json
│   └── TESTS.md
├── managed/               # Generated ZK circuits & keys (compile output)
├── docs/
├── Dockerfile.frontend
├── Dockerfile.relay
├── Dockerfile.midnight    # Midnight toolchain (Compact compiler, proof server)
├── docker-compose.yml
└── MIDNIGHT_SETUP.md      # Complete Midnight dev & deployment guide
```

## Environment Setup

Create `.env` with:

```bash
# Midnight Network
MIDNIGHT_PRIVATE_KEY=0x...
MIDNIGHT_NETWORK=preprod

# OAuth Credentials (from platforms)
MEDIUM_API_KEY=...
MEDIUM_API_SECRET=...
X_API_KEY=...
X_API_SECRET=...
X_ACCESS_TOKEN=...
X_ACCESS_SECRET=...
LINKEDIN_CLIENT_ID=...
LINKEDIN_CLIENT_SECRET=...
LINKEDIN_ACCESS_TOKEN=...
DEVPOST_API_KEY=...
NOTION_TOKEN=...
NOTION_DATABASE_ID=...

# Security
AES_KEY=0000000000000000000000000000000000000000000000000000000000000000
```

## Deployment

- **Local development and Docker deployment**: [`DOCKER_DEPLOYMENT.md`](./DOCKER_DEPLOYMENT.md)
- **Midnight contract deployment**: [`MIDNIGHT_SETUP.md`](./MIDNIGHT_SETUP.md)
- **One-click Railway deploy**: Connect your GitHub repo at [railway.app](https://railway.app) and use the provided `railway.json`.

## Public State vs. Private Witness

**Public State** (`publishedPosts`):
- Visible to all network participants on the blockchain
- Contains post metadata: ID, author, title, content hash, platforms
- Demonstrates transparency of publishing activity

**Private Witness** (encrypted on-chain):
- OAuth credentials, encryption keys, user secrets
- Only the contract author can decrypt with their key
- Demonstrates Midnight's privacy guarantees

See [`MIDNIGHT_SETUP.md`](./MIDNIGHT_SETUP.md#key-concepts) for code examples and detailed explanation.

[![Netlify Status](https://api.netlify.com/api/v1/badges/6f095340-17da-4f82-8568-6525dbc3b9c7/deploy-status)](https://app.netlify.com/projects/post-echo/deploys)
