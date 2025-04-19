import React from "react";

const FilterBar = ({ activeSection, setActiveSection }) => {
  // You can dynamically generate these from your articles data
  const sections = [
    "All",
    "U.S.",
    "Politics",
    "World",
    "Business",
    "Technology",
    "Science",
    "Health",
    "Sports",
    "Arts",
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 py-4">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => setActiveSection(section)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            activeSection === section
              ? "bg-blue-400 text-white"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
        >
          {section}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
