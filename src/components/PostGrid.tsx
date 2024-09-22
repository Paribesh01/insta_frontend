export default function PostGrid({ posts }: { posts: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post, index) => (
        <div key={index} className="aspect-square">
          <img
            src={post}
            alt={`Post ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
