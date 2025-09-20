import { useNavigate } from "react-router";
import { Button } from "./ui/button";
const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-background container mx-auto px-4 py-8 flex flex-col gap-3 items-center justify-center">
      <h1 className="text-4xl font-bold text-red-500">Unauthorized ! </h1>
      <p className="text-gray-400 mt-2">
        Please login as different user to view this page
      </p>
      <Button onClick={() => navigate("/")} className="mt-3">
        Go Back to Home
      </Button>
    </main>
  );
};

export default Unauthorized;
