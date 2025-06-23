import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query getCharacters($page: Int, $name: String, $status: String) {
    characters(page: $page, filter: { name: $name, status: $status }) {
      info {
        pages
      }
      results {
        id
        image
        name
        status
        gender
        species
        type
        created
        location {
          name
        }
        episode {
          name
        }
      }
    }
  }
`;
