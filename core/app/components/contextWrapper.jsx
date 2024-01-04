import { PlayerProvider } from "./player/playerContext";
import { ResourcesProvider } from "./resources/resourcesContext";

export function ContextWrapper({children}){
    return(
        <PlayerProvider>
            <ResourcesProvider>
                {children}
            </ResourcesProvider>
        </PlayerProvider>
    )
}