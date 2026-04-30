import React, {useState} from 'react'

export default function Quiz({topic, country}){
  const [questions, setQuestions] = useState(null)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)

  async function generate(){
    setQuestions(null)
    // call functions proxy to generate quiz via Gemini in a real deploy; here we mock
    const mock = [
      {q:'When should you register to vote?', choices:['Any time','Before deadline','On Election Day'], a:1, explain:'Register before the local deadline.'},
      {q:'What is Election Day?', choices:['Random day','When votes are cast','When polls close'], a:1, explain:'It is the day voters cast ballots.'},
      {q:'Do all countries have primaries?', choices:['Yes','No','Only small countries'], a:1, explain:'Not all — primaries vary by system.'},
      {q:'Who counts the votes?', choices:['Citizens','Election officials','Candidates'], a:1, explain:'Election officials count votes.'},
      {q:'What is inauguration?', choices:['Voting','Office start','Campaign'], a:1, explain:'It is when elected officials take office.'}
    ]
    setQuestions(mock)
    setIndex(0)
    setScore(0)
  }

  function answerChoice(i){
    const q = questions[index]
    if(i===q.a) setScore(s=>s+1)
    alert(q.explain)
    if(index+1<questions.length) setIndex(index+1)
    else alert(`Quiz complete — score ${score + (i===q.a?1:0)}/${questions.length}`)
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">Quiz: {topic}</h3>
        <button onClick={generate} className="text-sm text-indigo-600">Try Another Topic</button>
      </div>
      {!questions && <div className="text-sm text-gray-600">Click "Try Another Topic" to generate a short quiz.</div>}
      {questions && (
        <div>
          <div className="mb-2">Q{index+1}. {questions[index].q}</div>
          <div className="grid gap-2">
            {questions[index].choices.map((c,i)=> (
              <button key={i} onClick={()=>answerChoice(i)} className="text-left p-2 bg-gray-100 rounded">{c}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
