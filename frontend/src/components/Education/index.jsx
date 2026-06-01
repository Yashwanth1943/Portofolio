import React from 'react';
import './index.scss';

const educationData = [
  {
    title: "BSc in Computer Science",
    institution: "Ravulapalem",
    period: "2021 - 2024",
    description: "Completed undergraduate degree with a strong foundation in database systems, internet technologies, software design principles, and object-oriented programming."
  },
  {
    title: "Intermediate Education (MPC)",
    institution: "Siddartha Junior College",
    period: "2019 - 2021",
    description: "Completed higher secondary curriculum with specialization in Mathematics, Physics, and Chemistry."
  },
  {
    title: "Secondary School Certificate",
    institution: "ZP High School",
    period: "2019",
    description: "Successfully graduated secondary school education with high marks."
  }
];

const Education = () => {
  return (
    <div className="education-container">
      <h1 className="education-title">Education</h1>
      <div className="timeline">
        {educationData.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-period">{item.period}</span>
              <h2 className="timeline-heading">{item.title}</h2>
              <h3 className="timeline-institution">{item.institution}</h3>
              <p className="timeline-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
