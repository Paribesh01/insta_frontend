import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Search,
  Compass,
  Film,
  MessageCircle,
  Heart,
  Menu,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/useLogout";

export default function Sidebar() {
  const navigate = useNavigate()
  const { logout } = useLogout()
  const handelLogout = async () => {
    const res = await logout()
    if (res?.success) {
      navigate("/login");
    }
  };
  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif">Instagram</h1>
      </div>
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start text-xl py-6">
          <Home className="mr-4 h-6 w-6" />
          Home
        </Button>
        <Button variant="ghost" className="w-full justify-start text-xl py-6">
          <Search className="mr-4 h-6 w-6" />
          Search
        </Button>
        <Button variant="ghost" className="w-full justify-start text-xl py-6">
          <Compass className="mr-4 h-6 w-6" />
          Explore
        </Button>
        <Button variant="ghost" className="w-full justify-start text-xl py-6">
          <Film className="mr-4 h-6 w-6" />
          Reels
        </Button>
        <Button variant="ghost" className="w-full justify-start text-xl py-6">
          <MessageCircle className="mr-4 h-6 w-6" />
          Messages
        </Button>
        <Button variant="ghost" className="w-full justify-start text-xl py-6">
          <Heart className="mr-4 h-6 w-6" />
          Notifications
        </Button>
        <Button variant="ghost" className="w-full justify-start text-xl py-6">
          <Avatar className="mr-4 h-6 w-6">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="@username"
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          Profile
        </Button>
        <Button onClick={handelLogout} variant="ghost" className="w-full justify-start text-xl py-6">
          <LogOut className="mr-4 h-6 w-6" />
          LogOut
        </Button>
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <Button variant="ghost" className="w-full justify-start text-xl py-6">
          <Menu className="mr-4 h-6 w-6" />
          More
        </Button>
      </div>
    </div>
  );
}
