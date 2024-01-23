import { Button } from "./button";

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