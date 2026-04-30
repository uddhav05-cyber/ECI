import React, {useState, useRef} from 'react'

const SYSTEM_PROMPT = "You are ElectIQ, a friendly and neutral election education assistant. Answer questions about how elections work, voter registration, timelines, and civic processes. Keep answers under 100 words. Use simple language. Never take political sides."

export default function ChatWidget({country}){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{role:'system', content: SYSTEM_PROMPT}])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const ref = useRef()

  async function send(){
    if(!input.trim()) return
    const msg = {role:'user', content: input}
    const newMessages = [...messages, msg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try{
      const res = await fetch('/functions/gemini-proxy', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({messages: newMessages, country})
      })
      const json = await res.json()
      const assistant = {role:'assistant', content: json.text || json.answer || 'Sorry, no response.'}
      setMessages(m=>[...m, assistant])
    }catch(e){
      setMessages(m=>[...m, {role:'assistant', content: 'Error contacting AI proxy.'}])
    }finally{ setLoading(false) }
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {open ? (
        <div className="w-80 h-96 bg-white rounded shadow-lg flex flex-col overflow-hidden">
          <div className="p-2 bg-indigo-600 text-white flex items-center justify-between">
            <div>ElectIQ Chat — {country}</div>
            <button onClick={()=>setOpen(false)} className="text-sm">Close</button>
          </div>
          <div className="flex-1 p-2 overflow-auto" ref={ref}>
            {messages.filter(m=>m.role!=='system').map((m,i)=> (
              <div key={i} className={`mb-2 ${m.role==='user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded ${m.role==='user' ? 'bg-indigo-100' : 'bg-gray-100'}`}>{m.content}</div>
              </div>
            ))}
            {loading && <div className="text-sm text-gray-400">ElectIQ is typing...</div>}
          </div>
          <div className="p-2 border-t">
            <div className="flex gap-2">
              <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 border rounded p-2 text-sm" placeholder="Ask about voting, deadlines..." />
              <button onClick={send} className="px-3 py-2 bg-indigo-600 text-white rounded">Send</button>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={()=>setOpen(true)} className="bg-indigo-600 text-white px-4 py-3 rounded-full shadow-lg">Ask ElectIQ</button>
      )}
    </div>
  )
}
