import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from '../assets/images/Tasklllo-logo.png'

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
        <div className="header-logo">
          <img className='logo' src={logo} alt="" />
          <h1 >Tasklllo</h1>
        </div>
        <nav>
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">
            <button className="btn-signup">Get Tasklllo</button>
          </NavLink>
        </nav>
      </header>

      <main className="home-main main-container">
        <section className="home-hero-container full">
          <div className="hero-content ">
            <div className="hero-text">
              <h1>Tasklllo brings all your tasks, teammates, and tools together</h1>
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

            <div className='air air2'></div>
            <div className='air air1'></div>
            <div className='air air3'></div>
            <div className='air air4'></div>
         

          </section>

        {/* <section className="card-desc main-container">
          <div className="prod-div full">
            <h3>TASKLLLO 101</h3>
            <h1 className="desc-header">A productivity powerhouse</h1>
            <p>
              Simple, flexible, and powerful. All it takes are boards, lists, and
              cards to get a clear view of who’s doing what and what needs to get
              done. Learn more in our guide for getting started.
            </p>
          </div>
        </section> */}
      </main>
    </section>
  );
};

