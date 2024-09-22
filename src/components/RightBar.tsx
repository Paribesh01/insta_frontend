import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface SuggestedUser {
  username: string;
  avatar: string;
  reason: string;
}

function SuggestedUserItem({ user }: { user: SuggestedUser }) {
  return (
    <div className="flex items-center justify-between mb-4">
      {" "}
      {/* Increased margin bottom */}
      <div className="flex items-center">
        <Avatar className="h-12 w-12 mr-4">
          {" "}
          {/* Increased size */}
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold">{user.username}</p>{" "}
          {/* Increased text size */}
          <p className="text-sm text-gray-500">{user.reason}</p>
        </div>
      </div>
      <Button variant="link" className="text-sm font-semibold text-blue-500">
        {" "}
        {/* Increased text size */}
        Follow
      </Button>
    </div>
  );
}

export default function RightBar() {
  const currentUser = {
    username: "johndoe",
    avatar: "/placeholder.svg?height=56&width=56",
    fullName: "John Doe",
  };

  const suggestedUsers: SuggestedUser[] = [
    {
      username: "janedoe",
      avatar: "/placeholder.svg?height=32&width=32",
      reason: "New to Instagram",
    },
    {
      username: "mike_smith",
      avatar: "/placeholder.svg?height=32&width=32",
      reason: "Followed by user123",
    },
    {
      username: "emily_white",
      avatar: "/placeholder.svg?height=32&width=32",
      reason: "Suggested for you",
    },
    {
      username: "alex_brown",
      avatar: "/placeholder.svg?height=32&width=32",
      reason: "Followed by user456",
    },
    {
      username: "sarah_green",
      avatar: "/placeholder.svg?height=32&width=32",
      reason: "New to Instagram",
    },
  ];

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[400px] p-6">
      {" "}
      {/* Increased padding and width */}
      <div className="flex items-center justify-between mb-8">
        {" "}
        {/* Increased margin bottom */}
        <div className="flex items-center">
          <Avatar className="h-16 w-16 mr-6">
            {" "}
            {/* Increased size */}
            <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
            <AvatarFallback>
              {currentUser.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{currentUser.username}</p>{" "}
            {/* Increased text size */}
            <p className="text-sm text-gray-500">{currentUser.fullName}</p>
          </div>
        </div>
        <Button variant="link" className="text-lg font-semibold text-blue-500">
          {" "}
          {/* Increased text size */}
          Switch
        </Button>
      </div>
      <div className="mb-6">
        {" "}
        {/* Increased margin bottom */}
        <div className="flex justify-between items-center mb-4">
          {" "}
          {/* Increased margin bottom */}
          <span className="text-lg font-semibold text-gray-500">
            {" "}
            {/* Increased text size */}
            Suggestions For You
          </span>
          <Button variant="link" className="text-sm font-semibold">
            {" "}
            {/* Increased text size */}
            See All
          </Button>
        </div>
        {suggestedUsers.map((user) => (
          <SuggestedUserItem key={user.username} user={user} />
        ))}
      </div>
      <div className="text-sm text-gray-400">
        {" "}
        {/* Increased text size */}
        <p className="mb-6">
          About &bull; Help &bull; Press &bull; API &bull; Jobs &bull; Privacy
          &bull; Terms &bull; Locations &bull; Language
        </p>
        <p>&copy; 2023 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
}
