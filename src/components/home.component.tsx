import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");
// Define the type for a single post
interface Post {
  id: number;
  post_title: string;
  post_body: string;
}

const Home = () => {
  const navigate = useNavigate();
  if (token == null) {
    // navigate("/sign-in");
  }
  const [posts, setPosts] = useState<Post[]>([]); // Specify the type as an array of Post
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "http://127.0.0.1:8000/api/all_post",
          {
            // Specify the response type as Post[]
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
                  <h5 className="card-title">{post.post_title}</h5>
                  <p className="card-text">{post.post_body}</p>
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
