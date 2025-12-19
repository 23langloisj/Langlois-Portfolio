import { useState, useEffect } from "react";
import axios from "axios";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Load suggestions from the backend when the component mounts
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get("https://jakelanglois.com/.netlify/functions/getSuggestion");
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };
    fetchSuggestions();
  }, []);

  // Save suggestion to the backend
  const saveSuggestion = async () => {
    if (name && message) {
      const newSuggestion = { name, message };

      try {
        await axios.post("https://jakelanglois.com/.netlify/functions/addSuggestion", newSuggestion);
        setSuggestions((prev) => [...prev, newSuggestion]);

        // Clear the form
        setName("");
        setMessage("");
      } catch (error) {
        console.error("Error saving suggestion:", error);
      }
    }
  };

  return (
    <section id="suggestions" className="mt-10 p-5">
      <h2 className="text-2xl font-semibold mb-4">
        If you&#39;re here, say hi! Or leave a suggestion on what I should try to make:
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
