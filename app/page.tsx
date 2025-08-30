"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MarketplaceHeader } from "@/components/marketplace-header"
import { MarketplaceFilters } from "@/components/marketplace-filters"
import { MetaverseCard } from "@/components/metaverse-card"
import { WalletConnect } from "@/components/wallet-connect"
import type { MetaverseNFT } from "@/types/wallet"

// Mock data for demonstration
const mockMetaverses: MetaverseNFT[] = [
  {
    id: "1",
    name: "Chile Fintech Forum 2025",
    description:
      "The premier fintech event in Latin America, bringing together innovators, investors, and industry leaders.",
    image: "/futuristic-fintech-conference-hall-with-holographi.png",
    organizer: "FinteChile",
    organizerWallet: "0x1234...5678",
    tokenAddress: "0xabcd...efgh",
    tokenName: "FinteChile by MetaBuild HUB",
    tokenSymbol: "$FINTECH",
    launchDate: "May 13-14, 2025",
    creator: "0x1234...5678",
    supply: "1,000,000",
    price: "200000",
  },
  {
    id: "2",
    name: "La Cumbre Digital 2025",
    description: "5th edition of the digital transformation summit featuring cutting-edge technology and innovation.",
    image: "/digital-summit-with-purple-and-cyan-lighting-moder.png",
    organizer: "Aleph",
    organizerWallet: "0x2345...6789",
    tokenAddress: "0xbcde...fghi",
    tokenName: "Aleph by MetaBuild HUB",
    tokenSymbol: "$ALEPH",
    launchDate: "March 20-22, 2025",
    creator: "0x2345...6789",
    supply: "500,000",
    price: "400000",
  },
  {
    id: "3",
    name: "MetaBuild Innovation Hub",
    description: "A virtual space for builders, creators, and innovators to collaborate on Web3 projects.",
    image: "/futuristic-innovation-hub-with-floating-platforms-.png",
    organizer: "MetaBuild",
    organizerWallet: "0x3456...7890",
    tokenAddress: "0xcdef...ghij",
    tokenName: "MetaBuild by MetaBuild HUB",
    tokenSymbol: "$BUILD",
    launchDate: "January 15, 2025",
    creator: "0x3456...7890",
    supply: "2,000,000",
    price: "150000",
  },
  {
    id: "4",
    name: "AI & Blockchain Summit",
    description: "Exploring the intersection of artificial intelligence and blockchain technology.",
    image: "/ai-blockchain-summit-with-neural-network-visualiza.png",
    organizer: "TechCorp",
    organizerWallet: "0x4567...8901",
    tokenAddress: "0xdefg...hijk",
    tokenName: "TechCorp by MetaBuild HUB",
    tokenSymbol: "$AIBC",
    launchDate: "June 8-10, 2025",
    creator: "0x4567...8901",
    supply: "750,000",
    price: "300000",
  },
]

export default function HomePage() {
  const router = useRouter()
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [filteredMetaverses, setFilteredMetaverses] = useState<MetaverseNFT[]>(mockMetaverses)
  const [showCreateForm, setShowCreateForm] = useState(false)

  useEffect(() => {
    // Check wallet connection status
    const checkWallet = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          setIsWalletConnected(accounts.length > 0)
        } catch (error) {
          console.error("Error checking wallet:", error)
        }
      }
    }
    checkWallet()
  }, [])

  const handleFiltersChange = (filters: any) => {
    let filtered = mockMetaverses

    // Filter by categories (using organizer as category for demo)
    if (filters.categories.length > 0) {
      filtered = filtered.filter((m) => filters.categories.includes(m.organizer))
    }

    // Filter by organizers
    if (filters.organizers.length > 0) {
      filtered = filtered.filter((m) => filters.organizers.includes(m.organizer))
    }

    // Filter by price range
    filtered = filtered.filter((m) => {
      const price = Number.parseFloat(m.price || "0")
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })

    setFilteredMetaverses(filtered)
  }

  const handleViewDetails = (id: string) => {
    router.push(`/metaverse/${id}`)
  }

  const handleCreateClick = () => {
    setShowCreateForm(true)
  }

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section for Non-Connected Users */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
          <div className="relative container mx-auto px-4 py-24">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                MetaBuild <span className="text-primary">Marketplace</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Discover, create, and trade tokenized metaverses. Build your virtual world empire with NFTs and ERC-20
                tokens on Base.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="w-full sm:w-auto">
                  <WalletConnect />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Tokenized Metaverses</h3>
              <p className="text-muted-foreground text-sm">
                Create and trade virtual worlds as NFTs with their own ERC-20 tokens
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Base Network</h3>
              <p className="text-muted-foreground text-sm">
                Built on Base for fast, low-cost transactions and seamless DeFi integration
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Virtual Merchandise</h3>
              <p className="text-muted-foreground text-sm">
                Buy and sell digital assets like NFT wearables using metaverse tokens
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader isWalletConnected={isWalletConnected} onCreateClick={handleCreateClick} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <MarketplaceFilters onFiltersChange={handleFiltersChange} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Tokenized Metaverses</h2>
              <p className="text-muted-foreground">Discover and invest in virtual worlds with their own economies</p>
            </div>

            {/* Metaverse Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMetaverses.map((metaverse) => (
                <MetaverseCard key={metaverse.id} metaverse={metaverse} onViewDetails={handleViewDetails} />
              ))}
            </div>

            {filteredMetaverses.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No metaverses found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
