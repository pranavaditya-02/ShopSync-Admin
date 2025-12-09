"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Bot, Bell, Shield, Globe, Save } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    aiEnabled: true,
    autoEscalate: true,
    multiChannel: true,
    notifications: true,
    analytics: true,
    debugMode: false,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="p-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure your ShopSync AI system</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">AI Configuration</h2>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">AI Agents Enabled</p>
                  <p className="text-sm text-muted-foreground">Enable AI-powered shopping assistance</p>
                </div>
                <Switch checked={settings.aiEnabled} onCheckedChange={() => toggleSetting("aiEnabled")} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Auto-Escalate</p>
                  <p className="text-sm text-muted-foreground">Automatically escalate complex issues to humans</p>
                </div>
                <Switch checked={settings.autoEscalate} onCheckedChange={() => toggleSetting("autoEscalate")} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Debug Mode</p>
                  <p className="text-sm text-muted-foreground">Show detailed agent reasoning in logs</p>
                </div>
                <Switch checked={settings.debugMode} onCheckedChange={() => toggleSetting("debugMode")} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Channels</h2>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Multi-Channel Support</p>
                  <p className="text-sm text-muted-foreground">Enable web, mobile, voice, and chat</p>
                </div>
                <Switch checked={settings.multiChannel} onCheckedChange={() => toggleSetting("multiChannel")} />
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="mb-3 text-sm font-medium text-foreground">Active Channels</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                    Web
                  </Badge>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Mobile
                  </Badge>
                  <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                    Voice
                  </Badge>
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                    Chat
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive alerts for important events</p>
                </div>
                <Switch checked={settings.notifications} onCheckedChange={() => toggleSetting("notifications")} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Analytics Reports</p>
                  <p className="text-sm text-muted-foreground">Daily performance summaries via email</p>
                </div>
                <Switch checked={settings.analytics} onCheckedChange={() => toggleSetting("analytics")} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Security</h2>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div className="rounded-lg bg-emerald-500/10 p-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  <span className="font-medium text-emerald-500">System Secure</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  All API endpoints are protected and data is encrypted at rest.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-secondary/50 p-3">
                  <p className="text-muted-foreground">API Rate Limit</p>
                  <p className="mt-1 font-medium text-foreground">1000 req/min</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3">
                  <p className="text-muted-foreground">Session Timeout</p>
                  <p className="mt-1 font-medium text-foreground">30 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
