export function Messages({messages}){
    let list = [];

    messages.forEach((message) => {
        list.push(
            <p className={message.className}>{message.text}</p>
        )
    })

    return(
        <>
            {list}
        </>
    )
}