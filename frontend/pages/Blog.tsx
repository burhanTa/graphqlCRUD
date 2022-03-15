import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { IUser, IBlog } from "../../src/types/IUsers";
import { Link } from "react-router-dom";
import {
  ADD_BLOG,
  GET_BLOGS,
  DELETE_BLOG
} from "../apollo/gql/User";
import Swal from "sweetalert2";
import style from "../css/blog.module.css";
import { Modal } from "../components/Modal";
import { EditIcon } from "../icons/EditIcon";
import { TrashIcon } from "../icons/TrashIcon";

const Blog = () => {
  const [modal, setModal] = React.useState(false);
  const [name, setName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [id, setId] = React.useState<string | undefined>(undefined);
  // queries
  const blogList = useQuery<{
    blogs: { docs: IBlog[]; count: number };
  }>(GET_BLOGS, {
    variables: { take: 10, skip: 0 },
  });
  //mutations
  const [deleteBlog] = useMutation(DELETE_BLOG);
  const [addBlog] = useMutation(ADD_BLOG, {
    variables: {
      input: {
        name,
        _id: id,
        description,
        title,
      },
    },
  });
  React.useEffect(() => {
    if (!modal) {
      setName("");
      setDescription("");
      setTitle("");
      setId(undefined);
    } else if (id) {
      const blog = blogList.data?.blogs.docs.find((item) => item._id == id)!;
      setName(blog.name);
      setDescription(blog.description);
      setTitle(blog.title);
    }
  }, [modal]);

  // Functions
  const addBlogData = async () => {
    try {
      await addBlog();
      setModal(false);
      Swal.fire("Blog Created!", undefined, "success");
      blogList.refetch();
    } catch (error) {
      Swal.fire("Blog Creation Failed!", undefined, "error");
    }
  };
  const deleteBlogData = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBlog({
          variables: {
            input: id,
          },
        });
        blogList.refetch();
        Swal.fire("Deleted!", "Blog has been deleted.", "success");
      }
    });
  };


  return (
    <>
      <h1>Blog page</h1>
      <div className={style.btnposition}>
        <button onClick={() => setModal(!modal)} className="btn">
          {" "}
          Add Blog{" "}
        </button>
      </div>
      <div className={style.flex}>
        {blogList.loading ? (
          <p> loading... </p>
        ) : (
          blogList.data?.blogs.docs.map((item) => (
            <Link to={`/BlogDetail/${item._id}`}>  
            <div className={style.cardblog}>
              <div className={style.cardheader}>
                <img
                  src="https://images.unsplash.com/photo-1646974005583-01e9a7b0b5f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80"
                  alt="blog image"
                />
              </div>
              <div className={style.cardcontent}>
                <span
                  onClick={() => deleteBlogData(item._id!)}
                  className="trash"
                >
                   Delete
                </span>
                <span
                  onClick={() => {
                    setId(item._id), setModal(true);
                  }}
                  className="edit"
                >
                  Edit
                </span>
                <span>Technology</span>
                <h3>{item.title}</h3>
                <p> {item.description} </p>
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
            </Link>
          ))
        )}
      </div>

      <Modal onClose={() => setModal(false)} state={modal}>
        <div className="form-group">
          <label>
            <span className="title-input"> Name: </span>
            <input
              value={name}
              onInput={(e) => setName(e.currentTarget.value)}
              type="text"
            />
          </label>
          <label>
            <span className="title-input"> Title: </span>
            <input
              value={title}
              onInput={(e) => setTitle(e.currentTarget.value)}
              type="text"
            />
          </label>

          <label>
            <span className="title-input"> Description: </span>
            <input
              value={description}
              onInput={(e) => setDescription(e.currentTarget.value)}
              type="text"
            />
          </label>
        </div>
        <button onClick={addBlogData} className="btn w-full">
          Save
        </button>
      </Modal>
    </>
  );
};
export default Blog;
