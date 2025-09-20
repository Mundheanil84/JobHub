import { Button } from "@/components/ui/button";
import { ChevronLeft, House } from "lucide-react";
import { Link, useNavigate } from "react-router";
function NotFound() {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-5">
      <Button aria-label="Go back home" onClick={() => navigate(-1)}>
        Go back
        <ChevronLeft />
      </Button>
      <Button aria-label="Go back home" onClick={() => navigate("/")}>
        Go back to home page
        <House />
      </Button>
      <h1>404: The page you are looking for was Not Found</h1>

      <img
        src="/404.svg"
        alt="Page not found illustration"
        width={400}
        height={400}
      />
    </main>
  );
}

export default NotFound;
