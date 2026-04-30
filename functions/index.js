import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

// Simple proxy endpoint to call Gemini (replace with official SDK usage)
app.post('/gemini-proxy', async (req, res) => {
  const { messages = [], country } = req.body || {}
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY

  if(!apiKey){
    // Return a mock answer for local development without a key
    return res.json({ text: `Mock: ElectIQ (country=${country}) — Ask me anything about the election process.` })
  }

  try{
    // NOTE: Replace this fetch with the official @google/generative-ai SDK in production.
    const prompt = messages.filter(m=>m.role!=='system').map(m=>`${m.role}: ${m.content}`).join('\n')
    const body = {
      model: 'gemini-1.5-flash',
      prompt: prompt,
      maxOutputTokens: 300
    }

    const r = await fetch('https://api.generative.ai/v1beta/models/gemini-1.5-flash:generateText', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify(body)
    })

    const json = await r.json()
    // The response shape depends on the API — adapt when integrating SDK
    const text = json.output?.[0]?.content || json.candidates?.[0]?.content || json.text || JSON.stringify(json)
    res.json({ text })
  }catch(err){
    res.status(500).json({ error: String(err) })
  }
})

// Quickfact endpoint example
app.get('/gemini-quickfact', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
  if(!apiKey){
    return res.json({ fact: 'Voter registration deadlines vary by state.' })
  }
  // For brevity return a static payload; replace with real generate call
  res.json({ fact: 'Voter registration deadlines vary by state.' })
})

// Export for Firebase Functions (HTTP)
import { onRequest } from 'firebase-functions/v2/https'
export const geminiProxy = onRequest({ region: 'us-central1' }, app)
