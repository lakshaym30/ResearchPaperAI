import { useState, useEffect } from 'react'

import { Input } from "@/components/ui/input"
<<<<<<< HEAD
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
=======
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import './App.css'
>>>>>>> 001203bc28254ee13cf2a8b2780821e5f32090da

function App() {

  const [file, setFile] = useState(null)

  function handleFileChange(event){
    setFile(event.target.files[0])
  }

  async function handleFileUpload(){
    if(!file){
      alert('Please select a file')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try{
      const response = await fetch('',{
        method: 'POST',
        body: formData
      })

      if(!response.ok){
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log(data)

    }catch(error){
      console.error('There was a problem with your fetch operation', error)
    }
  }

  // useEffect(() => {
  //   console.log(file)
  // },[file])s

  return (
<<<<<<< HEAD
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="fileUpload">File Upload</Label>
        <Input id="fileUpload" type="file" onChange={handleFileChange}/>
        <Button onClick={handleFileUpload}>Submit PDF</Button>

      </div>    
    </>
=======
    <div className="textarea-container">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
>>>>>>> 001203bc28254ee13cf2a8b2780821e5f32090da
  )
}

export default App
