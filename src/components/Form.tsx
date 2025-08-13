import { Textarea } from "./ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"
import { useState } from "react"

const Form = () => {
    // tailwind css : space y axis >> margin y axis , last child ku mattum varathu athan space class..

    // states for my app
    // typescript use panna , states ku type enna nu mention pannanum : useState<string>("")

    const [text, setText] = useState<string>(""); // this state is for : to get message.
    const [delay,setDelay] = useState<number>(0); // this state is for : input delay ku na get pandra  numbers store panna.
    const [isSending, setIsSending] = useState<boolean>(false) // this state is for : message sent or not, initially not : reason nothing send.
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null); // this state is for :  settimeout function works or not , 
    // created a settimeout function in  id variable, 
    // settimeout function nadantha timerId state la  update pandren.. 
    const [sendMessage, SetSendMessage]= useState<string>("") // finally send agura message..
    const [deletedmessage , setDeletedMessage] = useState<string>("")

  // handle submit
   const handleSubmit = () => {
     //sending message , so true the state 
  setIsSending(true);

     // next delay set pannanum
  const id = setTimeout(() => {
    SetSendMessage(text);
    setText("");
    setDelay(0);
    
    // SetSendMessage use panni message send panniyachuna submit pannumbothu , setIsSending false pandrom.
    setIsSending(false);

    // hide the sent message after 5 seconds
    setTimeout(() => {
      SetSendMessage("");
    }, 5000);
  }, delay * 1000);
    //  delay number ah get panni , 1000 milliseconds oda multiply panni,
    //  message send panndrom , send panna aprm mesage state ah empty,
    // kuruppita time rannge nale atha settimeout function kulla , logic build pandrom ,
    // antha settimeout function ah id dra variable la create panni timerIs state la pass pandrom , 
    // antha id variable than message send pannuthu , after a delay

  setTimerId(id);
};



//    cancel message
// cancel message
const handleCancel = () => {
  if (timerId) clearTimeout(timerId);
  setIsSending(false);

  // set deleted message
  setDeletedMessage(text);

  // clear input and delay
  setText("");
  setDelay(0);

  // hide the deleted message after 2 seconds
  setTimeout(() => {
    setDeletedMessage("");
  }, 5000);
};


  return (
    <div className="bg-white-50 rounded p-4 border-2 space-y-4">
        <h2 className="text-2xl font-bold text-gray-500 ">DM Delay-App</h2>

        <Textarea placeholder="Write your message..." 
        onChange={(e) => setText(e.target.value)} value={text}/>
        {/* submit pannumpothu value ah get pannanum so , value la text state kudathachu.. */}

         {/* {text} : updated my message in text state by onchange event*/} 

        <Input type="number" placeholder="Delay in seconds" value={delay} 
        onChange={(e) => setDelay(Number(e.target.value))} disabled ={isSending}/>
        {/* form la irunthu vara data string ah irukkum atha number ah get pannanum.. :  setDelay(Number(e.target.value)) */}
        {/*submit pannumpothu delay number value ah get pannanum so , value la delay state kudathachu..  */}

        {/* {delay} : got delay */}
       
       {/* isSending :  na initially false , ( !isSending ) >> not isSending  na true  */}
       {/* !isSending : means true , apo submit pannanum , so handle click button..*/}
       {/* isSending : which means false , na habdle cancel */}
        {!isSending ?  <Button className="w-full" onClick={handleSubmit}>  Send with delay </Button>
        :  <Button className="w-full" variant="destructive" onClick={handleCancel}> Cancel message</Button> }

        {/* {sendMessage} : got message  */}

        {/* isSending : tue na enakku sendMessage state la message irukku , atha base panni logic */}
        {/* : this logic will work if only the message is sent.. */}   
        {sendMessage &&
        <div className="bg-green-200 p-2 rounded ">
           <p className="text-green-800"> Message sent : {sendMessage}</p>
        </div>
        } 

        {deletedmessage  &&
          <div className="bg-red-200 p-2 rounded">
            <p className="text-red-800">Deleted Mesage : {deletedmessage}</p>
          </div>
        }
        
        
    </div>
  )
}

export default Form