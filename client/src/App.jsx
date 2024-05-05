import { useState, useEffect } from 'react'
import { 
  BrowserRouter as Router,
  Routes,
  Route,
 } from 'react-router-dom'

import Query from './components/Query'
import Upload from './components/Upload'
import { Header } from './components/Header'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import './App.css'

function App() {

  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState('')  

  function handleFileChange(event){
    setFile(event.target.files[0])
  }

  async function handleFileUpload(){
    if(!file){
      alert('Please select a file')
      return
    }
    setLoading(true)

    const formData = new FormData()
    formData.append('document', file)

    try{
      const response = await fetch('http://127.0.0.1:8000/upload',{
        method: 'POST',
        body: formData
      })

      if(!response.ok){
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setSummary(data.summary)
      console.log(data)
      setLoading(false)
    }catch(error){
      setLoading(false)
      console.error('There was a problem with your fetch operation', error)
    }
  }

  // useEffect(() => {
  //   console.log(file)
  // },[file])s

  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route element={<Header />}>
            <Route path='/' element={<Upload handleFileUpload={handleFileUpload} handleFileChange={handleFileChange} loading={loading} />}/>
            <Route path='Chat' element={<Query  />}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
