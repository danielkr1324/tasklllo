import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userService } from "../services/user.service";

export function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    redirect();
  }, []);

  const redirect = async () => {
    const loggedinUser = await userService.getLoggedinUser();
    if (loggedinUser) {
      navigate("/workspace");
    }
  };

  return (
    <section className="home-page">
      <header className="home-header">
        <h1 className="app-logo">Taskllo</h1>
        <nav>
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">
            <button className="btn-signup">Get Taskllo for free</button>
          </NavLink>
        </nav>
      </header>

      <main className="home-main main-container">
        <section className="home-hero-container full">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Taskllo brings all your tasks, teammates, and tools together</h1>
              <p>Keep everything in the same place—even if your team isn't.</p>
              <NavLink to="/about">
                <button className="btn-signup">Sign up - It's free!</button>
              </NavLink>
            </div>
            <img
              src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=2280&fm=webp"
              alt=""
            />
          </div>
          <svg
            id="wave"
            viewBox="0 0 1440 200"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ... SVG path data */}
          </svg>
        </section>

        <section className="card-desc">
          <div className="prod-div">
            <h3>TASKLLO 101</h3>
            <h1>A productivity powerhouse</h1>
            <p>
              Simple, flexible, and powerful. All it takes are boards, lists, and
              cards to get a clear view of who’s doing what and what needs to get
              done. Learn more in our guide for getting started.
            </p>
          </div>
        </section>
      </main>
    </section>
  );
};

