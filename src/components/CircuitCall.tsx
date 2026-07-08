import { useState } from 'react'

interface CircuitCallProps {
  walletAddress: string
  contractAddress: string
}

export default function CircuitCall({ walletAddress: _walletAddress }: CircuitCallProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [counterValue, setCounterValue] = useState<number>(0)
  const [incrementCount, setIncrementCount] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)

  const handleIncrement = async () => {
    setIsLoading(true)
    setError(null)
    setTxHash(null)

    try {
      // Simulate proof generation (this would be actual ZK proof generation in production)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate on-chain transaction
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Update counter state (simulating contract state change)
      const secretAmount = Math.floor(Math.random() * 100) + 1
      setCounterValue(prev => prev + secretAmount)
      setIncrementCount(prev => prev + 1)

      // Generate mock transaction hash
      const mockTxHash = '0x' + Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('')
      setTxHash(mockTxHash)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Increment Counter</h2>
      </div>
      <div className="card-content">
        <p>
          Click below to increment the counter using a private witness.
          Your secret increment amount will be proved valid without being revealed.
        </p>

        <div style={{ marginTop: 20 }}>
          <button
            className="button button-primary"
            onClick={handleIncrement}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading">
                <span className="spinner" />
                Generating proof...
              </span>
            ) : (
              'Increment with Secret'
            )}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {txHash && (
          <div className="result-display">
            <div className="result-label">Transaction Submitted</div>
            <div className="result-value">✓ Success</div>
            <div className="address" style={{ marginTop: '8px', fontSize: '0.75rem' }}>
              {txHash}
            </div>
            <div className="privacy-badge">
              Proved without revealing your input
            </div>
          </div>
        )}

        <div className="result-display" style={{ marginTop: '16px' }}>
          <div className="result-label">Current Counter State</div>
          <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
            <div>
              <div className="result-label">Value</div>
              <div className="result-value">{counterValue}</div>
            </div>
            <div>
              <div className="result-label">Increments</div>
              <div className="result-value">{incrementCount}</div>
            </div>
          </div>
        </div>

        <div className="privacy-badge" style={{ marginTop: '16px' }}>
          🔒 Your secret increment amount is never shown on-chain
        </div>
      </div>
    </div>
  )
}
