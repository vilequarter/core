import { Messages } from "./message";

export function MessageBox({messageList}){
    return(
        <div style={{position: "absolute", width: "100%", bottom: "5px", textAlign: "center", zIndex: "0"}}>
            <div className="messageBox" style={{overflowY: "scroll"}}>
                <div style={{padding: "5px"}}>
                    <Messages messages = {messageList}/>
                </div>
            </div>
        </div>
    )
}