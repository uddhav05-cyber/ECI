import React from 'react'

export default function CountrySelector({value, onChange}){
  return (
    <select value={value} onChange={e=>onChange(e.target.value)} className="border rounded p-2 text-sm">
      <option value="USA">USA</option>
      <option value="India">India</option>
      <option value="UK">UK</option>
    </select>
  )
}
