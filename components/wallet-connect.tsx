"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, ExternalLink, Copy, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WalletState {
  address: string | null
  isConnected: boolean
  chainId: number | null
  balance: string | null
}

export function WalletConnect() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    chainId: null,
    balance: null,
  })
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  // Base network chain ID
  const BASE_CHAIN_ID = 8453

  useEffect(() => {
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          const chainId = await window.ethereum.request({ method: "eth_chainId" })
          const balance = await window.ethereum.request({
            method: "eth_getBalance",
            params: [accounts[0], "latest"],
          })

          setWallet({
            address: accounts[0],
            isConnected: true,
            chainId: Number.parseInt(chainId, 16),
            balance: (Number.parseInt(balance, 16) / 1e18).toFixed(4),
          })
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error)
      }
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "Wallet not found",
        description: "Please install MetaMask or another Web3 wallet",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      const chainId = await window.ethereum.request({ method: "eth_chainId" })

      // Switch to Base network if not already connected
      if (Number.parseInt(chainId, 16) !== BASE_CHAIN_ID) {
        await switchToBase()
      }

      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })

      setWallet({
        address: accounts[0],
        isConnected: true,
        chainId: Number.parseInt(chainId, 16),
        balance: (Number.parseInt(balance, 16) / 1e18).toFixed(4),
      })

      toast({
        title: "Wallet connected",
        description: "Successfully connected to Base network",
      })
    } catch (error) {
      console.error("Error connecting wallet:", error)
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const switchToBase = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${BASE_CHAIN_ID.toString(16)}` }],
      })
    } catch (switchError: any) {
      // Chain not added to wallet
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${BASE_CHAIN_ID.toString(16)}`,
                chainName: "Base",
                nativeCurrency: {
                  name: "Ethereum",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://mainnet.base.org"],
                blockExplorerUrls: ["https://basescan.org"],
              },
            ],
          })
        } catch (addError) {
          throw addError
        }
      } else {
        throw switchError
      }
    }
  }

  const disconnectWallet = () => {
    setWallet({
      address: null,
      isConnected: false,
      chainId: null,
      balance: null,
    })
    toast({
      title: "Wallet disconnected",
      description: "Successfully disconnected from wallet",
    })
  }

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address)
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!wallet.isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto bg-card border-border">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-foreground">Connect Your Wallet</CardTitle>
          <CardDescription className="text-muted-foreground">
            Connect your Web3 wallet to access the MetaBuild marketplace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Make sure you're connected to the Base network
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm text-foreground">Wallet Connected</CardTitle>
              <CardDescription className="text-xs">
                {wallet.chainId === BASE_CHAIN_ID ? (
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                    Base Network
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="text-xs">
                    Wrong Network
                  </Badge>
                )}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={disconnectWallet}
            className="text-muted-foreground hover:text-foreground"
          >
            Disconnect
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground">Address</p>
            <p className="text-sm font-mono text-foreground">{formatAddress(wallet.address!)}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyAddress}
            className="text-muted-foreground hover:text-foreground"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground">Balance</p>
            <p className="text-sm font-semibold text-foreground">{wallet.balance} ETH</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(`https://basescan.org/address/${wallet.address}`, "_blank")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
