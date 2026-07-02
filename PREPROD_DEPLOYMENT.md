# EchoPost Midnight Preprod Deployment Guide

This guide walks you through deploying the EchoPost Compact contract to Midnight Preprod network using the official Midnight CLI.

## Prerequisites

✅ **Wallet Setup**
- Seed phrase: `predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege`
- Midnight address: `mn_addr_preprod12w07jcw9k2k30m03t8u3gu9j2gr66r06rfx3p56ncpctrtmsr3qqhtfsjl`
- Private key: `Kxotbb7osTAtxeaQnJtmL3YSAMFcuuRGHvNcmf8uh5tXWVtJfDgo`
- Testnet balance: tNight tokens available on Preprod

✅ **Contract Ready**
- Compact contract: `contracts/EchoPost.compact`
- Generated circuits: `managed/circuits/EchoPost.circuit`
- Verification key: `managed/circuits/EchoPost.vk`
- Proving key: `managed/keys/EchoPost.proving.key`

✅ **Docker Setup**
- Docker Desktop running
- `docker compose` available
- All containers built and tested

## Step 1: Set Up Local Wallet (Optional - for testing)

Test locally first before deploying to Preprod:

```bash
cd "C:\Users\Kurti\Downloads\_NightforceProjects\echopost-repo"

# Start local devnet
docker compose run --rm contracts midnight localnet up

# Create a test wallet (in another terminal)
docker compose run --rm contracts midnight wallet generate alice

# Fund wallet with local test tokens
docker compose run --rm contracts midnight airdrop 1000

# Check balance
docker compose run --rm contracts midnight balance
```

## Step 2: Configure Midnight Network

Set your network to Preprod:

```bash
docker compose run --rm contracts bash -c "midnight config set network preprod"

# Verify configuration
docker compose run --rm contracts midnight config get network
```

## Step 3: Import Your Wallet

Import your wallet using the seed phrase:

```bash
docker compose run --rm contracts bash -c "midnight wallet import --mnemonic 'predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege'"
```

Or if using interactive mode:

```bash
docker compose run --rm contracts bash

# Inside container:
midnight wallet import
# Paste your seed phrase when prompted
```

## Step 4: Verify Wallet and Balance

Check your imported wallet:

```bash
docker compose run --rm contracts midnight wallet list

# Get balance on Preprod
docker compose run --rm contracts bash -c "midnight balance"
```

Expected output:
```
Address: mn_addr_preprod12w07jcw9k2k30m03t8u3gu9j2gr66r06rfx3p56ncpctrtmsr3qqhtfsjl
Balance: X.XX tNight
```

## Step 5: Register for Transfers (Dust Protocol)

Midnight requires DUST registration for transfers:

```bash
docker compose run --rm contracts midnight dust register
```

Wait for confirmation (1-2 minutes on Preprod).

## Step 6: Compile Contract

Compile your Compact contract:

```bash
docker compose run --rm contracts bash -c "cd contracts && midnight compile EchoPost.compact"
```

Expected output:
```
✓ Compilation successful
✓ ZK circuits generated
✓ Keys generated

Generated artifacts:
- ../managed/circuits/EchoPost.circuit
- ../managed/circuits/EchoPost.vk
- ../managed/keys/EchoPost.proving.key
```

## Step 7: Deploy Contract to Preprod

Deploy your contract to Preprod network:

```bash
docker compose run --rm contracts bash -c "midnight contract deploy --network preprod --contract EchoPost --private-key Kxotbb7osTAtxeaQnJtmL3YSAMFcuuRGHvNcmf8uh5tXWVtJfDgo"
```

Or use interactive mode:

```bash
docker compose run --rm contracts bash

# Inside container:
midnight contract deploy --network preprod

# Select contract: EchoPost
# Confirm deployment (will be charged tNight gas fee)
```

Expected output:
```
✓ Contract compiled
✓ ZK proofs generated
✓ Deployment initiated

Contract deployed successfully!
Contract Address: 0x1234567890abcdef...
Transaction Hash: 0xabcdef1234567890...
Block: 12345
Gas Used: 50000
```

## Step 8: Capture Screenshots

Take and save screenshots:

1. **Contract Address & Deployment Success**
   ```
   Contract deployed successfully!
   Contract Address: 0x...
   ```
   Save as: `docs/screenshots/01-deployment-success.png`

2. **Block Explorer Verification**
   - Visit: https://preprod.block-explorer.midnight.network/
   - Search for your contract address
   - Screenshot the contract details page
   - Save as: `docs/screenshots/02-block-explorer-verified.png`

3. **Wallet Balance**
   - Run: `docker compose run --rm contracts midnight balance`
   - Show remaining tNight balance
   - Save as: `docs/screenshots/03-wallet-after-deployment.png`

## Step 9: Verify Contract on Chain

Query your deployed contract:

```bash
# Get contract info
docker compose run --rm contracts bash -c "midnight contract info --address <your_contract_address> --network preprod"

# Call a public function
docker compose run --rm contracts bash -c "midnight contract call --address <your_contract_address> --function getPublishedPosts --network preprod"

# Should return empty array initially
# Result: []
```

## Step 10: Interact with Contract

Test your contract's public functions:

```bash
docker compose run --rm contracts bash

# Inside container:
# Publish a test post
midnight contract call \
  --address <your_contract_address> \
  --function publishToMultiple \
  --args postId=0x123 \
           title="EchoPost Launch" \
           contentHash=0xabc \
           platforms='["medium","x"]'

# Query posts
midnight contract call \
  --address <your_contract_address> \
  --function getPublishedPosts
```

## Step 11: Commit & Push

Commit your deployment artifacts:

```bash
# Create screenshots directory if needed
mkdir -p docs/screenshots

# Add deployment artifacts
git add docs/screenshots/
git add managed/

# Commit with deployment details
git commit -m "feat: deploy EchoPost contract to Midnight Preprod

- Contract Address: 0x...
- Transaction Hash: 0x...
- Block: 12345
- Screenshots: deployment success, block explorer, wallet balance
- All ZK circuits and keys verified
- Contract interactive and callable on Preprod network"

git push origin main
```

## Troubleshooting

### Error: "Wallet not found"
```bash
# Import wallet first
midnight wallet import --mnemonic '<your_seed_phrase>'

# Verify import
midnight wallet list
```

### Error: "Insufficient balance"
```bash
# Check balance
midnight balance

# Request more tNight
# Visit: https://midnight.network/faucet
# Or send from another wallet:
midnight transfer <recipient_address> 100
```

### Error: "DUST registration required"
```bash
# Register for dust protocol
midnight dust register

# Wait 1-2 minutes for confirmation
midnight dust status
```

### Contract deployment fails: "Invalid private key"
- Verify key format: Should be WIF format starting with `K`
- Check: `echo $env:MIDNIGHT_PRIVATE_KEY`
- Re-import wallet if needed

### Can't connect to Preprod network
```bash
# Verify network configuration
midnight config get network

# Test connection
midnight config set network preprod
midnight balance  # This will attempt network connection
```

### Proof server connection error
```bash
# Start proof server in separate terminal
docker compose up proof-server

# Or check if already running
docker compose logs proof-server

# Restart if needed
docker compose restart proof-server
```

## Deployment Checklist

- [ ] Midnight CLI installed and working
- [ ] Wallet imported with seed phrase
- [ ] Balance verified (has tNight tokens)
- [ ] DUST registration completed
- [ ] Network set to Preprod
- [ ] Contract compiled to ZK circuits
- [ ] Contract deployed to Preprod
- [ ] Contract address obtained
- [ ] Contract verified on block explorer
- [ ] Screenshots captured (3 minimum)
- [ ] Public functions tested
- [ ] Artifacts committed to Git
- [ ] Changes pushed to GitHub
- [ ] README updated with contract address

## Local Testing (Before Preprod)

Test your contract locally first:

```bash
# Terminal 1: Start local devnet
docker compose run --rm contracts midnight localnet up

# Terminal 2: Create test wallet
docker compose run --rm contracts midnight wallet generate alice

# Terminal 3: Test deployment
docker compose run --rm contracts bash

# Inside container:
midnight config set network undeployed
midnight wallet select alice
midnight contract deploy --contract EchoPost --local
```

## Contract Functions

### Public Functions

**publishToMultiple()**
```
Parameters:
- postId: bytes32 (unique post identifier)
- title: string (post title)
- contentHash: bytes32 (hash of post content)
- platforms: string[] (target platforms: ["medium","x","linkedin"])

Effect: Records post metadata on public ledger
```

**getPublishedPosts()**
```
Returns: PublishedPost[] (all published posts)

Example:
[
  {
    id: 0x...,
    author: mn_addr_preprod...,
    title: "My First Post",
    platforms: ["medium", "x"]
  }
]
```

### Private Witness Functions

**storeCredentials()**
```
Parameters:
- platform: string (e.g., "medium")
- encryptedCred: bytes (encrypted OAuth token)
- witness: PrivateWitness

Effect: Stores encrypted credentials privately
Uses disclose() to reveal only platform name
```

## Resources

- **Midnight CLI Docs**: https://docs.midnight.network/
- **Preprod Block Explorer**: https://preprod.block-explorer.midnight.network/
- **Midnight Faucet**: https://midnight.network/faucet
- **Compact Language Guide**: https://docs.midnight.network/compact
- **Local Testing**: Start with `midnight localnet up`

## Next Steps After Deployment

1. **Update README**: Add deployed contract address
2. **Test Interactions**: Call deployed contract functions
3. **Create Tests**: Add Compact test cases in `contracts/tests/`
4. **Frontend Integration**: Update relay to query on-chain contract
5. **Mainnet Prep**: Plan for eventual mainnet deployment

---

**Deployment Status**: Ready  
**Last Updated**: July 2, 2026  
**Target Network**: Midnight Preprod  
**Wallet**: `mn_addr_preprod12w07jcw9k2k30m03t8u3gu9j2gr66r06rfx3p56ncpctrtmsr3qqhtfsjl`
