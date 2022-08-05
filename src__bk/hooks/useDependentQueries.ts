/** @format */

import { useQuery } from "@tanstack/react-query";
import { existingUser } from "./data/existingUser";
export const useDependentQueries = () => {
  const fetchUsers = async () => {
    const Selectedemail = "Nathan@yesenia.net";
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?email=${Selectedemail}`
    );
    const data = await response.json();
    return data[0];
  };
  const queryInfo = useQuery(["user"], fetchUsers, {
    initialData: existingUser,
  });
  const fetchPosts = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${queryInfo.data.id}`
    );
    const data = await response.json();
    return data;
  };
  const queryPostInfo = useQuery(["posts"], fetchPosts, {
    enabled: !!queryInfo.data?.id,
  });
  return {
    queryInfo,
    queryPostInfo,
  };
};
