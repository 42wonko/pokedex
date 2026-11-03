import { type State} from "./state.js";
import { PokeAPI } from "./pokeapi.js";
import { NotFoundError } from "./pokeapi.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    console.log(`Throwing a Pokeball at ${args[0]}...`);

    try {
        const pokemon = await state.pokeAPI.fetchPokemon(args[0]);
        const factor = 500;
        const chance = Math.random();
        if(chance < pokemon.base_experience / factor) {
            console.log(`${args[0]} escaped!`)
        } else {
            console.log(`${args[0]} was caught!`)
            state.pokemons[args[0]] =  pokemon;
        }
        
    } catch (error) {
        if(error instanceof NotFoundError){
            console.error(error.message);
        }
    }
}

