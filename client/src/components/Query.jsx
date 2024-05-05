import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Query(props){

    return (
        <div className="textarea-container">
            <Textarea placeholder="Type your message here." />
            <Button>Send message</Button>
        </div>
    )
}

