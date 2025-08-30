"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ExternalLink, Copy, Coins, Users, Calendar, Wallet } from "lucide-react"
import { MetaverseHeader } from "@/components/metaverse-header"
import { TokenStats } from "@/components/token-stats"
import { VirtualMerch } from "@/components/virtual-merch"
import { AIAgentSection } from "@/components/ai-agent-section"
import { useToast } from "@/hooks/use-toast"
import type { MetaverseNFT, VirtualMerch as VirtualMerchType } from "@/types/wallet"

// Mock data - in real app this would come from API/blockchain
const mockMetaverses: Record<string, MetaverseNFT> = {
  "1": {
    id: "1",
    name: "Chile Fintech Forum 2025",
    description:
      "The premier fintech event in Latin America, bringing together innovators, investors, and industry leaders to shape the future of financial technology.",
    image: "/futuristic-fintech-conference-hall-with-holographi.png",
    organizer: "FinteChile",
    organizerWallet: "0x1234567890abcdef1234567890abcdef12345678",
    tokenAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    tokenName: "FinteChile by MetaBuild HUB",
    tokenSymbol: "$FINTECH",
    launchDate: "May 13-14, 2025",
    creator: "0x1234567890abcdef1234567890abcdef12345678",
    supply: "1,000,000",
    price: "200000",
  },
  "2": {
    id: "2",
    name: "La Cumbre Digital 2025",
    description: "5th edition of the digital transformation summit featuring cutting-edge technology and innovation.",
    image: "/digital-summit-with-purple-and-cyan-lighting-moder.png",
    organizer: "Aleph",
    organizerWallet: "0x2345678901bcdef12345678901bcdef123456789",
    tokenAddress: "0xbcdef12345678901bcdef12345678901bcdef123",
    tokenName: "Aleph by MetaBuild HUB",
    tokenSymbol: "$ALEPH",
    launchDate: "March 20-22, 2025",
    creator: "0x2345678901bcdef12345678901bcdef123456789",
    supply: "500,000",
    price: "400000",
  },
}

const mockMerch: Record<string, VirtualMerchType[]> = {
  "1": [
    {
      id: "m1",
      name: "FinTech Forum T-Shirt",
      description: "Exclusive NFT t-shirt for FinTech Forum 2025 attendees",
      image: "/fintech-tshirt-nft.png",
      price: "50",
      tokenAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      metaverseId: "1",
      category: "tshirt",
    },
    {
      id: "m2",
      name: "Innovation Sneakers",
      description: "Limited edition virtual sneakers with fintech-inspired design",
      image: "/innovation-sneakers-nft.png",
      price: "150",
      tokenAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      metaverseId: "1",
      category: "sneakers",
    },
  ],
  "2": [
    {
      id: "m3",
      name: "Digital Summit Hoodie",
      description: "Premium hoodie NFT commemorating La Cumbre Digital 2025",
      image: "/digital-summit-hoodie-nft.png",
      price: "100",
      tokenAddress: "0xbcdef12345678901bcdef12345678901bcdef123",
      metaverseId: "2",
      category: "hoodie",
    },
  ],
}

export default function MetaverseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [metaverse, setMetaverse] = useState<MetaverseNFT | null>(null)
  const [merch, setMerch] = useState<VirtualMerchType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const id = params.id as string
    const foundMetaverse = mockMetaverses[id]
    const foundMerch = mockMerch[id] || []

    if (foundMetaverse) {
      setMetaverse(foundMetaverse)
      setMerch(foundMerch)
    }
    setIsLoading(false)
  }, [params.id])

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: `${label} copied successfully`,
    })
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading metaverse details...</p>
        </div>
      </div>
    )
  }

  if (!metaverse) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Metaverse Not Found</h1>
          <p className="text-muted-foreground mb-6">The metaverse you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/")} className="bg-primary hover:bg-primary/90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MetaverseHeader metaverse={metaverse} onBack={() => router.push("/")} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* NFT Details */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    NFT Certificate
                  </Badge>
                  Metaverse Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={metaverse.image || "/placeholder.svg"}
                      alt={metaverse.name}
                      className="w-full h-64 object-cover rounded-lg border border-border"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{metaverse.name}</h3>
                      <p className="text-muted-foreground text-pretty">{metaverse.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Organizer</p>
                        <p className="text-sm font-medium text-foreground">{metaverse.organizer}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Launch Date</p>
                        <p className="text-sm font-medium text-foreground">{metaverse.launchDate}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Creator</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-foreground">{formatAddress(metaverse.creator)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(metaverse.creator, "Creator address")}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">View on BaseScan</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            window.open(`https://basescan.org/address/${metaverse.tokenAddress}`, "_blank")
                          }
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for different sections */}
            <Tabs defaultValue="merch" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="merch">Virtual Merchandise</TabsTrigger>
                <TabsTrigger value="ai-agents">AI Agents</TabsTrigger>
              </TabsList>
              <TabsContent value="merch" className="mt-6">
                <VirtualMerch merch={merch} tokenSymbol={metaverse.tokenSymbol} />
              </TabsContent>
              <TabsContent value="ai-agents" className="mt-6">
                <AIAgentSection metaverseId={metaverse.id} tokenSymbol={metaverse.tokenSymbol} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TokenStats metaverse={metaverse} />

            {/* Quick Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Coins className="w-4 h-4 mr-2" />
                  Buy {metaverse.tokenSymbol} Tokens
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-border text-foreground hover:bg-muted bg-transparent"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-border text-foreground hover:bg-muted bg-transparent"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
