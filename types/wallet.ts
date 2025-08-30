export interface WalletState {
  address: string | null
  isConnected: boolean
  chainId: number | null
  balance: string | null
}

export interface MetaverseNFT {
  id: string
  name: string
  description: string
  image: string
  organizer: string
  organizerWallet: string
  tokenAddress: string
  tokenName: string
  tokenSymbol: string
  launchDate: string
  creator: string
  supply?: string
  price?: string
}

export interface VirtualMerch {
  id: string
  name: string
  description: string
  image: string
  price: string
  tokenAddress: string
  metaverseId: string
  category: "tshirt" | "sneakers" | "hat" | "hoodie"
}

declare global {
  interface Window {
    ethereum?: any
  }
}
