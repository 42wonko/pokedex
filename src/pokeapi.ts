import {Cache} from "./pokecache.js"

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private static readonly locationsEndpoint = "/location-area/";
    #cache: Cache;

    constructor(interval: number) {
        this.#cache = new Cache(interval);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        var fullURL = "";
        if ((typeof pageURL === "undefined") || (pageURL === "")) {
            fullURL = `${PokeAPI.baseURL}${PokeAPI.locationsEndpoint}`;
        } else {
            fullURL =  `${pageURL}`;
        }

        const cacheEntry = this.#cache.get<ShallowLocations>(fullURL);
        if(cacheEntry){
            return cacheEntry;
        } else {
            const response = await fetch(fullURL, {
                method: "GET",
                mode: "cors",
            });
            const entry = response.json();
            this.#cache.add(fullURL, entry);
            return entry;
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        var fullURL = `${PokeAPI.baseURL}${PokeAPI.locationsEndpoint}${locationName}`;

//        console.log(`-D- Exploring ${fullURL}`);
        const cacheEntry = this.#cache.get<Location>(fullURL);
        if(cacheEntry){
//            console.log(`-D- Cache hit: ${fullURL}`);
            return cacheEntry;
        } else {
//            console.log(`-D- Cache miss: ${fullURL}. sending request ...`);
            const response = await fetch(fullURL, {
                method: "GET",
                mode: "cors",
            });
            const entry = response.json();
            this.#cache.add(fullURL, entry);
            return entry;
        }
    }
}

export interface Result {
    name: string
    url: string
}

export type ShallowLocations = {
    count: number
    next: string | null
    previous: string | null
    results: Result[] | null
};

export interface EncounterMethodRate {
  encounter_method: EncounterMethod
  version_details: VersionDetail[]
}

export interface EncounterMethod {
name: string
  url: string
}

export interface VersionDetail {
  rate: number
  version: Version
}

export interface Version {
  name: string
  url: string
}

export interface Location_Light {
  name: string
  url: string
}

export interface Name {
  name: string
  language: Language
}

export interface Language {
  name: string
  url: string
}

export interface PokemonEncounter {
  pokemon: Pokemon
  version_details: VersionDetail2[]
}

export interface Pokemon {
  name: string
  url: string
}

export interface VersionDetail2 {
  version: Version2
  max_chance: number
  encounter_details: EncounterDetail[]
}

export interface Version2 {
  name: string
  url: string
}

export interface EncounterDetail {
  min_level: number
  max_level: number
  chance: number
  method: Method
  condition_values: ConditionValue[]
  pokemon_details: any
}

export interface Method {
  name: string
  url: string
}

export interface ConditionValue {
  name: string
  url: string
}

export type Location = {
    id: number
    name: string
    game_index: number
    encounter_method_rates: EncounterMethodRate[]
    location: Location_Light
    names: Name[]
    pokemon_encounters: PokemonEncounter[]
};

