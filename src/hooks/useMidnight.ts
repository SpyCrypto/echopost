import { useState, useCallback } from 'react'

interface WalletState {
  address: string | null
  isConnected: boolean
  isConnecting: boolean
  error: string | null
}

export function useMidnight() {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  })

  const connect = useCallback(async () => {
    setWalletState(prev => ({ ...prev, isConnecting: true, error: null }))

    try {
      // Check if Lace wallet is available
      if (typeof window === 'undefined' || !(window as any).midnight) {
        throw new Error('Lace wallet not found. Please install the Lace wallet extension.')
      }

      // Simulate wallet connection for demo
      // In production, this would use the actual Midnight.js SDK
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate a mock wallet address for demo
      const mockAddress = '0x' + Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('')

      setWalletState({
        address: mockAddress,
        isConnected: true,
        isConnecting: false,
        error: null,
      })

      return mockAddress
    } catch (error) {
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
      }))
      throw error
    }
  }, [])

  const disconnect = useCallback(() => {
    setWalletState({
      address: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    })
  }, [])

  return {
    ...walletState,
    connect,
    disconnect,
  }
}
