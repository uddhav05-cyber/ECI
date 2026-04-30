import React, {useState} from 'react'
import { motion } from 'framer-motion'

const defaultSteps = [
  { id: 1, title: 'Voter Registration', desc: 'Register to vote before your local deadline.' },
  { id: 2, title: 'Primaries', desc: 'Parties select their candidates.' },
  { id: 3, title: 'Campaigning', desc: 'Candidates share platforms and debate.' },
  { id: 4, title: 'Election Day', desc: 'Voters cast ballots at polling places or by mail.' },
  { id: 5, title: 'Results', desc: 'Ballots are counted and winners are announced.' },
  { id: 6, title: 'Inauguration', desc: 'Elected officials assume office.' }
]

export default function Timeline({country}){
  const [expanded, setExpanded] = useState(null)

  // country could modify steps in a real app
  const steps = defaultSteps.map(s=>({ ...s, title: `${s.title}` }))

  return (
    <div className="space-y-4">
      {steps.map(step=> (
        <motion.div key={step.id} layout onClick={()=>setExpanded(expanded===step.id?null:step.id)} className="bg-white p-4 rounded shadow cursor-pointer">
          <div className="flex justify-between items-center">
            <div className="font-medium">{step.title} <span className="text-sm text-gray-500">({country})</span></div>
            <div className="text-sm text-gray-400">{expanded===step.id?'-':'+'}</div>
          </div>
          {expanded===step.id && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-3 text-sm text-gray-700">
              {step.desc}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
