import {Cache} from "./pokecache.js"

export class NotFoundError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private static readonly locationsEndpoint = "/location-area/";
    private static readonly pokemonEndpoint = "/pokemon/";
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

        const cacheEntry = this.#cache.get<Location>(fullURL);
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

    async fetchPokemon(name: string): Promise<PokemonObj> {
        var fullURL = `${PokeAPI.baseURL}${PokeAPI.pokemonEndpoint}${name}`;

        const cacheEntry = this.#cache.get<PokemonObj>(fullURL);
        if(cacheEntry){
            return cacheEntry;
        } else {
            const response = await fetch(fullURL, {
                method: "GET",
                mode: "cors",
            });
            if(response.ok){
                const entry = await response.json();
                this.#cache.add(fullURL, entry);
                return entry;
            } else {
                throw new NotFoundError(`Pokemon ${name} not found`);
            }
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


export type PokemonObj = {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  order: number
  weight: number
  abilities: Ability[]
  past_abilities: PastAbility[]
  forms: Form[]
  game_indices: Index[]
  held_items: any[]
  location_area_encounters: string
  moves: Mfe[]
  species: Species
  sprites: Sprites
  cries: Cries
  stats: Stat[]
  past_stats: PastStat[]
  types: Type[]
  past_types: any[]
};

export interface Ability {
  is_hidden: boolean
  slot: number
  ability: Ability2
}

export interface Ability2 {
  name: string
  url: string
}

export interface PastAbility {
  generation: Generation
  abilities: Ability3[]
}

export interface Generation {
  name: string
  url: string
}

export interface Ability3 {
  is_hidden: boolean
  slot: number
  ability: any
}

export interface Form {
  name: string
  url: string
}

export interface Index {
  game_index: number
  version: Version
}

export interface Version {
  name: string
  url: string
}

export interface Mfe {
  move: Move
  version_group_details: VersionGroupDetail[]
}

export interface Move {
  name: string
  url: string
}

export interface VersionGroupDetail {
  level_learned_at: number
  version_group: VersionGroup
  move_learn_method: MoveLearnMethod
  order?: number
}

export interface VersionGroup {
  name: string
  url: string
}

export interface MoveLearnMethod {
  name: string
  url: string
}

export interface Species {
  name: string
  url: string
}

export interface Sprites {
  other: Other
  versions: Versions2
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface Other {
  home: Home
  showdown: Showdown
  dream_world: DreamWorld
  "official-artwork": OfficialArtwork
}

export interface Home {
  front_shiny: string
  front_female: any
  front_default: string
  front_shiny_female: any
}

export interface Showdown {
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface DreamWorld {
  front_female: any
  front_default: string
}

export interface OfficialArtwork {
  versions: Versions
  front_shiny: string
  front_default: string
}

export interface Versions {
  "generation-i": GenerationI
  "generation-ii": GenerationIi
}

export interface GenerationI {
  "red-and-blue": RedAndBlue
  "red-and-green": RedAndGreen
}

export interface RedAndBlue {
  front_default: string
}

export interface RedAndGreen {
  front_default: string
}

export interface GenerationIi {
  "gold-and-silver": GoldAndSilver
}

export interface GoldAndSilver {
  front_default: any
}

export interface Versions2 {
  "generation-i": GenerationI2
  "generation-v": GenerationV
  "generation-ii": GenerationIi2
  "generation-iv": GenerationIv
  "generation-ix": GenerationIx
  "generation-vi": GenerationVi
  "generation-iii": GenerationIii
  "generation-vii": GenerationVii
  "generation-viii": GenerationViii
}

export interface GenerationI2 {
  yellow: Yellow
  "red-blue": RedBlue
  "red-green-japan": RedGreenJapan
}

export interface Yellow {
  back_gbc: string
  back_gray: string
  front_gbc: string
  front_gray: string
  back_default: string
  front_default: string
  back_transparent: string
  front_transparent: string
  back_transparent_gray: string
  front_transparent_gray: string
}

export interface RedBlue {
  back_gray: string
  front_gray: string
  back_default: string
  front_default: string
  back_transparent: string
  front_transparent: string
  back_transparent_gray: string
  front_transparent_gray: string
}

export interface RedGreenJapan {
  back_gray: string
  front_gray: string
  back_default: string
  front_default: string
}

export interface GenerationV {
  icons: Icons
  "black-white": BlackWhite
}

export interface Icons {
  animated: Animated
  front_default: string
}

export interface Animated {
  front_default: string
}

export interface BlackWhite {
  animated: Animated2
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface Animated2 {
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface GenerationIi2 {
  gold: Gold
  silver: Silver
  crystal: Crystal
}

export interface Gold {
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
  back_transparent: string
  front_transparent: string
  back_shiny_transparent: string
  front_shiny_transparent: string
}

export interface Silver {
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
  back_transparent: string
  front_transparent: string
  back_shiny_transparent: string
  front_shiny_transparent: string
}

export interface Crystal {
  animated: Animated3
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
  back_transparent: string
  front_transparent: string
  back_shiny_transparent: string
  front_shiny_transparent: string
}

export interface Animated3 {
  front_shiny: string
  front_default: string
}

export interface GenerationIv {
  icons: Icons2
  platinum: Platinum
  "diamond-pearl": DiamondPearl
  "heartgold-soulsilver": HeartgoldSoulsilver
}

export interface Icons2 {
  front_default: string
}

export interface Platinum {
  animated: Animated4
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface Animated4 {
  front_shiny: string
  front_female: any
  front_default: string
  front_shiny_female: any
}

export interface DiamondPearl {
  animated: Animated5
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface Animated5 {
  front_shiny: string
  front_female: any
  front_default: string
  front_shiny_female: any
}

export interface HeartgoldSoulsilver {
  animated: Animated6
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface Animated6 {
  front_shiny: string
  front_female: any
  front_default: string
  front_shiny_female: any
}

export interface GenerationIx {
  champions: Champions
  "legends-za": LegendsZa
  "scarlet-violet": ScarletViolet
}

export interface Champions {
  icons: Icons3
  back_shiny: any
  back_female: any
  front_shiny: any
  back_default: any
  front_female: any
  front_default: any
  back_shiny_female: any
  front_shiny_female: any
}

export interface Icons3 {
  front_shiny: any
  front_default: any
}

export interface LegendsZa {
  icons: Icons4
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface Icons4 {
  front_shiny: string
  front_female: any
  front_default: string
  front_shiny_female: any
}

export interface ScarletViolet {
  icons: Icons5
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface Icons5 {
  front_female: any
  front_default: string
}

export interface GenerationVi {
  "x-y": XY
  icons: Icons6
  "omega-ruby-alpha-sapphire": OmegaRubyAlphaSapphire
}

export interface XY {
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface Icons6 {
  front_female: any
  front_default: string
}

export interface OmegaRubyAlphaSapphire {
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface GenerationIii {
  icons: Icons7
  emerald: Emerald
  "ruby-sapphire": RubySapphire
  "firered-leafgreen": FireredLeafgreen
}

export interface Icons7 {
  front_default: string
}

export interface Emerald {
  animated: Animated7
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
}

export interface Animated7 {
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
}

export interface RubySapphire {
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
}

export interface FireredLeafgreen {
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
}

export interface GenerationVii {
  icons: Icons8
  "ultra-sun-ultra-moon": UltraSunUltraMoon
  "lets-go-pikachu-lets-go-eevee": LetsGoPikachuLetsGoEevee
}

export interface Icons8 {
  front_female: any
  front_default: string
}

export interface UltraSunUltraMoon {
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface LetsGoPikachuLetsGoEevee {
  icons: Icons9
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface Icons9 {
  front_default: string
}

export interface GenerationViii {
  "sword-shield": SwordShield
  "legends-arceus": LegendsArceus
  "brilliant-diamond-shining-pearl": BrilliantDiamondShiningPearl
}

export interface SwordShield {
  icons: Icons10
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface Icons10 {
  front_female: any
  front_default: string
}

export interface LegendsArceus {
  icons: Icons11
  back_shiny: any
  back_female: any
  front_shiny: any
  back_default: any
  front_female: any
  front_default: any
  back_shiny_female: any
  front_shiny_female: any
}

export interface Icons11 {
  front_shiny: any
  front_female: any
  front_default: any
  front_shiny_female: any
}

export interface BrilliantDiamondShiningPearl {
  icons: Icons12
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface Icons12 {
  front_default: string
}

export interface Cries {
  latest: string
  legacy: string
}

export interface Stat {
  base_stat: number
  effort: number
  stat: Stat2
}

export interface Stat2 {
  name: string
  url: string
}

export interface PastStat {
  generation: Generation2
  stats: Stat3[]
}

export interface Generation2 {
  name: string
  url: string
}

export interface Stat3 {
  base_stat: number
  effort: number
  stat: Stat4
}

export interface Stat4 {
  name: string
  url: string
}

export interface Type {
  slot: number
  type: Type2
}

export interface Type2 {
  name: string
  url: string
}

