"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, MessageCircle, Zap, Star } from "lucide-react"

interface AIAgentSectionProps {
  metaverseId: string
  tokenSymbol: string
}

export function AIAgentSection({ metaverseId, tokenSymbol }: AIAgentSectionProps) {
  // Mock AI agents data
  const aiAgents = [
    {
      id: "meby-1",
      name: "Meby Assistant",
      description: "Your personal AI guide for navigating the metaverse and managing your digital assets.",
      avatar: "/ai-assistant-avatar.png",
      capabilities: ["Asset Management", "Event Navigation", "Token Analytics"],
      status: "coming-soon",
      tokenCost: "10",
    },
    {
      id: "curator-1",
      name: "Content Curator",
      description: "AI-powered content discovery and curation for the best metaverse experiences.",
      avatar: "/ai-curator-avatar.png",
      capabilities: ["Content Discovery", "Personalized Recommendations", "Trend Analysis"],
      status: "coming-soon",
      tokenCost: "5",
    },
    {
      id: "trader-1",
      name: "Trading Bot",
      description: "Automated trading assistant for metaverse tokens and NFTs.",
      avatar: "/ai-trader-avatar.png",
      capabilities: ["Price Monitoring", "Automated Trading", "Portfolio Management"],
      status: "coming-soon",
      tokenCost: "25",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">AI Agents</h3>
        <p className="text-muted-foreground">
          Intelligent NPCs that enhance your metaverse experience using {tokenSymbol} tokens
        </p>
      </div>

      <div className="grid gap-6">
        {aiAgents.map((agent) => (
          <Card key={agent.id} className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-foreground">{agent.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {agent.status === "coming-soon" ? "Coming Soon" : "Active"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground text-pretty">{agent.description}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-foreground mb-2">Capabilities</h5>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((capability) => (
                    <Badge key={capability} variant="secondary" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">Activation Cost</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-foreground">{agent.tokenCost}</span>
                  <span className="text-sm text-muted-foreground">{tokenSymbol}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  disabled={agent.status === "coming-soon"}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {agent.status === "coming-soon" ? "Coming Soon" : "Activate Agent"}
                </Button>
                <Button variant="outline" size="sm" className="border-border bg-transparent">
                  <Star className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-foreground mb-2">AI Agent Ecosystem</h4>
          <p className="text-sm text-muted-foreground mb-4">
            AI agents consume {tokenSymbol} tokens to perform actions, creating utility and demand for the metaverse
            economy. More agents will be added based on community needs.
          </p>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Powered by MetaBuild AI
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}
