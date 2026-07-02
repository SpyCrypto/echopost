# EchoPost Midnight Setup & Deployment Guide

## Overview

EchoPost is a **privacy-first publishing platform** powered by Midnight blockchain. This guide covers:
- Local Midnight toolchain setup with Docker
- Writing and compiling Compact contracts
- Deploying to Preview/Preprod networks

## Prerequisites

- Docker & Docker Compose (v2.20+)
- Node.js 22+ (or use Docker)
- Git

## Quick Start

### 1. Install Midnight Toolchain with Docker

```bash
docker compose build proof-server contracts
docker compose up -d proof-server
```

Verify the proof server is running:
```bash
curl http://localhost:6800/health
```

### 2. Compile Your Compact Contract

```bash
# Enter the contracts environment
docker compose run --rm contracts bash

# Inside container:
compact compile ./EchoPost.compact

# Check generated circuits and keys
ls -la ../managed/
```

Expected output:
```
managed/
├── circuits/
│   ├── EchoPost.circuit
│   └── EchoPost.vk (verification key)
└── keys/
    └── EchoPost.proving.key
```

### 3. Deploy to Preprod

```bash
# Set your Midnight wallet private key
export MIDNIGHT_PRIVATE_KEY=<your_key>

# Deploy contract
docker compose run --rm contracts bash -c "compact deploy --network preprod --contract EchoPost"
```

You'll see output like:
```
Contract deployed successfully!
Contract Address: 0x1234567890abcdef...
```

### 4. Verify Deployment

```bash
docker compose run --rm contracts bash -c "compact verify --network preprod --address <contract_address>"
```

## Local Development

### Run Full Stack

```bash
# Start all services (relay, frontend, proof server, contracts)
docker compose up -d

# View logs
docker compose logs -f proof-server
docker compose logs -f contracts
docker compose logs -f frontend
docker compose logs -f relay
```

### Watch Mode (Hot Reload)

```bash
docker compose run --rm contracts bash
# Inside container:
npm run watch  # Recompiles on contract changes
```

### Contract File Structure

```
contracts/
├── EchoPost.compact          # Main contract source
├── compact.config.json       # Compilation & deployment config
└── tests/                    # (Add test files here)

managed/                       # Generated during compilation
├── circuits/                 # ZK circuits (generated)
├── keys/                     # Proving & verification keys (generated)
└── abi/                      # Contract ABI (generated)
```

## Key Concepts

### Public State vs. Private Witness

**Public State** (`publishedPosts`):
- Visible to all network participants
- Stored on the public ledger
- Example: post metadata, timestamps, platform names

**Private Witness**:
- Encrypted on-chain, only visible to contract author
- Requires decryption key to access
- Example: OAuth credentials, user secrets

```compact
// Public - everyone sees this
let post = PublishedPost { ... };
publishedPosts.push(post);

// Private - only author can decrypt
struct PrivateWitness {
  oauthCredentials: map<string, bytes>,
  encryptionKey: bytes32,
};

// Selective disclosure - control what becomes public
fn storeCredentials(...) {
  witness.oauthCredentials[platform] = encryptedCred;
  disclose(platform);  // Only platform name goes public
}
```

## Environment Variables

Create a `.env` file in the project root:

```bash
# Midnight Network
MIDNIGHT_PRIVATE_KEY=0x...
MIDNIGHT_NETWORK=preprod  # or 'preview'

# OAuth (from existing relay setup)
MEDIUM_API_KEY=...
X_API_KEY=...
LINKEDIN_CLIENT_ID=...
# etc.
```

Load with:
```bash
export $(cat .env | xargs)
docker compose up
```

## Troubleshooting

### Proof Server won't start
```bash
# Check logs
docker compose logs proof-server

# Rebuild
docker compose build --no-cache proof-server
docker compose up proof-server
```

### Compilation errors
```bash
# Validate contract syntax
docker compose run --rm contracts compact validate ./EchoPost.compact

# Full compile with verbose output
docker compose run --rm contracts compact compile --verbose ./EchoPost.compact
```

### Deployment fails
```bash
# Check network connectivity
docker compose run --rm contracts curl https://rpc.midnight.network/preprod

# Verify wallet has funds (Preview/Preprod faucet)
# https://midnight.network/faucet
```

## Git Workflow

Each deployment step should include meaningful commits:

```bash
git add contracts/EchoPost.compact
git commit -m "feat: initial EchoPost contract with public posts state"

git add managed/circuits managed/keys
git commit -m "ci: compiled Compact contract to ZK circuits"

git add docs/MIDNIGHT_SETUP.md
git commit -m "docs: add Midnight toolchain setup and deployment guide"
```

## Next Steps

1. **Enhance the contract**: Add user profile state, credential management
2. **Write tests**: Add Compact test files in `contracts/tests/`
3. **Set up CI/CD**: GitHub Actions to auto-compile on push
4. **Deploy frontend**: Update relay to interact with on-chain contract
5. **Mainnet readiness**: Security audit before Midnight mainnet launch

## Resources

- [Midnight Documentation](https://docs.midnight.network/)
- [Compact Language Specification](https://docs.midnight.network/compact)
- [Proof Server API](https://docs.midnight.network/proof-server)
- [EchoPost Original Repo](https://github.com/SpyCrypto/echopost)
