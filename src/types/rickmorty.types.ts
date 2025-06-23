export interface CharacterInfo {
  id: number;
  image: string;
  name: string;
  status: string;
  gender: string;
  species: string;
  type: string;
  created: string;
  location: Pick<LocationInfo, "name">;
  episode: Pick<EpisodeInfo, "name">[];
}

export interface LocationInfo {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Pick<CharacterInfo, "id">[];
  created: string;
}

export interface EpisodeInfo {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Pick<CharacterInfo, "id">[];
  created: string;
}
