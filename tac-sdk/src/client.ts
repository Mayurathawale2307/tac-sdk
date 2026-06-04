import { CapturePayload, TACConfig } from "./types.js"

export class TACClient {
  private apiKey: string
  private baseUrl: string

  constructor(config: TACConfig) {
    this.apiKey = config.apiKey
    
    // Determine baseUrl with smart defaults
    if (config.baseUrl) {
      this.baseUrl = config.baseUrl
    } else if (process.env.TAC_API_BASE_URL) {
      this.baseUrl = process.env.TAC_API_BASE_URL
    } else if (process.env.NODE_ENV === "production") {
      // Production: use deployed backend
      this.baseUrl = "https://api.convo-app.online"
    } else {
      // Development: default to localhost backend
      this.baseUrl = "http://localhost:4000"
    }
  }

  async capture(payload: CapturePayload) {
    const response = await fetch(
      `${this.baseUrl}/api/public/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
        },
        body: JSON.stringify(payload),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to send message"
      )
    }

    return result
  }
}