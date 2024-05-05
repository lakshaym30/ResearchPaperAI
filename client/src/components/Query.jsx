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


    const collectionElements = collections.map((item, index) => {
        <SelectItem key={index}>{item}</SelectItem>
    })


    useEffect(() => {
        try{
            const response = fetch('http://127.0.0.1:8000/collection-names',{
                method: 'GET'
              })

            const data = response.json()
            setCollections(data)

          }catch(error){
            console.error('There was an error with the get request', error)
          }
      }, [])


    async function searchSelectedFile(selectedCollection){
        const inputValue = document.getElementById('searchInput').value;
        const collectionName = 'test';
        const baseURL = 'http://127.0.0.1:8000/search';
        const params = {
          query: inputValue,
          collectionName: selectedCollection
        }
    
        const urlParams = new URLSearchParams(params).toString();
        const urlWithParams = `${baseURL}?${urlParams}`;
    
        queryResponse = await fetch(urlWithParams)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

        setResponse(queryResponse)
    }
    

    return (
        <>
        <div>
            <h1>Which documents would you like to search?</h1>
            <Select>
                <SelectTrigger className="">
                    <SelectValue placeholder="Documents...  " />
                </SelectTrigger>
                <SelectContent>
                    {collectionElements}
                </SelectContent>
            </Select>
        </div> 

        <div className="textarea-container">
            <input id='searchInput' placeholder="Type your message here." />
            <Button onClick={searchSelectedFile(selectedCollection)}>Search</Button>
            <div className = "response">
                <p>{response}</p>
            </div>
        </div>
        </>
    )
}

