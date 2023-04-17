/** @format */
import { FC, useState } from "react";
import axios from "axios";
import { useQuery, QueryClient } from "@tanstack/react-query";
const fetchPosts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // lag of 1 sec.
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data?.slice(0, 10);
};
interface IProp {
  [props: string]: any;
}
const Posts: FC<IProp> = ({ setPostId }): JSX.Element => {
  const queryClient = new QueryClient();
  const postsQuery = useQuery(["posts"], fetchPosts);
  return (
    <>
      <h1>Posts {postsQuery.isFetching ? "...." : null}</h1>

      {postsQuery.isLoading ? (
        "Loading..."
      ) : (
        <ul className="list__wrapper">
          {postsQuery.data?.map(({ id, title }) => (
            <li
              className="list__wrapper--item"
              key={id}
              onMouseEnter={() => {
                console.log("hovered", id);
                queryClient?.prefetchQuery(["post", id], () => fetchPost(id), {
                  staleTime: Infinity,
                });
              }}
              onClick={() => setPostId(id)}
              onKeyPress={() => setPostId(id)}
            >
              {/* <img
                className="content___wrapper--img"
                src={require(`${picture}`)}
                alt={title}
              /> */}
              <span>{title}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
const fetchPost = async (postId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  return data;
};
const Post = ({ postId, setPostId }) => {
  const postQuery = useQuery(["post", postId], () => fetchPost(postId), {
    staleTime: 60 * 1000,
  });
  return (
    <div className="post__wrapper">
      <button className="post__wrapper--btn btn" onClick={() => setPostId(-1)}>
        Back
      </button>
      <strong className="post__wrapper--header">Description</strong>
      <span className="post__wrapper--body">
        {postQuery.isLoading ? "Loading..." : <>{postQuery.data.body}</>}
      </span>
      {postQuery.isFetching ? "Updating..." : null}
    </div>
  );
};
const App: FC = (): JSX.Element => {
  const [postId, setPostId] = useState<number>(-1);
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
