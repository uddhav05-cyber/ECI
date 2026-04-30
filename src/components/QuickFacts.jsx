import React from 'react'
import { motion } from 'framer-motion'

export default function QuickFacts({fact}){
  const cards = [
    {id:1, title:'Voter Registration', text: fact || 'Deadlines vary by state.'},
    {id:2, title:'Early Voting', text:'Many places allow early and mail voting.'},
    {id:3, title:'ID Requirements', text:'ID rules differ by country and state.'}
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map(c=> (
        <motion.div key={c.id} whileHover={{y:-5}} className="bg-white p-4 rounded shadow">
          <div className="font-semibold mb-1">{c.title}</div>
          <div className="text-sm text-gray-600">{c.text}</div>
        </motion.div>
      ))}
    </div>
  )
}
