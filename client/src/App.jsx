import { useState, useEffect } from 'react'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

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
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="fileUpload">File Upload</Label>
        <Input id="fileUpload" type="file" onChange={handleFileChange}/>
        <Button onClick={handleFileUpload}>Submit PDF</Button>

      </div>    
    </>
  )
}

export default App
