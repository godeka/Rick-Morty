import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query getEpisodes($page: Int, $name: String) {
    episodes(page: $page, filter: { name: $name }) {
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
