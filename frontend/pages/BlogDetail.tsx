import React, { useEffect, useState } from "react";
import style from "../css/blogdetail.module.css";
import { useParams } from "react-router-dom";
import {GET_SINGLE_BLOGS} from "../apollo/gql/User";
import { useMutation, useQuery } from "@apollo/client";
import { IBlog } from "../../src/types/IUsers";

const BlogDetails = () => {
    const {slug} = useParams();
    const blogList = useQuery<{
        blogdetail: IBlog
        }>(GET_SINGLE_BLOGS, {
        variables: { id: slug },
    }); 
     
  return (
    <>
     <h1>Blog Detail page</h1>
        <div className={style.cardblogdetail}>
          <div className={style.cardheader}>
            <img
              src="https://images.unsplash.com/photo-1646974005583-01e9a7b0b5f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80"
              alt="blog image"
            />
          </div>
          <div className={style.cardcontent}>
            <span>Technology</span>
                <h3> { blogList?.data?.blogdetail?.title} </h3>
            <p>
                 {blogList?.data?.blogdetail?.description}
            </p>
          </div>
          <div className={style.cardfooter}>
            <img
              src="https://images.unsplash.com/photo-1646904175176-b659431e2935?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=410&q=80"
              alt="user image"
            />
            <div className={style.author}>
              <p>John Doe</p>
              <small>2h ago</small>
            </div>
          </div>
        </div>
    </>
  );
};

export default BlogDetails;
