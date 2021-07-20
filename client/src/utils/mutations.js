import { gql } from '@apollo/client';


//LOGIN_USER
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const SAVE_BOOK = gql`
  mutation saveBook(
      $bookId: String!,
      $authors: [String],
      $description: String!,
      $title: String!,
      $image: String,
      $link: String
    ) 
    {
    saveBook(bookId: $bookId,description: $descrtiption, authors :$authors, title: $title, link: $link, image: $image ) {
      _id
      username
     
      }
    }
  
`;


export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
   
      username
    
      savedBooks {
      
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
