import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface CreatePostFormData {
  post_title: string;
  post_body: string;
}

const CreatePost = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostBody(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: CreatePostFormData = {
      post_title: postTitle,
      post_body: postBody,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create_post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Post created successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      console.error("Error creating post:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error creating post. Please try again.",
      });
    }
  };

  return (
    <div className="create-post-container">
      <br />
      <br />
      <br />
      <div className="row justify-content-center">
        <h2 className="col-md-8">Create a New Post</h2>
        <form className="col-md-8" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="postTitle" className="form-label">
              Post Title
            </label>
            <input
              type="text"
              className="form-control"
              id="postTitle"
              value={postTitle}
              onChange={handleTitleChange}
              required // Added required attribute
            />
          </div>
          <div className="mb-3">
            <label htmlFor="postBody" className="form-label">
              Post Body
            </label>
            <textarea
              className="form-control"
              id="postBody"
              rows={postBody.split(" ").length / 20} // Adjust the number of rows dynamically
              value={postBody}
              onChange={handleBodyChange}
              required // Added required attribute
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
