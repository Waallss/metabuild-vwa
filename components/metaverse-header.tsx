"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { MetaverseNFT } from "@/types/wallet"

interface MetaverseHeaderProps {
  metaverse: MetaverseNFT
  onBack: () => void
}

export function MetaverseHeader({ metaverse, onBack }: MetaverseHeaderProps) {
  const { toast } = useToast()

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: metaverse.name,
        text: metaverse.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Metaverse link copied to clipboard",
      })
    }
  }

  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Button>
            <div className="h-6 w-px bg-border" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-foreground">{metaverse.name}</h1>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {metaverse.tokenSymbol}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">by {metaverse.organizer}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-muted-foreground hover:text-foreground"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
