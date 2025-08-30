"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Coins, Users, DollarSign } from "lucide-react"
import type { MetaverseNFT } from "@/types/wallet"

interface TokenStatsProps {
  metaverse: MetaverseNFT
}

export function TokenStats({ metaverse }: TokenStatsProps) {
  const formatPrice = (price: string | undefined) => {
    if (!price) return "TBA"
    return `$${Number.parseFloat(price).toLocaleString()}`
  }

  const formatSupply = (supply: string | undefined) => {
    if (!supply) return "TBA"
    return Number.parseFloat(supply).toLocaleString()
  }

  // Mock data for demonstration
  const mockStats = {
    currentPrice: "$0.25",
    priceChange24h: "+12.5%",
    marketCap: "$125,000",
    volume24h: "$8,450",
    holders: "1,247",
    isPositive: true,
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Coins className="w-5 h-5 text-primary" />
          Token Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Current Price</p>
            <p className="text-lg font-bold text-foreground">{mockStats.currentPrice}</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              {mockStats.isPositive ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-500" />
              )}
              <span className={`text-xs ${mockStats.isPositive ? "text-green-500" : "text-red-500"}`}>
                {mockStats.priceChange24h}
              </span>
            </div>
          </div>

          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Market Cap</p>
            <p className="text-lg font-bold text-foreground">{mockStats.marketCap}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Token Symbol</span>
            <Badge variant="outline" className="font-mono">
              {metaverse.tokenSymbol}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Supply</span>
            <span className="text-sm font-medium text-foreground">{formatSupply(metaverse.supply)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">24h Volume</span>
            <span className="text-sm font-medium text-foreground">{mockStats.volume24h}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Holders</span>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{mockStats.holders}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Network</span>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Base
            </Badge>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">DEX Integration</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Token is tradeable on Uniswap V3 and other Base DEXs. Liquidity provided by Clanker protocol.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
