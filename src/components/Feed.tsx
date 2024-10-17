import useFeed from "@/hooks/useFeed"; // Hook to fetch feed data
import { useEffect, useState } from "react";
import InstaFeed from "./FeedBox";

export const Feed = () => {
  const [feed, setFeed] = useState<any[]>([]); // State to hold the feed data
  const { fetchFeed } = useFeed(); // Hook to fetch feed data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feeds = await fetchFeed(); // Ensure the feed is fetched asynchronously
        setFeed(feeds); // Set the feed data in the state
      } catch (error) {
        console.error("Error fetching feed:", error); // Handle any fetch errors
      }
    };

    fetchData(); // Call fetchData function
  }, []); // Empty dependency array to avoid infinite loops

  return (
    <div className="max-w-md mx-auto space-y-4 p-4">
      {feed.length > 0 ? (
        feed.map((post: any) => (
          <InstaFeed key={post.id} postId={post.id} /> // Render each post using the InstaFeed template
        ))
      ) : (
        <p>Loading feed...</p> // Fallback when no feed is available
      )}
    </div>
  );
};
