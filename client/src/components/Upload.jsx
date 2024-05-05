import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function Upload(props){
    
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="fileUpload">File Upload</Label>
            <Input id="fileUpload" type="file" onChange={props.handleFileChange}/>
            <Button onClick={props.handleFileUpload}>{props.loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</>:"Submit PDF"}</Button>
            {summary?<p>{props.summary}</p>:null}
        </div> 
    )
}

