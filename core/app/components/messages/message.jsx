function ErrorMessage({errorMessage = ""}){
    return (
        <div className="errorMessage">
            { errorMessage }
        </div>
    );
}

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