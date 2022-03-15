import { gql } from '@apollo/client';
export const GET_USERS=gql`
query Users($take: Int, $skip: Int) {
  users {
    count
    docs(take: $take,skip: $skip) {
      email,
      name,
      _id,
      type
    }
  }
}
`
export const GET_BLOGS=gql`
query Blogs($take: Int, $skip: Int) {
  blogs {
    count
    docs(take: $take,skip: $skip) {
      title,
      name,
      _id,
      description
    }
  }
}
`


export const ADD_USER=gql`
mutation UpsertUser($input: UserInput){
  user(input: $input) {
    name,
    _id,
    email,
    type
  }
}
`

export const DELETE_USER=gql`
mutation DeleteUser($input: String!){
  deleteUser(input: $input) {
    name,
    _id,
    email,
    type
  }
}
`

export const ADD_BLOG=gql`
mutation UpsertBlog($input: BlogInput){
  blog(input: $input) {
    name,
    _id,
    description,
    title
  }
}`

export const DELETE_BLOG=gql`
mutation DeleteBlog($input: String!){
  deleteBlog(input: $input) {
    name,
    _id,
    description,
    title
  }
}`


export const GET_SINGLE_BLOGS=gql`
query ($id: String!) {
  blogdetail(_id: $id) {
    name,
    _id,
    title,
    description
  }
}
`
