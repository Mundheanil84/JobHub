import { Link, NavLink, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/user/userSlice";
import ToggleTheme from "./ToggleTheme";
import ProfileDropdown from "./ProfileDropdown";
import { LogIn, LogOut } from "lucide-react";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = user?.isUserLoggedIn;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const Logout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <header className="bg-zinc-200 dark:bg-zinc-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex gap-2 items-center">
          <span className="bg-orange-400 px-2 py-1 text-black rounded-sm">
            Jobs
          </span>
          <span>Hub</span>
        </Link>
        <nav className=" ">
          <ul className="flex space-x-4 items-center ">
            {(user.role === "user" || !user.isUserLoggedIn) && (
              <li>
                <NavLink
                  to="/jobs"
                  className={({ isActive }) =>
                    isActive ? "font-bold" : "hover:underline"
                  }
                >
                  Find Jobs
                </NavLink>
              </li>
            )}
            {(user.role === "admin" || !user.isUserLoggedIn) && (
              <li>
                <Link to="/hire-talent" className="hover:underline">
                  Hire Talent
                </Link>
              </li>
            )}
            {user.isUserLoggedIn && (
              <li>
                <ProfileDropdown />
              </li>
            )}
            <li>
              {isAuthenticated ? (
                <Button size="sm" onClick={Logout}>
                  <LogOut /> Logout
                </Button>
              ) : (
                <Button size="sm" onClick={() => navigate("/login")}>
                  Login <LogIn />
                </Button>
              )}
            </li>
            <li>
              <ToggleTheme />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
