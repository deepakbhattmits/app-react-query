/** @format */
import { FC, useState } from "react";
import axios from "axios";
import { useQuery, QueryClient } from "react-query";
import "../styles/App.css";
const fetchPosts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // lag of 1 sec.
  return await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.data.slice(0, 10));
};
interface IProp {
  [props: string]: any;
}
const Posts: FC<IProp> = ({ setPostId }): JSX.Element => {
  const queryClient = new QueryClient();
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
                queryClient?.prefetchQuery(["post", id], () => fetchPost(id), {
                  staleTime: Infinity,
                });
              }}
            >
              {/* <img
                className="content___wrapper--img"
                src={require(`${picture}`)}
                alt={title}
              /> */}
              <span onClick={() => setPostId(id)}>{title}</span>
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
    </div>
  );
};

export default App;
