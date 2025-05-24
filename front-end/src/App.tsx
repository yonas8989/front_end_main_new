/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./app/store";
import "react-toastify/dist/ReactToastify.css";

// Components
import { Footer } from "./components/Footer";
import ProtectedRoute from "./components/ProtectRoute";
import { Header } from "./components/Header";

// Pages
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { SongList } from "./pages/SongList";
import { AddSong } from "./pages/AddSong";
import { EditSong } from "./pages/EditSong";
import { NotFound } from "./pages/NotFound";

// Styled components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8fafc;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;

  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const toastStyles = css`
  .Toastify__toast {
    font-family: "Inter", sans-serif;
    border-radius: 8px;
  }
  .Toastify__toast--success {
    background: #10b981;
  }
  .Toastify__toast--error {
    background: #ef4444;
  }
`;

// New component to handle routing logic
const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = false; // Replace with your actual auth state

  const handleLoginClick = () => navigate("/login");
  const handleSignUpClick = () => navigate("/signup");
  const handleLogoutClick = () => {
    // Add your logout logic here
    navigate("/");
  };
  const handleLogoClick = () => navigate("/");
  const handleNavClick = (page: string) => navigate(`/${page}`);

  return (
    <AppContainer>
      <Header
        isAuthenticated={isAuthenticated}
        currentPage={location.pathname.split("/")[1] || "home"}
        onLoginClick={handleLoginClick}
        onSignUpClick={handleSignUpClick}
        onLogoutClick={handleLogoutClick}
        onLogoClick={handleLogoClick}
        onNavClick={handleNavClick}
      />

      <MainContent>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/songs" element={<SongList />} />
                      <Route path="/songs/add" element={<AddSong />} />
                     <Route path="/songs/edit/:id" element={<EditSong />} /> */}

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/songs" element={<SongList />} />
            <Route path="/songs/add" element={<AddSong />} />
            <Route path="/songs/edit/:id" element={<EditSong />} />
          </Route>

          {/* Fallback Routes */}
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </MainContent>

      <Footer
        companyName="MusicApp"
        year={new Date().getFullYear()}
        links={[
          { title: "Home", url: "/" },
          { title: "About", url: "/about" },
          { title: "Contact", url: "/contact" },
          { title: "Privacy Policy", url: "/privacy" },
        ]}
      />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        css={toastStyles}
      />
    </AppContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;
