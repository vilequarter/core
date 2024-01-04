import { Button } from "./button";

// (obj)tabs - object containing the title and handler of the tab buttons
export function TabSwitch({tabs, isActive}){
    const buttons = [];

    tabs.forEach((tab) =>{
        buttons.push(
            <Button
                content={<span style={{fontSize: "16px"}}>{tab.title}</span>}
                handler={tab.handler}
                className={isActive == tab.id ? ("activeSwitch") : ("inactiveSwitch")}/>
        )
    })

    return(
        <div className="tabButtons">{buttons}</div>
    )
}