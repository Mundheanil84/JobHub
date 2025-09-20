import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "@/redux/store";
import { logout } from "@/redux/features/user/userSlice";

function ProfileDropdown() {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const Logout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Profile" variant={"ghost"} className="w-10 h-10">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Hi, {user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate(`/profile`)}>
          Profile
        </DropdownMenuItem>

        {user.role === "user" && (
          <DropdownMenuItem onClick={() => navigate("/jobs/saved")}>
            Saved jobs
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={Logout}>
          {" "}
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown;
