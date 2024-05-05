import { useState } from 'react'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import './App.css'

function App() {

  return (
    <div className="textarea-container">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  )
}

export default App
