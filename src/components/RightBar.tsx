import { currentUser } from "@/Recoil/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export default function RightBar() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(currentUser);

  // Function to navigate to the user's profile
  const goToProfile = () => {
    navigate("/profile"); // Adjust the route as necessary
  };

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[400px] p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Avatar className="h-16 w-16 mr-6">
            <button onClick={goToProfile}>
              <AvatarImage src={user.userPreferences.imageUrl} alt={user.username} />
              <AvatarFallback>
                {user.username.toUpperCase()}
              </AvatarFallback>
            </button>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{user.username}</p>
          </div>
        </div>

      </div>
      <div className="text-sm text-gray-400">
        <p className="mb-6">
          About &bull; Help &bull; Press &bull; API &bull; Jobs &bull; Privacy
          &bull; Terms &bull; Locations &bull; Language
        </p>
        <p>&copy; 2023 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
}
