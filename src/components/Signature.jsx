import { useState, useEffect } from "react";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Load suggestions from localStorage when the component mounts
  useEffect(() => {
    const storedSuggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
    setSuggestions(storedSuggestions);
  }, []);

  // Save suggestions to localStorage
  const saveSuggestion = () => {
    if (name && message) {
      const newSuggestion = { name, message };
      const updatedSuggestions = [...suggestions, newSuggestion];
      setSuggestions(updatedSuggestions);
      localStorage.setItem("suggestions", JSON.stringify(updatedSuggestions));

      // Clear the form
      setName("");
      setMessage("");
    }
  };

  return (
    <section id="suggestions" className="mt-10 p-5">
      <h2 className="text-2xl font-semibold mb-4">
        If you're here, say hi! Or leave a suggestion on what I should try to make:
      </h2>

      {/* Suggestion Form */}
      <div className="flex flex-col mb-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 p-2 border border-gray-300"
        />
        <textarea
          placeholder="Your Suggestion"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-2 p-2 border border-gray-300"
        ></textarea>
        <button
          onClick={saveSuggestion}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Submit Suggestion
        </button>
      </div>

      {/* List of suggestions */}
      <div className="mt-5">
        <h3 className="text-xl font-semibold">Previous Suggestions:</h3>
        <div className="mt-2">
          {suggestions.map((suggestion, index) => (
            <p key={index} className="mb-2 text-lg">
              <strong>{suggestion.name}:</strong> {suggestion.message}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Suggestions;
