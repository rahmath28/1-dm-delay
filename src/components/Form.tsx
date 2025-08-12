import { Textarea } from "./ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"
import { useState } from "react"

const Form = () => {
    // tailwind css : space y axis >> margin y axis , last child ku mattum varathu athan space class..

    // states for my app
    // typescript use panna , states ku type enna nu mention pannanum : useState<string>("")

    const [text, setText] = useState<string>(""); // this state is for : to get message.
    const [delay,setDelay] = useState<number>(0); // this state is for : input delay seconds.
    const [isSending, setIsSending] = useState<boolean>(false) // this state is for : message sent or not, initially not : reason nothing send.
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null); // this state is for : input delay seconds.
    const [sendMessage, SetSendMessage]= useState<string>("")

    // functions
   const handleSubmit = () =>{
    //sending message , so true the state 
    setIsSending(true);

    // next delay set pannanum
    const id = setTimeout(() =>{
        SetSendMessage(text);
        setText("");
        setDelay(0);
        setIsSending(false);

    }, delay * 1000) 
    //  delay number ah get panni , 1000 milliseconds oda multiply panni,
    //  message send panndrom , send panna aprm mesage state ah empty,
    // kuruppita time rannge nale atha settimeout function kulla , logic build pandrom ,
    // antha settimeout function ah id dra variable la create panni timerIs state la pass pandrom , 
    // antha id variable than message send pannuthu , after a delay
    
    setTimerId(id)
   }

  return (
    <div className="bg-white-50 rounded p-4 border-2 space-y-4">
        <h2 className="text-2xl font-bold text-gray-500 ">DM Delay-App</h2>

        <Textarea placeholder="Write your message..." 
        onChange={(e) => setText(e.target.value)} value={text}/>

         {/* {text} : updated my message in text state by onchange event*/} 

        <Input type="number" placeholder="Delay in seconds" value={delay} 
        onChange={(e) => setDelay(Number(e.target.value))}/>

        {/* {delay} : got delay */}
       
        <Button className="w-full" onClick={handleSubmit}>
            Send a message
        </Button>

        {/* {sendMessage} : got message  */}

        {/* : this logic will work if only the message is sent.. */}   
        {sendMessage &&
        <div className="bg-green-200 p-2 rounded ">
           <p> Message sent : {sendMessage}</p>
        </div>
        } 
        
        
    </div>
  )
}

export default Form