import { type State} from "./state.js";
import { PokeAPI } from "./pokeapi.js";

export async function commandPokedex(state: State, ...args: string[]): Promise<void> {
    console.log(`Your Pokedex:`);
    for(var [name, val] of Object.entries(state.pokemons)){
        if(name){
            console.log(`  - ${name}`);
        }
    }
};

