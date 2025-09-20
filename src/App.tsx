import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Unauthorized from "./components/Unauthorized";
import NotFound from "./pages/NotFound";
import ViewJob from "./pages/ViewJob";
import Login from "./pages/Login";
import JobForm from "./pages/JobForm";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import SavedJobs from "./pages/SavedJobs";
import HireTalent from "./pages/HireTalent";

function App() {
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = user?.isUserLoggedIn;
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/hire-talent"
          element={
            isAuthenticated && user.role === "admin" ? (
              <HireTalent />
            ) : (
              <Unauthorized />
            )
          }
        />
        <Route
          path="/jobs"
          element={isAuthenticated ? <Jobs /> : <Unauthorized />}
        />
        <Route
          path="/jobs/saved"
          element={isAuthenticated ? <SavedJobs /> : <Unauthorized />}
        />
        <Route
          path="/jobs/:id"
          element={isAuthenticated ? <ViewJob /> : <Unauthorized />}
        />
        <Route
          path="/jobs/edit/:id"
          element={isAuthenticated ? <JobForm /> : <Unauthorized />}
        />

        <Route
          path="/jobs/new"
          element={
            isAuthenticated && user.role === "admin" ? (
              <JobForm />
            ) : (
              <Unauthorized />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
