import { CapturePayload, TACConfig } from "./types.js"

export class TACClient {
  private apiKey: string
  private baseUrl: string

  constructor(config: TACConfig) {
    this.apiKey = config.apiKey
    this.baseUrl = config.baseUrl || process.env.TAC_API_BASE_URL || ""
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