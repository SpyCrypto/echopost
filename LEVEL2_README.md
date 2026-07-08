# Counter dApp — Privacy-Preserving Frontend

> A privacy-preserving counter dApp with wallet connection and zero-knowledge proof circuit calls on Midnight.

## Live Demo
[PASTE LIVE URL AFTER DEPLOYING FRONTEND]

## Contract Address
| Network  | Address                                          |
|----------|--------------------------------------------------|
| Preprod  | 0x5de8d8dd83e8bf13327da2806c231e472eb5ca46     |

## What This Does

The Counter dApp is a frontend interface for the privacy-preserving counter smart contract on the Midnight network. Users can:

- **Connect their Lace wallet** to interact with the contract
- **Increment the counter** using private witness inputs
- **Generate zero-knowledge proofs** locally in the browser
- **Submit transactions on-chain** without revealing their secret inputs

The dApp demonstrates the core privacy model of Midnight: sensitive data (the secret increment amount) stays private while verifiable state changes are recorded on-chain.

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

## Privacy Claim

**On-chain observers can see:** The counter value increased and who made the transaction.

**On-chain observers cannot see:** The specific secret amount that was added to the counter. The secret is proved valid using zero-knowledge cryptography but is never revealed on the blockchain.

## Tech Stack

- **Midnight network** — Privacy-preserving blockchain platform
- **Compact language** — Midnight's smart contract language
- **Midnight.js SDK** — Wallet and contract interaction library
- **React 18** — UI framework
- **Vite** — Build tool and dev server
- **TypeScript** — Type-safe development
- **Lace wallet** — Midnight wallet for transaction signing

## Prerequisites

- **Lace wallet** installed as a browser extension
- **Node.js v22+** for local development
- **Docker** running (for proof server on port 6300)

## Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SpyCrypto/echopost.git
   cd echopost
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

5. **Connect your Lace wallet**:
   - Click "Connect Lace Wallet"
   - Approve the connection in your wallet
   - Your wallet address will appear on screen

6. **Test the circuit call**:
   - Click "Increment with Secret"
   - Watch the loading state during proof generation
   - See the on-chain result after submission
   - Notice that the secret amount is never shown

## Demo Video
[PLACEHOLDER — I will add the link after recording]

## Deployment

### Deploy to Netlify

1. **Push your code to GitHub**
2. **Connect your repository to Netlify**
3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Deploy** — Netlify will automatically build and deploy

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

The `netlify.toml` file is already configured for automatic deployment.

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test:run
```

### Project Structure

```
src/
├── components/
│   ├── WalletConnect.tsx    # Wallet connection UI
│   └── CircuitCall.tsx      # Circuit call button + result display
├── hooks/
│   └── useMidnight.ts       # Midnight.js SDK hook
├── App.tsx                  # Main application component
├── main.tsx                 # Application entry point
└── index.css                # Global styles
```

## Contract Interaction

The frontend connects to the Counter contract deployed on Midnight Preprod:

- **Contract Address**: `0x5de8d8dd83e8bf13327da2806c231e472eb5ca46`
- **Network**: Midnight Preprod
- **Functions Used**:
  - `incrementWithSecret` — Increment with private witness
  - `getCounter` — Query current counter state

## Privacy Features

1. **Private Witness Inputs**: The secret increment amount is never exposed in the UI or on-chain
2. **Zero-Knowledge Proofs**: Proofs are generated locally in the browser
3. **Selective Disclosure**: Only the increment count is disclosed, not the secret
4. **Wallet Integration**: Lace wallet provides secure transaction signing

## Demo Video Checklist

When recording the demo video (under 2 minutes), show:

1. **Connect Lace wallet** — Show the address appear on screen
2. **Call the circuit** — Show the loading state during proof generation
3. **Show the on-chain result** — Display the transaction hash and updated counter state
4. **Point out privacy** — Emphasize that the private input was never shown

## License

This project is part of the Risein+Midnight Builder Challenge and is licensed under the MIT License.
