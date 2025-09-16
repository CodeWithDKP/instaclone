import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export default function usePosts() {
  return useContext(PostContext);
}
