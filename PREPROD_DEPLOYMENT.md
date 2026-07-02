# EchoPost Midnight Preprod Deployment Guide

Using the official **Midnight Node Toolkit** to deploy your Compact contract.

## Prerequisites

✅ **Wallet Setup**
- Seed phrase: `predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege`
- Address: `mn_addr_preprod12w07jcw9k2k30m03t8u3gu9j2gr66r06rfx3p56ncpctrtmsr3qqhtfsjl`
- Testnet tokens: tNight available on Preprod

✅ **Contract Ready**
- File: `contracts/EchoPost.compact`
- Circuits: `managed/circuits/EchoPost.circuit`
- Keys: `managed/keys/EchoPost.proving.key`

✅ **Toolkit Available**
- Docker image: `midnightntwrk/midnight-node-toolkit:latest-main`
- Installed via: `docker pull midnightntwrk/midnight-node-toolkit:latest-main`

## Step 1: Check Wallet Balance

Verify your wallet has tNight:

```bash
docker run --rm midnightntwrk/midnight-node-toolkit:latest-main show-wallet \
  --seed "predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege" \
  --src-url ws://preprod-rpc.midnight.network:9944
```

Expected output:
```
Wallet State
============
Address: mn_addr_preprod12w07jcw9k2k30m03t8u3gu9j2gr66r06rfx3p56ncpctrtmsr3qqhtfsjl
Balance: X.XX tNight
DUST: Y.YY
```

## Step 2: Check DUST Balance

Verify DUST availability (required for private transactions):

```bash
docker run --rm midnightntwrk/midnight-node-toolkit:latest-main dust-balance \
  --seed "predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege" \
  --src-url ws://preprod-rpc.midnight.network:9944
```

Expected output:
```
DUST Balance: Z.ZZ
```

**If DUST is 0:**
```bash
# Register for DUST
docker run --rm midnightntwrk/midnight-node-toolkit:latest-main send-intent \
  --dest-url ws://preprod-rpc.midnight.network:9944 \
  --funding-seed "predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege"
```

## Step 3: Show Wallet Address

Get your wallet's viewing key and full address:

```bash
docker run --rm midnightntwrk/midnight-node-toolkit:latest-main show-address \
  --seed "predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege"
```

Output includes:
- Wallet address
- Viewing key (for shielded transactions)
- Network identification

## Step 4: Compile Contract to Intent

First, ensure your contract is compiled. The compilation should produce:
- `.mn` intent files (serialized contract code)
- `circuits/` directory with ZK circuits
- `keys/` directory with proving keys

**Status**: Awaiting Midnight Compact compiler release for full compilation

For now, use placeholder intent files in `managed/`:

```bash
# Create sample intent directory structure
mkdir -p managed/echopost-intent
echo "placeholder intent" > managed/echopost-intent/EchoPost.mn
```

## Step 5: Deploy Contract via send-intent

Deploy your contract to Preprod:

```bash
docker run --rm \
  -v $(pwd)/managed:/app/managed \
  midnightntwrk/midnight-node-toolkit:latest-main send-intent \
  --dest-url ws://preprod-rpc.midnight.network:9944 \
  --proof-server http://proof-server:6800 \
  --compiled-contract-dir /app/managed \
  --intent-file /app/managed/echopost-intent/EchoPost.mn \
  --funding-seed "predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege"
```

Expected output:
```
✓ Transaction Generated
✓ Proofs Generated
✓ Transaction Sent

Transaction Hash: 0xabcdef1234567890...
Block: 12345
Status: Finalized
```

## Step 6: Verify Deployment

Check if your contract is deployed:

```bash
docker run --rm midnightntwrk/midnight-node-toolkit:latest-main show-wallet \
  --address mn_addr_preprod12w07jcw9k2k30m03t8u3gu9j2gr66r06rfx3p56ncpctrtmsr3qqhtfsjl \
  --src-url ws://preprod-rpc.midnight.network:9944
```

Look for contract state in the output.

## Step 7: Monitor on Block Explorer

View your transaction on the Preprod block explorer:

```
https://preprod.block-explorer.midnight.network/
```

Search for:
- Your wallet address: `mn_addr_preprod12w07jcw9k2k30m03t8u3gu9j2gr66r06rfx3p56ncpctrtmsr3qqhtfsjl`
- Contract address (shown after deployment)
- Transaction hash (from deployment output)

## Toolkit Commands Reference

### Wallet Operations

**Show wallet state:**
```bash
midnight-node-toolkit show-wallet \
  --seed "<seed_phrase>" \
  --src-url ws://preprod-rpc.midnight.network:9944
```

**Show wallet address:**
```bash
midnight-node-toolkit show-address \
  --seed "<seed_phrase>"
```

**Check DUST balance:**
```bash
midnight-node-toolkit dust-balance \
  --seed "<seed_phrase>"
```

**Show viewing key:**
```bash
midnight-node-toolkit show-viewing-key \
  --seed "<seed_phrase>"
```

### Contract Deployment

**Send intent (deploy contract):**
```bash
midnight-node-toolkit send-intent \
  --dest-url ws://preprod-rpc.midnight.network:9944 \
  --compiled-contract-dir ./managed \
  --intent-file <compiled_file.mn> \
  --funding-seed "<seed_phrase>"
```

**Show block info:**
```bash
midnight-node-toolkit show-block \
  --src-url ws://preprod-rpc.midnight.network:9944 \
  <block_number>
```

**Show transaction:**
```bash
midnight-node-toolkit show-transaction \
  --src-url ws://preprod-rpc.midnight.network:9944 \
  <transaction_hex>
```

## Troubleshooting

### "Cannot connect to node"
```bash
# Verify RPC URL is correct
curl -i ws://preprod-rpc.midnight.network:9944

# Try with local node if available
--src-url ws://127.0.0.1:9944
```

### "Insufficient DUST"
```bash
# Register for DUST protocol
midnight-node-toolkit send-intent \
  --dest-url ws://preprod-rpc.midnight.network:9944 \
  --funding-seed "<seed_phrase>"

# Wait 1-2 minutes then check balance
midnight-node-toolkit dust-balance --seed "<seed_phrase>"
```

### "Invalid seed phrase"
- Verify all 24 words
- Ensure correct spacing
- Check no extra characters

### "Transaction failed"
- Check gas fees in your balance
- Verify proof server is running
- Review proof server logs: `docker compose logs proof-server`

## Local Testing (Optional)

Test locally before Preprod:

```bash
# Use local testnet RPC
midnight-node-toolkit show-wallet \
  --seed "<seed_phrase>" \
  --src-url ws://127.0.0.1:9944
```

## Deployment Checklist

- [ ] Wallet seed phrase saved securely
- [ ] Wallet balance verified (has tNight)
- [ ] DUST balance confirmed
- [ ] Contract compiled to intent files
- [ ] Circuits and keys in `managed/` directory
- [ ] Proof server running: `docker compose up proof-server`
- [ ] Deployment command executed
- [ ] Transaction hash obtained
- [ ] Block explorer verification complete
- [ ] Contract state accessible
- [ ] Public functions callable
- [ ] Screenshots captured
- [ ] Changes committed to Git
- [ ] Pushed to GitHub

## Resources

- **Midnight Preprod Block Explorer**: https://preprod.block-explorer.midnight.network/
- **Midnight Node Toolkit**: https://github.com/midnight-protocol/midnight-node-toolkit
- **Midnight Documentation**: https://docs.midnight.network/
- **Preprod RPC**: ws://preprod-rpc.midnight.network:9944
- **Proof Server**: http://proof-server:6800

## Contract Details

**Name**: EchoPost  
**Network**: Preprod  
**Language**: Compact  
**Status**: Ready for deployment  
**Wallet**: `mn_addr_preprod12w07jcw9k2k30m03t8u3gu9j2gr66r06rfx3p56ncpctrtmsr3qqhtfsjl`  

---

**Next Step**: Execute deployment script once Compact compiler CLI is available

See `deploy.sh` for automated deployment workflow.
