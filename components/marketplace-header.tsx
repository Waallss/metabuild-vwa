"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Menu } from "lucide-react"
import { WalletConnect } from "./wallet-connect"

interface MarketplaceHeaderProps {
  isWalletConnected: boolean
  onCreateClick: () => void
}

export function MarketplaceHeader({ isWalletConnected, onCreateClick }: MarketplaceHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MB</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">MetaBuild</h1>
              <p className="text-xs text-muted-foreground">Marketplace</p>
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search metaverses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isWalletConnected && (
              <Button onClick={onCreateClick} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Create Metaverse
              </Button>
            )}
            <div className="hidden md:block">
              <WalletConnect />
            </div>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
