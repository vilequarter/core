import {useState, useEffect} from 'react';
import { Child } from './child';

export function Top() {
    const defaultSaveState = 0;

    const [currentSave, setCurrentSave] = useState(defaultSaveState);

    useEffect(() => {
        if(localStorage.getItem('save') == null) return;
        setCurrentSave(JSON.parse(localStorage.getItem('save')));
    },[])

    const clickHandler = () => {
        const newSave = currentSave + 1;
        localStorage.setItem('save', newSave);
        setCurrentSave(newSave);
    }

    return(
        <Child
            currentSave={currentSave}
            handler={clickHandler}
        />
    )
}