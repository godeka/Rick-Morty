import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query getCharacters($page: Int) {
    characters(page: $page) {
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
      }
    }
  }
`;
