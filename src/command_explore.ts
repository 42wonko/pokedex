import { type State} from "./state.js";
import { PokeAPI } from "./pokeapi.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    console.log("Exploring " + `${args[0]}...`);
    const location = await state.pokeAPI.fetchLocation(args[0]);
    if(! location.pokemon_encounters){
        console.log("Found no Pokemon");
    } else {
        console.log("Found Pokemon:");
        for(var pokemon of location.pokemon_encounters){
            console.log(`- ${pokemon.pokemon.name}`);
        }
    }
};

