import experiences from '../extra/experiences.js';

const Experience = () => {
    return (
        <div className = "text-black flex flex-col items-center justify-center mt-64 mb-64">
            <h2 className="border-blue-800 text-5xl font-bold">
            My Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 py-10 px-4 place-items-center">
                {experiences.map((experience, index) => (
                    <div 
                        key = {index}
                        className="w-3/4 border-4 border-blue-800 p-4 rounded-lg mx-0 bg-blue-100 transition-transform transform hover:scale-105"
                        >
                        <div className="flex">
                            <div className="pr-5">
                                <div className="flex">
                                    <h1 className="text-left font-bold text-4xl">{experience.company}:</h1>
                                    <p className="pl-10 text-3xl">{experience.date}</p>
                                </div>
                                <h1 className="text-left font-bold text-2xl">{experience.role}</h1>
                                <p className="text-left pt-5 text-2xl">{experience.description}</p>
                            </div>
                            {experience.image && (
                                <img
                                    src={experience.image}
                                    alt="Company Logo"
                                    className="rounded-lg m-4 ml-auto max-w-full w-52 "
                                />
                            )}
                        </div>

                    </div>
                )
                )}</div>
        </div>
    )
}

export default Experience;