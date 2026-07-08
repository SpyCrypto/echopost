import { useMidnight } from '../hooks/useMidnight'

interface WalletConnectProps {
  isConnected: boolean
  walletAddress: string | null
  onConnect: (address: string) => void
  onDisconnect: () => void
}

export default function WalletConnect({
  isConnected,
  walletAddress,
  onConnect,
  onDisconnect,
}: WalletConnectProps) {
  const { connect, disconnect, isConnecting, error } = useMidnight()

  const handleConnect = async () => {
    try {
      const address = await connect()
      onConnect(address)
    } catch (err) {
      console.error('Connection failed:', err)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    onDisconnect()
  }

  if (isConnected && walletAddress) {
    return (
      <div className="card" style={{ marginBottom: 0 }}>
        <div className="card-header">
          <span className="status status-connected">
            <span className="spinner" style={{ width: 8, height: 8, borderWidth: 1 }} />
            Connected
          </span>
          <button className="button button-ghost" onClick={handleDisconnect}>
            Disconnect
          </button>
        </div>
        <div className="address">{walletAddress}</div>
      </div>
    )
  }

  return (
    <div className="card" style={{ marginBottom: 0 }}>
      {isConnecting ? (
        <div className="loading">
          <span className="spinner" />
          Connecting to wallet...
        </div>
      ) : (
        <button className="button button-primary" onClick={handleConnect}>
          Connect Lace Wallet
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  )
}
