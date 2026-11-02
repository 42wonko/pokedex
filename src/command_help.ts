import { type State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    for (const command in state.registry){
        console.log(`${command}: ${state.registry[command].description}`);
    }
};

