import { ObjectId } from "mongoose";
import { MBlog } from "./../models/MBlog.js";
import graphqlFields from "graphql-fields";
import { IBlog, IUser } from "../types/IUsers.js";
import pkg from "mongoose";
const { mongo } = pkg;

/**
 * get Userss
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */


/**
 * @description Adds User
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */

 export const getBlogs = async (_: any, data: any, body: any, select: any) => {
    let promises: Promise<any>[] = [];
    let take = select.variableValues?.take ?? 10;
    let skip = select.variableValues?.skip ?? 0;
  
    const fieldList = graphqlFields(select);
    const keys = Object.keys(fieldList.docs ?? {});
    if (keys.length)
      promises.push(
        MBlog.find({}, keys.join(" "), { limit: take, skip }).lean().exec()
      );
  
    if (fieldList.count) {
      promises.push(MBlog.countDocuments().lean().exec());
    }
  
    const [blog, count] = await Promise.all(promises);
    return { docs: blog, count: count ? count : blog };
  };

export const upsertBlog = async (
  _: any,
  data: { input: IBlog },
  body: any,
  select: any
) => {
  const blogData = data.input;
  const _id: any = data.input._id ?? new mongo.ObjectId();
  delete blogData._id;
  console.log(blogData, _id);
  const blog = await MBlog.findOneAndUpdate(
    { _id: _id },
    { $set: blogData },
    { upsert: true, new: true }
  );
  return blog;
};
export const deleteBlog = async (
    _: any,
    data: { input: number },
    body: any,
    select: any
  ) => {
    const fieldList = graphqlFields(select);
    const keys = Object.keys(fieldList);
    const blog = await MBlog.findOneAndDelete(
      { _id: data.input },
      { projection: keys.join(" ") }
    );
    return blog;
  };
  
/**
 * @description
 */


/**
 * get Userss
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */
export const getBlog = async (_: any, data: any, body: any, select: any) => {
  let id = select.variableValues.id;
  const fieldList = graphqlFields(select);
  const keys = Object.keys(fieldList);
  const blog = await MBlog.findById(id, keys.join(" "));
  return blog;
};

export const getBlogDetail = async (_: any, data: any, body: any, select: any) => {
  let id = select.variableValues.id;
  const fieldList = graphqlFields(select);
  const keys = Object.keys(fieldList);
  const blog = await MBlog.findById(id, keys.join(" "));
  return blog;
};
