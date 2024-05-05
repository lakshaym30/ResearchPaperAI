import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Upload(props){
    
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="fileUpload">File Upload</Label>
            <Input id="fileUpload" type="file" onChange={props.handleFileChange}/>
            <Button onClick={props.handleFileUpload}>Submit PDF</Button>
        </div> 
    )
}

