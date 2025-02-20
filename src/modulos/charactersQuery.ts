import { gql } from "@apollo/client";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
      }
      results {
        id
        name
        status
        species
        location {
          name
        }
        image
      }
    }
  }
`;

export { GET_CHARACTERS };
