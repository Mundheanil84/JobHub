import LoginForm from "@/components/LoginForm";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import RegisterForm from "@/components/RegisterForm";

function Register() {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isUserLoggedIn) {
      navigate("/jobs");
    }
  }, [user.isUserLoggedIn, navigate]);

  if (user.isUserLoggedIn) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background container mx-auto px-4 py-8 flex justify-center items-center">
      <RegisterForm />
    </main>
  );
}

export default Register;
