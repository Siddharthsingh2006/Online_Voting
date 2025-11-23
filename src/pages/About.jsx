import React from "react";
import "../styles/about.css";

function About() {
  const features = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      title: "Secure Voting",
      desc: "End-to-end encryption ensures votes remain private and protected."
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/1828/1828961.png",
      title: "Transparency",
      desc: "Real-time monitoring and results make the process transparent."
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135810.png",
      title: "User-Friendly",
      desc: "Simple design allows easy access for voters of all backgrounds."
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/2950/2950500.png",
      title: "Accessibility",
      desc: "Available online, so users can vote from anywhere securely."
    }
  ];

  return (
    <div className="about">
      <h2 className="about-title">About Us</h2>
      <div className="info-block">
        <img
          src="https://nif.org.in/upload/innovation_photo//1756EVMachine.jpg"
          alt="Mission"
          className="info-img left"
        />
        <p className="about-text">
          The Online Voting System is designed to bring security and efficiency
          to elections. Our mission is to make the voting process simple, fair,
          and transparent for everyone.
        </p>
      </div>

      <div className="info-block">
        <img
          src="https://media.springernature.com/lw1200/springer-static/image/art%3A10.1007%2Fs10586-024-04709-8/MediaObjects/10586_2024_4709_Fig4_HTML.png"
          alt="Technology"
          className="info-img right"
        />
        <p className="about-text">
          Developed using modern technologies, this project is reliable and easy
          to use for both voters and administrators. This Online Voting System
          was developed with a simple yet powerful goal — to bring a modern,
          fair, and digital approach to the way we vote. Traditional voting
          methods often come with long queues, manual errors, paper wastage, and
          even the risk of fraud. We wanted to change that.
        </p>
      </div>

      <div className="info-block">
        <img
          src="https://media.istockphoto.com/id/1224860284/photo/man-voting-online.jpg?s=612x612&w=0&k=20&c=RrMAmxR7GWxDiLDwiR77vNJVydmPWYeK5J3aqcmU_nc="
          alt="Comfort"
          className="info-img left"
        />
        <p className="about-text">
          With this system, elections become easier to organize, more secure,
          and a lot more transparent. Voters can register, log in, and cast
          their vote from the comfort of their home or anywhere with internet
          access. No need to print ballots, set up physical booths, or manually
          count votes.
        </p>
      </div>
      <section className="features">
        <h3 className="features-title">Features of Online Voting System</h3>
        <div className="feature-cards">
          {features.map((feature, index) => (
            <div key={index} className="card">
              <div className="card-img-wrapper">
                <img src={feature.img} alt={feature.title} />
              </div>
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
