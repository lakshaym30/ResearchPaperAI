import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

import { useEffect, useState } from "react"

export default function Query(props){

    const [collections, setCollections] = useState([])

    const collectionElements = collections.map((item, index) => {
        <SelectItem key={index}>{item}</SelectItem>
    })


    useEffect(() => {
        async function getCollectionNames(){
          try{
            const response = await fetch('')
    
            if(!response.ok){
              throw new Error('Network response was not ok')
            }
    
            const data = await response.json()
            setCollections(data)
    
          }catch(error){
            console.error('There was an error with the get request', error)
          }
        }
      }, [])

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
                <Textarea placeholder="Type your message here." />
                <Button>Send message</Button>
            </div>
        </>
    )
}

