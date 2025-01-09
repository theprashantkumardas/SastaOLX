import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'; // Import specific icon


const SearchBar = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-lg bg-gray-200  rounded-full items-center hidden md:flex pl-4 ">
      <FontAwesomeIcon className="text-gray-500" icon={faMagnifyingGlass} />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder || "Search..."}
        className="flex-grow w-full  bg-gray-200 items-center  text-gray-700 px-4 py-2 rounded-full focus:outline-none "
      /> 
      {/* <button
        onClick={handleSearch}
        className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-200"
      >
        Search
      </button> */}
    </div>
  );
};

export default SearchBar;
