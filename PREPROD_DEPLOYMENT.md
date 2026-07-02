# EchoPost Midnight Preprod Deployment Guide

Using the official **Midnight Node Toolkit** and correct Preprod RPC endpoints.

## Correct RPC Endpoints

```
Node RPC: wss://rpc.preprod.midnight.network
Indexer: https://indexer.preprod.midnight.network/api/v4/graphql
Proof Server: http://127.0.0.1:6300
```

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

## Step 1: Verify Wallet Connection

Test RPC connection with your wallet:

```powershell
docker run --rm midnightntwrk/midnight-node-toolkit:latest-main dust-balance `
  --seed "predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege" `
  --src-url wss://rpc.preprod.midnight.network
```

Expected: Command runs without DNS/connection errors. May take 1-2 minutes on first run as it syncs wallet state.

## Step 2: Check Wallet State

Get detailed wallet information:

```powershell
docker run --rm midnightntwrk/midnight-node-toolkit:latest-main show-wallet `
  --seed "predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege" `
  --src-url wss://rpc.preprod.midnight.network
```

Expected output:
```
Wallet State
============
Address: mn_addr_preprod12w07jcw9k2k30m03t8u3gu9j2gr66r06rfx3p56ncpctrtmsr3qqhtfsjl
Balance: X.XX tNight
DUST: Y.YY
```

## Step 3: Show Wallet Address & Keys

Get viewing key and full address info:

```powershell
docker run --rm midnightntwrk/midnight-node-toolkit:latest-main show-address `
  --seed "predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege"
```

## Step 4: Compile Contract to Intent Files

Your contract needs to be compiled to `.mn` intent files. Once Midnight releases the Compact compiler CLI:

```bash
cd contracts
compact compile EchoPost.compact --output ../managed
```

This generates:
- `managed/circuits/` – ZK circuits
- `managed/keys/` – Proving/verification keys
- `managed/*.mn` – Intent files for deployment

## Step 5: Deploy Contract

Deploy your compiled contract to Preprod:

```powershell
docker run --rm `
  -v $(pwd)/managed:/app/managed `
  midnightntwrk/midnight-node-toolkit:latest-main send-intent `
  --dest-url wss://rpc.preprod.midnight.network `
  --proof-server http://127.0.0.1:6300 `
  --compiled-contract-dir /app/managed `
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
Contract Address: 0x...
```

## Step 6: Verify Deployment on Block Explorer

View contract on Preprod block explorer:

```
https://preprod.block-explorer.midnight.network/
```

Search for:
- Your wallet address
- Contract address (from deployment)
- Transaction hash

## Toolkit Commands Reference

### Wallet Operations

**Show wallet state:**
```powershell
docker run --rm midnightntwrk/midnight-node-toolkit:latest-main show-wallet `
  --seed "<seed_phrase>" `
  --src-url wss://rpc.preprod.midnight.network
```

**Show wallet address:**
```powershell
docker run --rm midnightntwrk/midnight-node-toolkit:latest-main show-address `
  --seed "<seed_phrase>"
```

**Check DUST balance:**
```powershell
docker run --rm midnightntwrk/midnight-node-toolkit:latest-main dust-balance `
  --seed "<seed_phrase>" `
  --src-url wss://rpc.preprod.midnight.network
```

**Show viewing key:**
```powershell
docker run --rm midnightntwrk/midnight-node-toolkit:latest-main show-viewing-key `
  --seed "<seed_phrase>"
```

### Contract Deployment

**Send intent (deploy contract):**
```powershell
docker run --rm midnightntwrk/midnight-node-toolkit:latest-main send-intent `
  --dest-url wss://rpc.preprod.midnight.network `
  --compiled-contract-dir ./managed `
  --funding-seed "<seed_phrase>"
```

**Show block info:**
```powershell
docker run --rm midnightntwrk/midnight-node-toolkit:latest-main show-block `
  --src-url wss://rpc.preprod.midnight.network `
  <block_number>
```

**Show transaction:**
```powershell
docker run --rm midnightntwrk/midnight-node-toolkit:latest-main show-transaction `
  --src-url wss://rpc.preprod.midnight.network `
  <transaction_hex>
```

## Troubleshooting

### "Connection refused" or "Network unreachable"
- Verify endpoint: `wss://rpc.preprod.midnight.network`
- Check Docker internet: `docker run --rm alpine ping 8.8.8.8`
- Restart Docker Desktop

### "Insufficient DUST"
- Check balance: `dust-balance` command
- DUST required for private transactions
- Request more from faucet if needed

### "Invalid seed phrase"
- Verify all 24 words exactly
- Check spacing and punctuation
- Ensure no leading/trailing spaces

### "Transaction failed"
- Check gas fees in balance
- Verify proof server running on port 6300
- Review proof server logs

## Deployment Checklist

- [ ] RPC endpoint verified: `wss://rpc.preprod.midnight.network`
- [ ] Wallet connection tested
- [ ] Balance confirmed (has tNight)
- [ ] DUST balance checked
- [ ] Contract compiled to intent files
- [ ] Circuits and keys in `managed/` directory
- [ ] Proof server configured (port 6300)
- [ ] Deployment command executed
- [ ] Transaction hash obtained
- [ ] Block explorer verification complete
- [ ] Contract address visible
- [ ] Screenshots captured
- [ ] Changes committed to Git
- [ ] Pushed to GitHub

## Resources

- **Preprod Block Explorer**: https://preprod.block-explorer.midnight.network/
- **Midnight Documentation**: https://docs.midnight.network/
- **Midnight Faucet**: https://faucet.preprod.midnight.network/
- **Node Toolkit**: https://github.com/midnight-protocol/midnight-node-toolkit
- **RPC Endpoint**: `wss://rpc.preprod.midnight.network`

## Contract Details

**Name**: EchoPost  
**Network**: Preprod  
**Language**: Compact  
**Wallet**: `mn_addr_preprod12w07jcw9k2k30m03t8u3gu9j2gr66r06rfx3p56ncpctrtmsr3qqhtfsjl`  
**Status**: Ready for deployment  

---

**Next Step**: Execute deployment once Compact compiler is available for final contract compilation.
