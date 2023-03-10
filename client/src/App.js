import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Header from "./components/Header";
import { setUser } from "./redux/features/authSlice";
import AddEditTour from "./pages/AddEditTour";
import SingleTour from "./pages/SingleTour";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import TagTours from "./pages/TagTours";

const App = () => {

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  
  return (
    <Router>
      <div>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/tours/search" element={<Home />} />

          <Route path="/tours/tag/:tag" element={<TagTours />} />

          <Route path="/login"login element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route 
            path="/addTour" 
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/editTour/:id" 
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />

          <Route path="/tour/:id" element={<SingleTour />} />

          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
