import { useState } from 'react'

export function AuthRegForm({ handleClick, title }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        type="email"
        value={email}
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
        value={password}
      />
      <button onClick={() => handleClick(email, password)}>{title}</button>
    </div>
  )
}
