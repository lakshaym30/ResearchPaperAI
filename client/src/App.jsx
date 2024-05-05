import { useState, useEffect } from 'react'
import { 
  BrowserRouter as Router,
  Routes,
  Route,
 } from 'react-router-dom'

import Query from './components/Query'
import Upload from './components/Upload'
import { Header } from './components/Header'

import './App.css'

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
      const response = await fetch('http://127.0.0.1:8000/upload',{
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
      <Router>
      <Header />
        <Routes>
          <Route path='/' element={<Upload />}/>
          <Route path='chat' element={<Query />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
