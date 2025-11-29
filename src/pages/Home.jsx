import React from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

import secureVotingImg from "../assets/secure.png";
import timeSaveImg from "../assets/time.png";
import inclusiveImg from "../assets/inclusive.png";
import fastCountImg from "../assets/fast.png";
import ecoFriendlyImg from "../assets/eco.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Online Voting System</h1>
        <p>Secure, Transparent, and Easy Voting for Everyone.</p>
      </header>

      <section className="home-info">
        <h2>Why Choose Us?</h2>

        <div className="info-block">
          <img src={secureVotingImg} alt="Secure Voting" className="info-img left" />
          <p>
            Online voting is a modern way of casting votes using the internet.
            It allows people to vote from their homes, offices, or while
            traveling. This ensures convenience and saves valuable time while
            making the election process accessible to everyone.
          </p>
        </div>

        <div className="info-block">
          <img src={timeSaveImg} alt="Save Time" className="info-img right" />
          <p>
            With strong encryption and authentication, online voting ensures
            security and fairness. Votes are recorded safely, protecting them
            from tampering. This gives voters confidence that their voice is
            truly being heard.
          </p>
        </div>

        <div className="info-block">
          <img src={inclusiveImg} alt="Inclusive Voting" className="info-img left" />
          <p>
            This system is designed for schools, colleges, clubs, and
            communities. It makes voting easier for people with disabilities,
            senior citizens, and those living far from polling centers.
          </p>
        </div>

        <div className="info-block">
          <img src={fastCountImg} alt="Fast Counting" className="info-img right" />
          <p>
            Results are calculated instantly, removing manual errors and
            reducing time for vote counting. This ensures faster, transparent,
            and reliable results compared to traditional methods.
          </p>
        </div>
        
        <div className="info-block">
          <img src={ecoFriendlyImg} alt="Eco Friendly" className="info-img left" />
          <p>
            By eliminating paper ballots, the system is eco-friendly and helps
            reduce environmental waste. Online voting is a step toward greener,
            technology-driven elections.
          </p>
        </div>
      </section>

      <button
        onClick={() => navigate("/register")}
        className="get-started-btn"
      >
        Get Started
      </button>
    </div>
  );
}

export default Home;
