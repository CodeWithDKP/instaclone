export function sampleInitialPosts() {
  return [
    {
      id: "p1",
      author: { id: "u2", name: "Anita", avatar: "https://i.pravatar.cc/150?img=5" },
      text: "Welcome to the demo feed. Create posts using the form below.",
      image: null,
      likes: [],
      comments: [],
      createdAt: Date.now() - 1000 * 60 * 60
    },
    {
      id: "p2",
      author: { id: "u3", name: "Rahul", avatar: "https://i.pravatar.cc/150?img=7" },
      text: "Here's a sample post with an image.",
      image: "https://picsum.photos/600/400",
      likes: [],
      comments: [],
      createdAt: Date.now() - 1000 * 60 * 30
    }
  ];
}
