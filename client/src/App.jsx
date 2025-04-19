import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import ArticleCard from "./components/ArticleCard";
import FilterBar from "./components/FilterBar";

function App() {
  const [activeSection, setActiveSection] = useState("All");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter articles based on section
  const filteredArticles =
    activeSection === "All"
      ? articles
      : articles.filter((article) => article.section_name === activeSection);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/articles");

        // Adjust this based on your actual API response structure.
        const articlesData = response.data || [];

        setArticles(articlesData);
        setError(null);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      // You would typically send the search query to your backend
      // For this example, we'll simulate a search by filtering the existing articles
      // In a real app, you'd make an API call like:
      // const response = await axios.get(`http://localhost:3000/api/search?q=${searchQuery}`);

      // For now, we'll just update the UI to reflect that a search was performed
      setActiveSection("All"); // Reset to All sections when searching

      // Simulate a search delay
      setTimeout(() => {
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error searching articles:", error);
      setError("Failed to search articles. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <h1 className="text-3xl font-serif font-bold text-gray-900">
                QueryPress
              </h1>
              <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 py-1 px-2 rounded">
                Beta
              </span>
            </div>

            <div className="text-gray-600 text-sm">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-white border border-gray-300 rounded-full py-4 px-6 pr-12 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Search for articles or ask questions in natural language..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Try "Show me articles about climate change" or "Find tech news
              from last week"
            </p>
          </form>
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <FilterBar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading articles...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Articles Grid - Now consistently showing 3 columns */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">
                  No articles found for this section.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              This is a demo application showcasing NY Times articles.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              All article content is property of The New York Times.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
