# EchoPost Midnight Preprod Deployment Guide

This guide walks you through deploying the EchoPost Compact contract to Midnight Preprod network.

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

## Step 1: Export Your Private Key

In PowerShell:

```powershell
$env:MIDNIGHT_PRIVATE_KEY = "Kxotbb7osTAtxeaQnJtmL3YSAMFcuuRGHvNcmf8uh5tXWVtJfDgo"
$env:MIDNIGHT_NETWORK = "preprod"
$env:MIDNIGHT_ADDRESS = "mn_addr_preprod12w07jcw9k2k30m03t8u3gu9j2gr66r06rfx3p56ncpctrtmsr3qqhtfsjl"

# Verify they're set
echo $env:MIDNIGHT_PRIVATE_KEY
echo $env:MIDNIGHT_NETWORK
echo $env:MIDNIGHT_ADDRESS
```

## Step 2: Verify Testnet Funds

Check your wallet balance on Midnight Preprod:

```bash
cd "C:\Users\Kurti\Downloads\_NightforceProjects\echopost-repo"
docker compose run --rm contracts bash -c "midnight wallet balance --address $env:MIDNIGHT_ADDRESS --network preprod"
```

Expected output: Your tNight balance (needed for gas/deployment fees).

**If you need more tNight:**
- Visit: https://midnight.network/faucet
- Request tokens on Preprod network
- Wait a few minutes for confirmation

## Step 3: Deploy Contract

Once the official Midnight CLI is available in Docker Hub or npm:

```bash
cd "C:\Users\Kurti\Downloads\_NightforceProjects\echopost-repo"

# Enter development container
docker compose run --rm contracts bash

# Inside container:
midnight deploy \
  --network preprod \
  --contract EchoPost \
  --private-key Kxotbb7osTAtxeaQnJtmL3YSAMFcuuRGHvNcmf8uh5tXWVtJfDgo
```

Expected output:
```
✓ Contract compiled successfully
✓ ZK circuits verified
✓ Deployment initiated

Contract deployed!
Contract Address: 0x...
Transaction Hash: 0x...
Gas Used: ...
```

## Step 4: Capture Screenshots

Take screenshots of:

1. **Deployment Success**
   ```
   Contract Address: 0x...
   ```
   Save as: `docs/screenshots/contract-deployed-preprod.png`

2. **Block Explorer Verification**
   - Visit: https://preprod.block-explorer.midnight.network/
   - Search for your contract address
   - Screenshot the contract details
   - Save as: `docs/screenshots/block-explorer-verified.png`

3. **Wallet Balance After Deployment**
   - Show remaining tNight balance
   - Save as: `docs/screenshots/wallet-after-deployment.png`

## Step 5: Verify Contract on Chain

```bash
# Check contract status
docker compose run --rm contracts bash -c "midnight contract verify --address <your_contract_address> --network preprod"

# Call a public function
docker compose run --rm contracts bash -c "midnight contract call --address <your_contract_address> --function getPublishedPosts --network preprod"
```

## Step 6: Commit & Push

Add your deployment artifacts and screenshots:

```bash
git add docs/screenshots/
git commit -m "docs: capture EchoPost contract deployment to Midnight Preprod

- Contract deployed successfully with address: 0x...
- Screenshots: deployment output, block explorer, wallet
- All ZK circuits and keys generated
- Contract verified on Preprod network"

git push origin main
```

## Troubleshooting

### Deployment Fails: "Insufficient Balance"
- Check wallet balance: `midnight wallet balance --address <your_address>`
- Request more tNight from faucet
- Wait for confirmation before retrying

### Deployment Fails: "Invalid Private Key"
- Verify key format: Should start with `K` (WIF) or be hex
- Check: `echo $env:MIDNIGHT_PRIVATE_KEY`
- Re-export if needed

### Contract Not Appearing on Block Explorer
- Wait 30-60 seconds for block confirmation
- Check transaction hash in logs
- Visit: https://preprod.block-explorer.midnight.network/

### Proof Server Connection Issues
```bash
# Verify proof server is running
docker compose logs proof-server

# Restart proof server
docker compose restart proof-server
```

## Deployment Checklist

- [ ] Private key exported and verified
- [ ] Testnet balance confirmed (tNight available)
- [ ] Compact contract compiled
- [ ] ZK circuits generated (`managed/circuits/`, `managed/keys/`)
- [ ] Deployment command executed
- [ ] Contract address received
- [ ] Screenshots captured
- [ ] Contract verified on block explorer
- [ ] Commits pushed to GitHub
- [ ] README updated with contract address

## Next Steps

1. **Interact with Contract**: Call public functions from the deployed contract
2. **Test Privacy Features**: Submit private transactions and verify witness encryption
3. **Integrate Frontend**: Update EchoPost relay to interact with on-chain contract
4. **Production Audit**: Prepare for mainnet deployment with security review
5. **Documentation**: Add contract ABI and function documentation

## Resources

- **Midnight Preprod Block Explorer**: https://preprod.block-explorer.midnight.network/
- **Midnight Faucet**: https://midnight.network/faucet
- **Midnight Docs**: https://docs.midnight.network/
- **Compact Language Spec**: https://docs.midnight.network/compact
- **Midnight GitHub**: https://github.com/midnight-protocol

## Contract Details

**Name**: EchoPost  
**Network**: Preprod  
**Language**: Compact  
**Address**: (to be filled after deployment)  
**Transaction**: (to be filled after deployment)  
**Block**: (to be filled after deployment)  

---

**Status**: Ready for deployment once Midnight CLI is available in Docker image.

**Last Updated**: July 2, 2026
