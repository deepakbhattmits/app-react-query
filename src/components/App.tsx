/** @format */
import { FC, useState } from "react";
import axios from "axios";
import { useQuery, queryCache } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import "../styles/App.css";
const fetchPosts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // lag of 1 sec.
  return await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.data.slice(0, 10));
};
const Posts = ({ setPostId }) => {
  const postsQuery = useQuery("posts", fetchPosts);
  return (
    <>
      <h1>Posts {postsQuery.isFetching ? "...." : null}</h1>

      {postsQuery.isLoading ? (
        "Loading..."
      ) : (
        <ul>
          {postsQuery.data?.map(({ id, title }) => (
            <li
              key={id}
              onMouseEnter={() => {
                console.log("hovered", id);
                queryCache?.prefetchQuery(["post", id], () => fetchPost(id), {
                  staleTime: Infinity,
                });
              }}
            >
              {/* <img
                className="content___wrapper--img"
                src={require(`${picture}`)}
                alt={title}
              /> */}
              <a
                onClick={() => setPostId(id)}
                href="#"
                rel="noreferrer noopener"
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
const fetchPost = async (postId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((res) => res.data);
};
const Post = ({ postId, setPostId }) => {
  const postQuery = useQuery(["post", postId], () => fetchPost(postId), {
    staleTime: 60 * 1000,
  });
  return (
    <>
      <button onClick={() => setPostId(-1)}>Back</button>
      <br />
      <span>
        {postQuery.isLoading ? (
          "Loading..."
        ) : (
          <span>{postQuery.data.title}</span>
        )}
      </span>
      <br />
      {postQuery.isFetching ? "Updating..." : null}
    </>
  );
};
const App: FC = (): JSX.Element => {
  const [postId, setPostId] = useState(-1);
  return (
    <div className="App">
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}

      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};

export default App;
