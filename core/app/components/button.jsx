// (jsx)content - object containing main information of the button
// (function)handler - the onClick function for the button
export function Button({content, handler, className, progress}){
    return(
        <button 
            onClick={handler}
            className={className}
            style={{"background": "linear-gradient(to right, green " + progress + "%, white " + (progress) + "%"}}
        >
            {content}
        </button>
    )
}