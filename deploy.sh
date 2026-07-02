#!/bin/bash
# EchoPost Midnight Deployment Script
# Compiles and deploys Compact contract to Preprod network

set -e

echo "========================================="
echo "EchoPost Compact Contract Deployment"
echo "========================================="
echo ""

# Configuration
NETWORK=${MIDNIGHT_NETWORK:-preprod}
SEED_PHRASE="${MIDNIGHT_SEED_PHRASE}"
PROOF_SERVER=${PROOF_SERVER_URL:-"http://proof-server:6800"}
CONTRACT_NAME="EchoPost"
CONTRACT_FILE="contracts/EchoPost.compact"
RPC_URL="ws://preprod-rpc.midnight.network:9944"

echo "[1/5] Environment Check"
echo "  Network: $NETWORK"
echo "  Proof Server: $PROOF_SERVER"
echo "  RPC URL: $RPC_URL"
echo ""

# Check if contract file exists
if [ ! -f "$CONTRACT_FILE" ]; then
    echo "❌ Error: Contract file not found: $CONTRACT_FILE"
    exit 1
fi
echo "✓ Contract file found: $CONTRACT_FILE"
echo ""

echo "[2/5] Compile Contract to ZK Circuits"
echo "  Compiling $CONTRACT_NAME..."

# Create managed directories
mkdir -p managed/circuits managed/keys

# Note: Actual compilation command depends on Midnight's compact compiler
# This is a placeholder - update with actual compile command
echo "  ℹ️  Awaiting Midnight Compact compiler CLI release"
echo "  Generated circuits will be in: managed/circuits/"
echo "  Generated keys will be in: managed/keys/"
echo ""

echo "[3/5] Prepare Deployment Intent"
echo "  Intent file format: .mn (Midnight intent)"
echo "  Requires:"
echo "    - Compiled contract (circuits + keys)"
echo "    - Funding seed phrase"
echo "    - Proof server URL"
echo ""

echo "[4/5] Fund Wallet"
echo "  Wallet address: mn_addr_preprod12w07jcw9k2k30m03t8u3gu9j2gr66r06rfx3p56ncpctrtmsr3qqhtfsjl"
echo "  Balance check command:"
echo "    midnight-node-toolkit show-wallet --seed '<seed_phrase>' --src-url $RPC_URL"
echo ""

echo "[5/5] Deploy via Midnight Node Toolkit"
echo "  Command:"
echo "    midnight-node-toolkit send-intent \\"
echo "      --dest-url $RPC_URL \\"
echo "      --proof-server $PROOF_SERVER \\"
echo "      --compiled-contract-dir ./managed \\"
echo "      --intent-file <compiled_intent.mn> \\"
echo "      --funding-seed '<seed_phrase>'"
echo ""

echo "========================================="
echo "Deployment Steps:"
echo "========================================="
echo ""
echo "1. Get wallet info:"
echo "   docker run --rm midnightntwrk/midnight-node-toolkit:latest-main show-wallet \\"
echo "     --seed 'predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege' \\"
echo "     --src-url ws://preprod-rpc.midnight.network:9944"
echo ""
echo "2. Check dust balance:"
echo "   docker run --rm midnightntwrk/midnight-node-toolkit:latest-main dust-balance \\"
echo "     --seed 'predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege'"
echo ""
echo "3. Get wallet address:"
echo "   docker run --rm midnightntwrk/midnight-node-toolkit:latest-main show-address \\"
echo "     --seed 'predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege'"
echo ""
echo "4. Deploy contract:"
echo "   docker run --rm -v \$(pwd)/managed:/app/managed \\"
echo "     midnightntwrk/midnight-node-toolkit:latest-main send-intent \\"
echo "     --dest-url ws://preprod-rpc.midnight.network:9944 \\"
echo "     --compiled-contract-dir /app/managed \\"
echo "     --funding-seed 'predict mind kingdom wage limit mixture vicious horse siren bike puzzle barrel approve memory entry pretty pizza bright photo immune cat pen common siege'"
echo ""

echo "========================================="
echo "Status: Ready for deployment"
echo "========================================="
