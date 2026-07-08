import { useState } from 'react'
import WalletConnect from './components/WalletConnect'
import CircuitCall from './components/CircuitCall'

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = (address: string) => {
    setWalletAddress(address)
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    setWalletAddress(null)
    setIsConnected(false)
  }

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1 className="title">Counter dApp</h1>
          <p className="subtitle">Privacy-preserving counter on Midnight</p>
        </div>
        <WalletConnect
          isConnected={isConnected}
          walletAddress={walletAddress}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
      </header>

      <main>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Privacy-Preserving Counter</h2>
          </div>
          <div className="card-content">
            <p>
              This counter allows you to increment values using private witness inputs.
              Your secret increment amount is proved valid without ever being revealed on-chain.
            </p>
          </div>
        </div>

        {isConnected && (
          <CircuitCall
            walletAddress={walletAddress!}
            contractAddress="0x5de8d8dd83e8bf13327da2806c231e472eb5ca46"
          />
        )}

        {!isConnected && (
          <div className="card">
            <div className="card-content">
              <p>Connect your Lace wallet to interact with the contract.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
