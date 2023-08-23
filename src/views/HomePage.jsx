import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function HomePage() {
  const navigate = useNavigate();
  const loggedinUser = useSelector(state => state.userModule.user)

  useEffect(() => {
    redirect();
  }, []);

  const redirect = async () => {
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
              <NavLink to="/signup">
                <button className="btn-signup">Sign up - It's free!</button>
              </NavLink>
            </div>
            <img
              src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=2280&fm=webp"
              alt=""
            />
          </div>
          <svg id="wave"  viewBox="0 0 1440 200" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stopColor="#fafbfc" offset="0%"></stop><stop stopColor="#fafbfc" offset="100%"></stop></linearGradient></defs><path  fill="url(#sw-gradient-0)" d="M0,100L80,113.3C160,127,320,153,480,146.7C640,140,800,100,960,86.7C1120,73,1280,87,1440,103.3C1600,120,1760,140,1920,150C2080,160,2240,160,2400,153.3C2560,147,2720,133,2880,123.3C3040,113,3200,107,3360,90C3520,73,3680,47,3840,50C4000,53,4160,87,4320,100C4480,113,4640,107,4800,110C4960,113,5120,127,5280,140C5440,153,5600,167,5760,160C5920,153,6080,127,6240,96.7C6400,67,6560,33,6720,40C6880,47,7040,93,7200,123.3C7360,153,7520,167,7680,153.3C7840,140,8000,100,8160,86.7C8320,73,8480,87,8640,83.3C8800,80,8960,60,9120,43.3C9280,27,9440,13,9600,6.7C9760,0,9920,0,10080,20C10240,40,10400,80,10560,106.7C10720,133,10880,147,11040,146.7C11200,147,11360,133,11440,126.7L11520,120L11520,200L11440,200C11360,200,11200,200,11040,200C10880,200,10720,200,10560,200C10400,200,10240,200,10080,200C9920,200,9760,200,9600,200C9440,200,9280,200,9120,200C8960,200,8800,200,8640,200C8480,200,8320,200,8160,200C8000,200,7840,200,7680,200C7520,200,7360,200,7200,200C7040,200,6880,200,6720,200C6560,200,6400,200,6240,200C6080,200,5920,200,5760,200C5600,200,5440,200,5280,200C5120,200,4960,200,4800,200C4640,200,4480,200,4320,200C4160,200,4000,200,3840,200C3680,200,3520,200,3360,200C3200,200,3040,200,2880,200C2720,200,2560,200,2400,200C2240,200,2080,200,1920,200C1760,200,1600,200,1440,200C1280,200,1120,200,960,200C800,200,640,200,480,200C320,200,160,200,80,200L0,200Z"></path></svg>

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

