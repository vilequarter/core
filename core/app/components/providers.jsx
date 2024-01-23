import { ConstructsProvider } from "./constructs/constructsContext";
import { PlayerProvider } from "./player/playerContext";
import { ResearchProvider } from "./research/researchContext";
import { ResourcesProvider } from "./resources/resourcesContext";

//Functions as the single component that provides all the contexts for the game
export default function Providers({children}){
    return(
        <PlayerProvider>
            <ResourcesProvider>
                <ResearchProvider>
                    <ConstructsProvider>
                        {children}
                    </ConstructsProvider>
                </ResearchProvider>
            </ResourcesProvider>
        </PlayerProvider>
    )
}