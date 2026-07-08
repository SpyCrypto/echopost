# EchoPost Midnight Preprod Deployment Status

## ✅ Completed

### Docker Deployment
- ✅ All services running successfully
  - Frontend (port 3000): Running
  - Relay (port 8080): Running  
  - Proof Server (port 6300): Running
  - Contracts service (port 6800/8545): Running

### Contract Compilation
- ✅ Contract compiled from EchoPost.compact
- ✅ Circuits generated: `managed/circuits/EchoPost.circuit`
- ✅ Verification key generated: `managed/circuits/EchoPost.vk`
- ✅ Proving key generated: `managed/keys/EchoPost.proving.key`
- ✅ ABI generated: `managed/abi/EchoPost.json`
- ✅ Circuit hash: `8e3c7f5b1f0d262b93af7d35dce1cf83129de5ed306fd0108038dfbeec3e7f05`

### Wallet Setup
- ✅ Seed phrase verified
- ✅ Address (Unshielded): `mn_addr_preprod12w07jcw9k2k30m03t8u3gu9j2gr66r06rfx3p56ncpctrtmsr3qqhtfsjl`
- ✅ Address (Shielded): `mn_shield-addr_preprod1t8h3qxkzaxx5sx4ganydw8a2z2mng3wtq4u04wcr5ca2s8a68pk52ksxpjha8a079vek42heztkttgfw78e6cd4vae9adp72hjmzl3ghnxkus`

## ⏳ Pending - RPC Endpoint Down

### Contract Deployment Blocked
- ⏳ Midnight Preprod RPC endpoint (both HTTP and WSS) currently unreachable
- ⏳ Connection refused on all RPC attempts (error 111)
- ⏳ Likely temporary maintenance or network issue

## Deployment Command Ready

Once RPC endpoint is restored, deploy using:
```bash
docker run --rm \
  -v $(pwd)/managed:/app/managed \
  midnightntwrk/midnight-node-toolkit:latest-main send-intent \
  --dest-url wss://rpc.preprod.midnight.network \
  --proof-server http://127.0.0.1:6300 \
  --compiled-contract-dir /app/managed \
  --funding-seed "predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege"
```

## Network Status

### What Works
- Docker containers all running and healthy
- Services properly networked
- Contract compilation successful
- Wallet derivation confirmed
- Proof server operational

### What's Blocked
- RPC endpoint connection refused (111 Connection refused)
- Midnight Preprod appears to be down or under maintenance

## Next Action

1. **Monitor Midnight Status**
   - Check https://status.midnight.network or community channels
   - Wait for Preprod RPC endpoint restoration

2. **Deploy Contract**
   - Once RPC available, run send-intent command above
   - Capture transaction hash
   - Verify on block explorer: https://preprod.block-explorer.midnight.network/

## Contract Details
- **Name**: EchoPost
- **Network**: Midnight Preprod
- **Language**: Compact
- **Status**: Compiled & Ready for Deployment
- **Proof Server**: http://localhost:6300
- **Compiled Output**: `./managed/`

---
Status: Ready to deploy (awaiting RPC endpoint restoration)
Last updated: 2026-07-08
