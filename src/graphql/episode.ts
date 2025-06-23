import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query getEpisodes($page: Int) {
    episodes(page: $page) {
      info {
        pages
      }
      results {
        id
        name
        air_date
        episode
        characters {
          id
        }
        created
      }
    }
  }
`;
