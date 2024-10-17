import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSignup } from "@/hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { signup } = useSignup();
  const navigate = useNavigate();

  const handelSignup = async (e: React.FormEvent) => {
    console.log("hre")
    e.preventDefault();

    const res: any = await signup(username, password, email);
    if (res?.success) {
      console.log("hre")
      navigate("/login");
      toast.success("Signup successful")
      toast.success("Check you mail")
    } else {
      console.log("here")
      console.log(res)
      toast.error(res?.message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGzmRGJF8UP4FiZ1yZWzoff-4ZO6zJ1BP0cA&s"
              alt="Instagram"
              className="h-[100px]"
            />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handelSignup}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="sr-only">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Log In
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
          <div className="w-full border-t pt-4">
            <p className="text-sm text-center">
              Have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
