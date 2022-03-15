import {
  upsertUser,
  deleteUser,
  getUser,
  getUsers,
} from "./../controller/userController.js";

import {upsertBlog , getBlogs , getBlog , deleteBlog , getBlogDetail} from "./../controller/blogController.js";


export const resolver = {
  Query: {
    users: getUsers,
    user: getUser,
    blogs: getBlogs,
    blog: getBlog,
    blogdetail: getBlogDetail
    // addUser
  },
  Mutation: {
    user: upsertUser,
    deleteUser: deleteUser,
    blog: upsertBlog,
    deleteBlog: deleteBlog,
  },
};
