import React from "react";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ArticleCard = ({ article }) => {
  // Get the image URL from multimedia array if available
  const getImageUrl = () => {
    if (article.multimedia && article.multimedia.length > 0) {
      // Find an appropriate size image
      const xlarge = article.multimedia.find(
        (media) => media.subtype === "xlarge" || media.subType === "xlarge"
      );

      if (xlarge && xlarge.url) {
        // Check if URL is absolute or relative
        if (xlarge.url.startsWith("http")) {
          return xlarge.url;
        } else {
          // If relative, prepend the NY Times base URL
          return `https://www.nytimes.com/${xlarge.url}`;
        }
      }
    }

    // Return a placeholder if no image is found
    return "/api/placeholder/400/250";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageUrl()}
          alt={article.headline?.main || "Article image"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-4">
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
            {article.section_name || "News"}
          </span>
          {article.subsection_name && (
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded ml-2">
              {article.subsection_name}
            </span>
          )}
        </div>

        <h2 className="text-xl font-serif font-bold mb-2 text-gray-800 tracking-tight leading-tight">
          {article.headline?.main || "No Title Available"}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.abstract || article.snippet || "No description available."}
        </p>
      </div>

      {/* Footer Section */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span>{article.byline?.original || "Unknown Author"}</span>
          <span>{formatDate(article.pub_date) || "Unknown Date"}</span>
        </div>

        <a
          href={article.web_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium inline-block"
        >
          Read Full Article
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
