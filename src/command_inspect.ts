import { type State} from "./state.js";
import { PokeAPI } from "./pokeapi.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    const pokemon = state.pokemons[args[0]];
    if(pokemon){
        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Weight: ${pokemon.weight}`);
        console.log("Stats:");
        for(var stat of pokemon.stats){
            console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
        }
        console.log("Types:");
        for(var type of pokemon.types){
            console.log(`  - ${type.type.name}`);
        }

    } else {
        console.log("you have not caught that pokemon");
    }
};

