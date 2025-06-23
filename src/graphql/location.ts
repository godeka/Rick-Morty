import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query getLocations($page: Int, $name: String) {
    locations(page: $page, filter: { name: $name }) {
      info {
        pages
      }
      results {
        id
        name
        type
        dimension
        residents {
          id
        }
        created
      }
    }
  }
`;
