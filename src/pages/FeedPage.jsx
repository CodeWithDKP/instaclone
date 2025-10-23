
import PostForm from "../components/PostForm";
import PostFeed from "../components/PostFeed";

export default function FeedPage() {
  return (
    <>
      <div className="mt-3">
        <PostForm />
      </div>
      <PostFeed />
    </>
  );
}
