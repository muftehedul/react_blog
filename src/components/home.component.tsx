import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const token = localStorage.getItem("token");

interface Post {
  id: number;
  post_title: string;
  post_body: string;
}

const Home = () => {
  const navigate = useNavigate();
  if (token == null) {
    navigate("/sign-in");
  }
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editedPost, setEditedPost] = useState<Post>({
    id: 0,
    post_title: "",
    post_body: "",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "http://127.0.0.1:8000/api/all_post",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (post: Post) => {
    setEditingPostId(post.id);
    setEditedPost(post);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const put_response = await axios.put(
        `http://127.0.0.1:8000/api/post/${editedPost.id}`,
        editedPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (put_response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Post updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // Refresh posts after edit
      const response = await axios.get<Post[]>(
        "http://127.0.0.1:8000/api/all_post",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(response.data);
      setEditingPostId(null);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const handleDelete = async (postId: number) => {
    try {
      const delete_response = await axios.delete(
        `http://127.0.0.1:8000/api/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (delete_response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Post deleted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        // Refresh posts after delete
        const response = await axios.get<Post[]>(
          "http://127.0.0.1:8000/api/all_post",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <h3>Welcome To Home Page</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-6" key={post.id}>
              <div className="card mb-4">
                <div className="card-body">
                  {editingPostId === post.id ? (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Title"
                          name="post_title"
                          value={editedPost.post_title}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          placeholder="Body"
                          name="post_body"
                          value={editedPost.post_body}
                          onChange={handleInputChange}
                          rows={editedPost.post_body.split(" ").length / 10} // Adjust the number of rows dynamically
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary mr-2">
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setEditingPostId(null)}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <h5 className="card-title">{post.post_title}</h5>
                      <p className="card-text">{post.post_body}</p>
                      <button
                        type="button"
                        className="btn btn-primary mr-2"
                        onClick={() => handleEdit(post)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
