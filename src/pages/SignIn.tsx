import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Brand */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-orange">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">RecruitPortal</h1>
          <p className="text-gray-400 mt-2">Your gateway to opportunities</p>
        </div>

        {/* Sign In Card */}
        <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">Welcome back</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Sign in to continue your recruitment journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-brand-gray border-brand-gray-light text-white placeholder:text-gray-400 focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="bg-brand-gray border-brand-gray-light text-white placeholder:text-gray-400 focus:border-primary"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:bg-brand-orange-dark text-white shadow-orange transition-all duration-300 group"
              >
                Continue to Registration
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                New here? The sign-in redirects to registration for demo purposes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm">
          <p>© 2024 RecruitPortal. Built for excellence.</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;