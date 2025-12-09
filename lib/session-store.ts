import type { CustomerSession } from "./data/mock-data"
import { sessions as mockSessions } from "./data/mock-data"

const store = new Map<string, CustomerSession>(mockSessions.map((s) => [s.id, { ...s }]))
const customerMap = new Map<string, string>(mockSessions.map((s) => [s.customerId, s.id]))

export const SessionStore = {
  get(sessionId: string) {
    return store.get(sessionId)
  },

  getByCustomerId(customerId: string) {
    const sid = customerMap.get(customerId)
    return sid ? store.get(sid) : undefined
  },

  create(customerId: string, customerName: string, channel: CustomerSession["channel"]): CustomerSession {
    const existing = this.getByCustomerId(customerId)
    if (existing) {
      existing.channel = channel
      existing.status = "active"
      existing.lastActivity = new Date().toISOString()
      return existing
    }

    const session: CustomerSession = {
      id: `sess_${Date.now()}`,
      customerId,
      customerName,
      channel,
      status: "active",
      cartItems: [],
      lastActivity: new Date().toISOString(),
      conversationHistory: [],
    }
    store.set(session.id, session)
    customerMap.set(customerId, session.id)
    return session
  },

  update(sessionId: string, updates: Partial<CustomerSession>) {
    const session = store.get(sessionId)
    if (!session) return undefined
    Object.assign(session, updates, { lastActivity: new Date().toISOString() })
    return session
  },

  addMessage(sessionId: string, role: "user" | "assistant", content: string) {
    const session = store.get(sessionId)
    if (!session) return
    session.conversationHistory.push({ role, content, timestamp: new Date().toISOString() })
    session.lastActivity = new Date().toISOString()
  },

  getActiveSessions() {
    return Array.from(store.values()).filter((s) => s.status === "active" || s.status === "idle")
  },

  getAll() {
    return Array.from(store.values())
  },
}
