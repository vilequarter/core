import { Button } from "./button";

export function List({items, isActive=true}){
    const buttons = [];

    items.forEach((item) => {
        buttons.push(
            <tr>
                <td>
                    <Button
                        content={<>
                            {Object.hasOwn(item, "title") ? <span className="buttonTitle">{item.title}</span> : <></>}
                            {Object.hasOwn(item, "flavorText") ? <><div className="buttonFlavorText">{item.flavorText}</div></> : <></>}
                            {Object.hasOwn(item, "text") ? <><div className="buttonText">{item.text}</div></> : <></>}
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