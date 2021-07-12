// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Query {
    me: User  
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: savedBook!): User
    removeBook(bookId: ID!): User
}

User type {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

Book type {
    _id: ID!
    bookId: String
    authors: [String]
    # authors: String
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}
`;



// export the typeDefs
module.exports = typeDefs;
