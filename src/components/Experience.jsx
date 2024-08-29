import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import experiences from '../extra/experiences.js';

const Experience = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-64 mb-64">
      <h2 className="text-black text-5xl font-bold mb-10">My Experience</h2>
      <VerticalTimeline lineColor='black'>
        {experiences.map((experience, index) => (
          <VerticalTimelineElement
            key={index}
            date={experience.date}
            dateClassName="font-bold text-xl"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentStyle={{ background: '#d8eaf1', color: '#000' }}
            contentArrowStyle={{ borderRight: '7px solid #d8eaf1' }}
            icon={<img src={experience.image} alt={`${experience.company} logo`} className="w-full h-full object-contain rounded-full" />}
          >
            <h3 className="text-3xl font-bold text-center">{experience.company}</h3>
            <h4 className="text-xl font-semibold text-center">{experience.role}</h4>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export default Experience;
