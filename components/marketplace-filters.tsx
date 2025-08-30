"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Filter, X } from "lucide-react"

interface FilterState {
  categories: string[]
  priceRange: [number, number]
  organizers: string[]
}

interface MarketplaceFiltersProps {
  onFiltersChange: (filters: FilterState) => void
}

export function MarketplaceFilters({ onFiltersChange }: MarketplaceFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 1000000],
    organizers: [],
  })

  const categories = ["Conference", "Summit", "Forum", "Workshop", "Exhibition"]
  const organizers = ["Aleph", "FinteChile", "MetaBuild", "TechCorp", "InnovateLab"]

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]

    const newFilters = { ...filters, categories: newCategories }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const toggleOrganizer = (organizer: string) => {
    const newOrganizers = filters.organizers.includes(organizer)
      ? filters.organizers.filter((o) => o !== organizer)
      : [...filters.organizers, organizer]

    const newFilters = { ...filters, organizers: newOrganizers }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const newFilters = {
      categories: [],
      priceRange: [0, 1000000] as [number, number],
      organizers: [],
    }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={filters.categories.includes(category) ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary/80"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Token Price Range</h4>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => {
                const newFilters = { ...filters, priceRange: value as [number, number] }
                setFilters(newFilters)
                onFiltersChange(newFilters)
              }}
              max={1000000}
              step={10000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>${filters.priceRange[0].toLocaleString()}</span>
              <span>${filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Organizers */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Organizers</h4>
          <div className="flex flex-wrap gap-2">
            {organizers.map((organizer) => (
              <Badge
                key={organizer}
                variant={filters.organizers.includes(organizer) ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary/80"
                onClick={() => toggleOrganizer(organizer)}
              >
                {organizer}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
