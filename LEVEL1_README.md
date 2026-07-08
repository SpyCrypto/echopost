# Counter — Privacy-Preserving Smart Contract

> A privacy-preserving counter contract built on Midnight that demonstrates zero-knowledge proof capabilities with private witness inputs and selective disclosure.

## Contract Address
| Network  | Address                                          |
|----------|--------------------------------------------------|
| Preview  | 0xaf4dd91feaeaf3fa80969019804c9478cb7da859     |
| Preprod  | [PASTE ADDRESS AFTER DEPLOY]                    |

## What This Does

The Counter contract is a privacy-preserving smart contract that allows users to increment a counter value using private witness inputs. Unlike traditional smart contracts where all inputs are visible on-chain, this contract uses Midnight's privacy features to:

- **Increment with secret amounts**: Users can increment the counter by a secret value (1-100) that is never revealed on-chain
- **Prove validity without disclosure**: The contract verifies that the secret amount is valid (within range) using zero-knowledge proofs
- **Selective disclosure**: Only the fact that an increment occurred is disclosed, not the secret amount itself
- **Public tracking**: The counter value and increment count are publicly visible for transparency

This demonstrates the core privacy model of Midnight: sensitive data stays private while verifiable state changes are recorded on-chain.

## Privacy Model

### What is PUBLIC (on-chain, visible to anyone):
- Counter value (the cumulative result of all increments)
- Increment count (how many times the counter has been incremented)
- Last updater's wallet address
- Timestamp of last update
- The fact that an increment occurred

### What is PRIVATE (private witness, never on-chain):
- Secret increment amount (the specific value added each time)
- User's secret key (used for proof generation)
- The relationship between individual increments and the final counter value

### What the user PROVES without revealing:
- That the secret amount is within the valid range (1-100)
- That they possess a valid private witness
- That the increment operation is mathematically valid

The contract uses `disclose()` to selectively reveal only the increment count, ensuring the secret amount remains completely private while still allowing verification that an increment occurred.

## Tech Stack

- **Midnight network** — Privacy-preserving blockchain platform
- **Compact language** — Midnight's smart contract language
- **Node.js v22+** — JavaScript runtime for development
- **Docker** — Containerization for proof server
- **Vitest** — Testing framework

## Prerequisites

Before running this project, ensure you have:

- Node.js v22 or higher installed
- Docker installed and running
- Proof server running on port 6300 (`docker run -p 6300:6300 midnightnetwork/proof-server`)
- Git for version control

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SpyCrypto/echopost.git
   cd echopost
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the proof server** (if not already running):
   ```bash
   docker run -p 6300:6300 midnightnetwork/proof-server
   ```

4. **Compile the contract**:
   ```bash
   node contracts/compile-counter.js contracts/counter.compact
   ```

5. **Verify compilation**:
   - Check that `managed/` directory was created
   - Confirm `managed/circuits/counter.circuit` exists
   - Confirm `managed/keys/counter.proving.key` exists
   - Confirm `managed/abi/counter.json` exists

## Run Tests

Run the test suite to verify contract functionality:

```bash
npm run test:run
```

The test suite includes 13 tests covering:
- Circuit logic (secret amount validation)
- State transitions (counter updates)
- Privacy guarantees (private input protection)
- Public increment functions
- Query functions

All tests should pass successfully.

## Deploy Contract

To deploy the counter contract:

1. **Set your private key** (optional for demo):
   ```bash
   export MIDNIGHT_PRIVATE_KEY=your_private_key_here
   ```

2. **Deploy to Preview network**:
   ```bash
   node contracts/deploy-counter.js --network=preview
   ```

3. **Deploy to Preprod network**:
   ```bash
   node contracts/deploy-counter.js --network=preprod
   ```

The deployment script will:
- Verify the contract is compiled
- Generate a contract address
- Save deployment info to `managed/counter-deployment-info.json`
- Display the contract address and transaction hash

## Contract Structure

```
contracts/
├── counter.compact          # Main contract file
├── compile-counter.js       # Compilation script
└── deploy-counter.js        # Deployment script

managed/
├── circuits/
│   ├── counter.circuit      # Compiled circuit
│   └── counter.vk           # Verification key
├── keys/
│   └── counter.proving.key  # Proving key
└── abi/
    └── counter.json         # Contract ABI

tests/
└── counter.test.ts          # Test suite
```

## Initial Idea

Confidential Credentials prove a credential is valid without disclosing it. EchoPost is a privacy-first social platform that
gives people control over what they share, when they share it, and who can see it. By combining modern web technologies with 
privacy-focused design, it explores a future where meaningful conversations do not require sacrificing personal data.

This contract was created as part of Level 1 of the Midnight Builder Challenge to demonstrate understanding of:
- Public ledger state vs private witness inputs
- The `disclose()` function for selective disclosure
- Zero-knowledge proof concepts
- Compact contract compilation and deployment

## Screenshots

### Compile Output
The Counter contract was successfully compiled using:
```bash
node contracts/compile-counter.js contracts/counter.compact
```

Generated artifacts:
- `managed/circuits/counter.circuit` - Compiled circuit
- `managed/circuits/counter.vk` - Verification key
- `managed/keys/counter.proving.key` - Proving key
- `managed/abi/counter.json` - Contract ABI

### Contract Address
**Deployed Contract Address**: `0xaf4dd91feaeaf3fa80969019804c9478cb7da859`
**Network**: Preview
**Transaction Hash**: `05e69bdc1c945a5ad4f183656cf3d7d7c80b9f6b41646b04cbec3f9ce8cc36d8`
**Deployed At**: July 8, 2026

Verification available on the Midnight block explorer.

## Development

### Compile Contract
```bash
node contracts/compile-counter.js contracts/counter.compact
```

### Run Tests
```bash
npm run test:run
```

### Deploy Contract
```bash
node contracts/deploy-counter.js --network=preview
```

## Contract Functions

### `incrementWithSecret(witness: PrivateWitness)`
Increments the counter by a secret amount using a private witness. The secret amount is validated (1-100) but never revealed on-chain.

### `incrementPublic(amount: uint64)`
Increments the counter by a publicly specified amount. This function is provided for comparison with the private version.

### `getCounter() -> CounterState`
Returns the current counter state including value, increment count, last updater, and timestamp.

### `resetCounter()`
Resets the counter to zero. Can only be called by the last updater or when the counter hasn't been used yet.

## License

This project is part of the Risein+Midnight Builder Challenge and is licensed under the MIT License.
