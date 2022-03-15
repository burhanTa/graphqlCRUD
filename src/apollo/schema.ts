import { gql } from "apollo-server";

const UserFragemnt = `
_id: String
name: String
email: String
type: Int
`;
const BlogFragemnt = `
_id: String
name: String
description: String
title: String
`;
export const TypeDef = gql`
  type User {
    ${UserFragemnt}
  }
  
  input UserInput {
    ${UserFragemnt}
    password: String
  }
  
  type UserResponse {
    docs(take: Int, skip: Int): [User]
    count: Int
  }

  type Query {
    users: UserResponse
    user(_id: String!): User
  }

  type Blog {
    ${BlogFragemnt}
  }
  input BlogInput {
    ${BlogFragemnt}
  }
  type BlogResponse {
    docs(take: Int, skip: Int): [Blog]
    count: Int
  }
  type Query {
     blogs: BlogResponse
     blog(_id: String!): Blog
  }
  type Query {
    blogdetail(_id: String!): Blog
 }

  type Mutation {
    user(input: UserInput): User
    deleteUser(input: String!): User
    blog(input: BlogInput): Blog
    deleteBlog(input: String!): Blog

  }
`;
