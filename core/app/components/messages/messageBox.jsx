import { Messages } from "./message";

export function MessageBox(){
    let messageList = [];

    return(
        <div style={{position: "absolute", width: "100%", bottom: "5px", textAlign: "center", zIndex: "-1"}}>
            <div className="messageBox" style={{overflowY: "scroll"}}>
                <div style={{padding: "5px"}}>
                    <Messages messages = {messageList}/>
                </div>
            </div>
        </div>
    )
}

export function addMessage(text, type){
    console.log(text + type)
    messageList.push({text: text, className: type})
    if(messageList.length > 20){
        messageList.pop();
    }
}