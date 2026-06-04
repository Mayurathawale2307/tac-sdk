export type TACConfig = {
  apiKey: string
  baseUrl?: string
}

export type CapturePayload = {
  name: string
  email: string
  message: string
  phone?: string
  company?: string
  website?: string
  feedback?: string
  [key: string]: unknown
}