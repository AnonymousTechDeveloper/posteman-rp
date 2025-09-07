import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = (credencialResponse) => {
    console.log(credencialResponse)
    navigate("/register");
  };

  const login = useGoogleLogin({
    onSuccess: handleSignIn,
  });

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Brand */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-orange">
            {/* <Users className="h-8 w-8 text-white" /> */}
            <img src="./_logo.png" className="w-full h-full" />
          </div>
          <h1 className="text-3xl font-bold text-white">BITS x Postman</h1>
          <p className="text-gray-400 mt-2">Recruitment Portal</p>
        </div>

        {/* Sign In Card */}
        <Card className="border-brand-gray bg-brand-black/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">Welcome</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Log in to register
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={() => login()}>
              <Button
                className="w-full bg-gradient-primary hover:bg-brand-orange-dark text-white shadow-orange transition-all duration-300 group"
                onClick={() => login()}
              >
                <FaGoogle /> Login with Google
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        {/* <div className="text-center text-gray-400 text-sm">
          <p>© 2024 RecruitPortal. Built for excellence.</p>
        </div> */}
      </div>
    </div>
  );
};

export default SignIn;