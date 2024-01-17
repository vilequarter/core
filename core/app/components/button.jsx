export function Button({content, handler, className="", progress = 0, display = true}){
    return(
        <button 
            onClick={handler}
            className={`${className} ${display ? "display-inline-block" : "display-none"}`}
            style={{"background": "linear-gradient(to right, green " + progress + "%, white " + (progress) + "%"}}
        >
            {content}
        </button>
    )
}