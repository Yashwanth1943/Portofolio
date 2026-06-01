import React from 'react';
import './index.scss';

const achievementsData = [
  {
    title: "Skyscanner Software Engineering Simulation",
    issuer: "Skyscanner",
    description: "Completed tasks covering system architecture design Microservices structures and micro frontend building blocks."
  },
  {
    title: "Deloitte Data Analytics Simulation",
    issuer: "Deloitte",
    description: "Prepared analytical models, customized dashboard displays, and derived strategic business insights."
  },
  {
    title: "Industry-Ready Certification",
    issuer: "NxtWave",
    description: "Certified for demonstrating job-ready competency in modern UI development, database optimization, and API scripting."
  },
  {
    title: "Web Development & React.js Certification",
    issuer: "NxtWave CCBP Academy",
    description: "Demonstrated skills in React architecture design, context API state modeling, and responsive styles."
  },
  {
    title: "Python & SQL Certification",
    issuer: "NxtWave CCBP Academy",
    description: "Completed courses in relational database query construction, indexing, and Python backend automation scripting."
  }
];

const Achievements = () => {
  return (
    <div className="achievements-container">
      <h1 className="achievements-title">Achievements</h1>
      <div className="achievements-grid">
        {achievementsData.map((item, index) => (
          <div key={index} className="achievement-card">
            <span className="achievement-badge">{item.issuer}</span>
            <h2 className="achievement-card-title">{item.title}</h2>
            <p className="achievement-card-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
