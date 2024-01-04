import { Button } from "./button";

// (array(obj))items - objects to be included in the list
//      (string?)title - title of the button
//      (string?)text - main content of the button
//      (string?)effect - effect description of the button
//      (string?)cost - cost of the button
//      (function)handler - click handler function of the button
//      (string?)className - styling class of the button
//      (number?)progress - value of progress fill
export function List({items, isActive=true}){
    const buttons = [];

    items.forEach((item) => {
        buttons.push(
            <tr>
                <td>
                    <Button
                        content={<>
                            {Object.hasOwn(item, "title") ? <span className="buttonTitle">{item.title}</span> : <></>}
                            {Object.hasOwn(item, "text") ? <><div className="buttonText">{item.text}</div><br></br></> : <></>}
                            {Object.hasOwn(item, "effect") ? <><div className="buttonEffect">{item.effect}</div><br></br></> : <></>}
                            {Object.hasOwn(item, "cost") ? <div className="buttonCost">{item.cost}</div> : <></>}
                        </>}
                        handler={item.handler}
                        className={Object.hasOwn(item, "className") ? item.className : ""}
                        progress={Object.hasOwn(item, "progress") ? item.progress : 0}/>
                </td>
            </tr>
        )
    })

    return(
        <table style={{display: (isActive ? 'flex' : 'none'), alignItems: 'center', justifyContent: 'center'}}>
            <tbody>{buttons}</tbody>
        </table>
    )
}