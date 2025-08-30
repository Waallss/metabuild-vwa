"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { VirtualMerch as VirtualMerchType } from "@/types/wallet"

interface VirtualMerchProps {
  merch: VirtualMerchType[]
  tokenSymbol: string
}

export function VirtualMerch({ merch, tokenSymbol }: VirtualMerchProps) {
  const { toast } = useToast()
  const [purchasingItems, setPurchasingItems] = useState<Set<string>>(new Set())

  const handlePurchase = async (item: VirtualMerchType) => {
    setPurchasingItems((prev) => new Set(prev).add(item.id))

    // Simulate purchase process
    setTimeout(() => {
      setPurchasingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(item.id)
        return newSet
      })

      toast({
        title: "Purchase Successful!",
        description: `You've successfully purchased ${item.name} for ${item.price} ${tokenSymbol}`,
      })
    }, 2000)
  }

  const getCategoryIcon = (category: VirtualMerchType["category"]) => {
    switch (category) {
      case "tshirt":
        return "👕"
      case "sneakers":
        return "👟"
      case "hat":
        return "🧢"
      case "hoodie":
        return "🧥"
      default:
        return "🎽"
    }
  }

  if (merch.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Merchandise Available</h3>
          <p className="text-muted-foreground">
            Virtual merchandise will be available soon. Check back later for exclusive NFT wearables!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Virtual Merchandise</h3>
        <p className="text-muted-foreground">Exclusive NFT wearables that can be purchased with {tokenSymbol} tokens</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {merch.map((item) => (
          <Card key={item.id} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={item.image || `/placeholder.svg?height=200&width=300&query=${item.category} NFT`}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-background/80">
                    {getCategoryIcon(item.category)} NFT
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    {item.price} {tokenSymbol}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">{item.name}</h4>
                <p className="text-sm text-muted-foreground text-pretty">{item.description}</p>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button
                onClick={() => handlePurchase(item)}
                disabled={purchasingItems.has(item.id)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {purchasingItems.has(item.id) ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy for {item.price} {tokenSymbol}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
