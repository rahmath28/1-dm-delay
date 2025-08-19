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
    // created a settimeout function in  id variable, just for to delete the timeout before it ends ,
    // so to track that have a state here..
     
    // settimeout function nadantha timerId state la  update pandren.. 
    const [sendMessage, SetSendMessage]= useState<string>("") // finally fill agura text state ah intha state vachu display pandrom..
    const [deletedmessage , setDeletedMessage] = useState<string>("") //  // delete pandra message ah yum display pannanum so , having deleted message state..

  // handle submit
   const handleSubmit = () => {
     //sending message , so true the state 
  setIsSending(true);

  // message send in delay.. : using setimeout..
  //***  */ just created a setimeout function in a id variable and upated it it runs na , state la update pandrom..

  const id = setTimeout(() => {
    SetSendMessage(text); // handle submit nadakkumpothu sending the text state.., so i can get it..
    setText(""); // after that empty the states of text and delay..
    setDelay(0);
    
    // SetSendMessage use panni message send panniyachuna submit pannumbothu , setIsSending false pandrom.
    setIsSending(false);

    //concept : send panna message display agite irukka kudathu , so remove that send message after some seconds..
    setTimeout(() => {
      SetSendMessage("");
    }, 5000);

  }, delay * 1000);
    //  delay number ah get panni , 1000 milliseconds oda multiply panni,
    //  message send panndrom , send panna aprm mesage state ah empty,
    // kuruppita time rannge nale atha settimeout function kulla , logic build pandrom ,
    // antha settimeout function ah id dra variable la create panni timerIs state la pass pandrom , 
    // antha id variable than message send pannuthu , after a delay

  setTimerId(id); //***  */ just created a setimeout function in a id variable and upated it it runs na , state la update pandrom..
  // eppolam setimeout function nadakkutho appolam , timerid dra state la update agum , becasue id dra variable la setimeout function irukku atha vachu  statela update panneerukkom..
};



//    cancel message
// cancel message
const handleCancel = () => {
  
  // timerId : means ennoda delay kuduthu submit pannumpothu setimout function ah id dra variable la  run aguratha , 
  // timerId dra state la update pannom , setimeout run ana timerid state la update agum..

  // settimeout function run ana , timerId state la update agum , athan logic
  // if state la update ana , clearTimeout function use panni antha state ah remove panndrom..

  if (timerId) clearTimeout(timerId); // clear that timmeout state by cleartimeout.
  setIsSending(false);

  // delete pandra message ah yum display pannanum so , having deleted message state..
  setDeletedMessage(text);

  // clear input and delay
  setText("");
  setDelay(0);

  //concept : deleted message display agite irukka kudathu , so deleteing after some seconds..
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
       {/* handle submit nadakkum pothu isSending true..*/}

       {/* isending state ah porithu in button display logic */}
        {!isSending ?  <Button className="w-full" onClick={handleSubmit}>  Send with delay </Button>
        :  <Button className="w-full" variant="destructive" onClick={handleCancel}> delete message</Button> }

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