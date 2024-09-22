import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Search,
  Compass,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  Menu,
} from "lucide-react";

export default function Sidebar() {
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
          <PlusSquare className="mr-4 h-6 w-6" />
          Create
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
