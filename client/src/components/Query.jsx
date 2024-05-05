import { useState, useEffect } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


export default function Query(props){
    const [collections, setCollections] = useState([])
    const [selectedCollection, setSelectedCollection] = useState('')
    const [response, setResponse] = useState('')


   


    useEffect(() => {
        try{
            fetch('http://127.0.0.1:8000/collection-names',{
                method: 'GET'
              }).then(response => response.json()).then(data => {
                console.log(data)
                setCollections(data)
              })

            // const data = response.json()
            // console.log("TESTSTSTST")
            // console.log(data)
            // setCollections(data)

          }catch(error){
            console.error('There was an error with the get request', error)
          }
      },[])


    async function searchSelectedFile(){
        // console.log(data)
        const inputValue = document.getElementById('searchInput').value;
        const collectionName = 'test';
        const baseURL = 'http://127.0.0.1:8000/search';
        const params = {
          query: inputValue,
          collection_name: selectedCollection
        }
    
        const urlParams = new URLSearchParams(params).toString();
        const urlWithParams = `${baseURL}?${urlParams}`;
        console.log(urlWithParams)
        queryResponse = await fetch(urlWithParams, {method: 'POST'})
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

        setResponse(queryResponse)
    }
    

    return (
        <>
        <div>
            <h1>Which documents would you like to search?</h1>
            <Select onValueChange={setSelectedCollection}>
                <SelectTrigger className="">
                    <SelectValue placeholder="Documents.." />
                </SelectTrigger>
                <SelectContent>
                    {collections.map((item, index) => <SelectItem key={index} value={item}>{item}</SelectItem>)}
                </SelectContent>
            </Select>
        </div> 

        <div className="textarea-container">
                <input id='searchInput' placeholder="Type your message here." />
            <Button onClick={searchSelectedFile}>Search</Button>
            <div className = "response">
                <p>{response}</p>
            </div>
            
        </div>
        </>
    )
}

