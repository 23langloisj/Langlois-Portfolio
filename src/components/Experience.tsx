import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import experiences, { ExperienceData } from '../extra/experiences.js';

const Experience = () => {
  return (
    <section id="experiences" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="flex items-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 whitespace-nowrap">
          <span className="font-mono text-teal-400 text-2xl mr-2">02.</span>
          Where I’ve Worked
        </h2>
        <div className="h-[1px] bg-slate-700 w-full ml-6"></div>
      </div>

      <VerticalTimeline lineColor='#334155'>
        {experiences.map((experience: ExperienceData, index) => (
          <VerticalTimelineElement
            key={index}
            date={experience.date}
            dateClassName="text-slate-400 font-mono text-sm px-4"
            iconStyle={{ 
              background: '#0f172a',
              boxShadow: '0 0 0 4px #2dd4bf, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)' 
            }}
            contentStyle={{ 
              background: '#1e293b',
              color: '#e2e8f0', 
              boxShadow: 'none',
              border: '1px solid #334155',
              borderRadius: '12px',
              padding: '2rem'
            }}
            contentArrowStyle={{ borderRight: '7px solid #334155' }}
            icon={
              <div className="flex items-center justify-center w-full h-full p-2">
                <img 
                  src={experience.image} 
                  alt={experience.company} 
                  className="w-full h-full object-contain rounded-full" 
                />
              </div>
            }
          >
            <div className="text-left">
              <h3 className="text-xl font-bold text-slate-100 mb-1">
                {experience.role}
              </h3>
              <p className="text-teal-400 font-mono text-sm mb-4 !mt-0 uppercase tracking-wider">
                {experience.company}
              </p>
              
              {experience.description && (
                <p className="text-slate-400 text-sm leading-relaxed !font-normal">
                  {experience.description}
                </p>
              )}
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  );
}

export default Experience;