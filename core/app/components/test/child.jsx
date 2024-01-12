export function Child({currentSave, handler}){
    return(
        <button onClick={handler}>
            {currentSave}
        </button>
    )
}