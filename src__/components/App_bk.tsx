/** @format */
import { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { useQuery, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  // Link,
  useParams,
} from "react-router-dom";
// import { useExchange } from '../hooks/useExchange';
import "../styles/App.css";
// import Pokemon from './Pokemon';
// import Berries from './Berries';
// import Exchange from './Exchange';
// import SearchPokemon from './SearchPokemon';
// import User from './User';
const fetchPosts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // lag of 1 sec.
  return await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.data.slice(0, 10));
};
const fetchPost = async (postId) => {
  console.log("postID ", postId);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((res) => res.data);
};
const Posts = ({ setPostId }) => {
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
                queryClient?.prefetchQuery(["post", id], () => fetchPost(id));
              }}
            >
              <a onClick={() => setPostId(id)} href="#">
                {title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
const Post = ({ postId, setPostId }) => {
  // const { postId } = useParams();
  const postQuery = useQuery(
    ["post", postId],
    () => fetchPost(postId)
    // {
    // 	initialData: () =>
    // 		queryCache?.getQueryData('posts')?.find((post) => post.id === postId),
    // 	initialStale: true,
    // }
  );
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
const App = () => {
  const queryClient = new QueryClient();
  // const [show, toggle] = useReducer((d) => !d, false);
  // const [pokemon, setPokemon] = useState('');
  const [postId, setPostId] = useState(-1);
  useEffect(() => {
    queryClient?.prefetchQuery("posts", fetchPosts);
  }, []);
  return (
    <div className="App">
      {/* <button onClick={toggle}>Toggle</button> */}
      {/* {show ? <Posts /> : null} */}
      {/* <input
				type='text'
				placeholder='search by name'
				value={pokemon}
				onChange={(e) => setPokemon(e.target.value)}
				style={{ padding: '10px', margin: '10px' }}
			/>
			<br />
			<SearchPokemon pokemon={pokemon} /> */}
      {/* <Exchange />
			<Pokemon />
			<Berries /> */}
      {/* <User /> */}
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
      {/* <Router>
				<Switch>
					<Route path='/:postId'>
						<Post />
					</Route>
					<Route path='/'>
						<Posts />
					</Route>
				</Switch>
			</Router> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
};

export default App;
