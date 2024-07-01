import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
        console.log("Search button clicked"); // Add this line to confirm function execution
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=YOUR_CX_ID&q=${query}&searchType=image`
      );
      setSearchResults(response.data.items);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const downloadImage = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl text-center">Google Image Search</h1>
      <div className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2"
          placeholder="Search for images..."
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {searchResults.map((result, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={result.link} alt={result.title} className="w-32 h-32 object-cover" />
            <Button onClick={() => downloadImage(result.link)} className="mt-2">
              Download
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;