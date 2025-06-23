import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query getLocations($page: Int) {
    locations(page: $page) {
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
