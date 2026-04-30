import React, {useState, useEffect} from 'react'
import Timeline from './components/Timeline'
import ChatWidget from './components/ChatWidget'
import Quiz from './components/Quiz'
import CountrySelector from './components/CountrySelector'
import QuickFacts from './components/QuickFacts'

export default function App(){
  const [country, setCountry] = useState('USA')
  const [fact, setFact] = useState(null)

  useEffect(()=>{
    // fetch a quick fact via functions when available; fallback locally
    async function loadFact(){
      try{
        const res = await fetch('/.netlify/functions/gemini-quickfact')
        if(res.ok){
          const json = await res.json()
          setFact(json.fact)
          return
        }
      }catch(e){}
      setFact('Voter registration deadlines vary by state — check local rules.')
    }
    loadFact()
  },[])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="p-6 bg-white shadow">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold">ElectIQ</h1>
          <CountrySelector value={country} onChange={setCountry} />
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-xl font-medium mb-3">Interactive Election Timeline</h2>
          <Timeline country={country} />
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-medium mb-3">Quick Facts</h2>
          <QuickFacts fact={fact} />
        </section>

        <section>
          <Quiz topic="Voter Registration" country={country} />
        </section>
      </main>

      <ChatWidget country={country} />
    </div>
  )
}
