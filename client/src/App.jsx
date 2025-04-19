import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
const data = {
  abstract:
    "The lawsuit accuses President Trump of vastly overstepping his authority to “upturn the electoral playing field in his favor and against his political rivals.”",
  web_url:
    "https://www.nytimes.com/2025/03/31/us/politics/trump-executive-order-elections-lawsuit.html",
  snippet:
    "The lawsuit accuses President Trump of vastly overstepping his authority to “upturn the electoral playing field in his favor and against his political rivals.”",
  lead_paragraph:
    "Nearly every arm of the Democratic Party united in filing a lawsuit against the Trump administration on Monday night, arguing that a recent executive order signed by the president seeking to require documentary proof of citizenship and other voting reforms is unconstitutional.",
  source: "The New York Times",
  multimedia: [
    {
      rank: 0,
      subtype: "xlarge",
      caption: null,
      credit: null,
      type: "image",
      url: "images/2025/03/31/multimedia/00pol-elex-lawsuit-topart-vlqh/00pol-elex-lawsuit-topart-vlqh-articleLarge.jpg",
      height: 400,
      width: 600,
      subType: "xlarge",
      crop_name: "articleLarge",
      legacy: {
        xlarge:
          "images/2025/03/31/multimedia/00pol-elex-lawsuit-topart-vlqh/00pol-elex-lawsuit-topart-vlqh-articleLarge.jpg",
        xlargewidth: 600,
        xlargeheight: 400,
      },
    },
    {
      rank: 0,
      subtype: "jumbo",
      caption: null,
      credit: null,
      type: "image",
      url: "images/2025/03/31/multimedia/00pol-elex-lawsuit-topart-vlqh/00pol-elex-lawsuit-topart-vlqh-jumbo.jpg",
      height: 683,
      width: 1024,
      subType: "jumbo",
      crop_name: "jumbo",
      legacy: {},
    },
    {
      rank: 0,
      subtype: "superJumbo",
      caption: null,
      credit: null,
      type: "image",
      url: "images/2025/03/31/multimedia/00pol-elex-lawsuit-topart-vlqh/00pol-elex-lawsuit-topart-vlqh-superJumbo.jpg",
      height: 1366,
      width: 2048,
      subType: "superJumbo",
      crop_name: "superJumbo",
      legacy: {},
    },
    {
      rank: 0,
      subtype: "thumbnail",
      caption: null,
      credit: null,
      type: "image",
      url: "images/2025/03/31/multimedia/00pol-elex-lawsuit-topart-vlqh/00pol-elex-lawsuit-topart-vlqh-thumbStandard.jpg",
      height: 75,
      width: 75,
      subType: "thumbnail",
      crop_name: "thumbStandard",
      legacy: {
        thumbnail:
          "images/2025/03/31/multimedia/00pol-elex-lawsuit-topart-vlqh/00pol-elex-lawsuit-topart-vlqh-thumbStandard.jpg",
        thumbnailwidth: 75,
        thumbnailheight: 75,
      },
    },
    {
      rank: 0,
      subtype: "thumbLarge",
      caption: null,
      credit: null,
      type: "image",
      url: "images/2025/03/31/multimedia/00pol-elex-lawsuit-topart-vlqh/00pol-elex-lawsuit-topart-vlqh-thumbLarge.jpg",
      height: 150,
      width: 150,
      subType: "thumbLarge",
      crop_name: "thumbLarge",
      legacy: {},
    },
  ],
  headline: {
    main: "Democrats Sue President Over Executive Order on Elections",
    kicker: null,
    content_kicker: null,
    print_headline: "",
    name: null,
    seo: null,
    sub: null,
  },
  keywords: [
    {
      name: "organizations",
      value: "Democratic National Committee",
      rank: 1,
      major: "N",
    },
    {
      name: "organizations",
      value: "Democratic Party",
      rank: 2,
      major: "N",
    },
    {
      name: "subject",
      value: "United States Politics and Government",
      rank: 3,
      major: "N",
    },
    {
      name: "subject",
      value: "Federal-State Relations (US)",
      rank: 4,
      major: "N",
    },
    {
      name: "subject",
      value: "Voting Rights, Registration and Requirements",
      rank: 5,
      major: "N",
    },
    {
      name: "subject",
      value: "Suits and Litigation (Civil)",
      rank: 6,
      major: "N",
    },
    {
      name: "subject",
      value: "Presidential Power (US)",
      rank: 7,
      major: "N",
    },
    {
      name: "subject",
      value: "Executive Orders and Memorandums",
      rank: 8,
      major: "N",
    },
    {
      name: "subject",
      value: "Constitution (US)",
      rank: 9,
      major: "N",
    },
    {
      name: "persons",
      value: "Trump, Donald J",
      rank: 10,
      major: "N",
    },
    {
      name: "persons",
      value: "Schumer, Charles E",
      rank: 11,
      major: "N",
    },
    {
      name: "persons",
      value: "Jeffries, Hakeem",
      rank: 12,
      major: "N",
    },
  ],
  pub_date: "2025-04-01T00:40:09+0000",
  document_type: "article",
  news_desk: "Politics",
  section_name: "U.S.",
  subsection_name: "Politics",
  byline: {
    original: "By Nick Corasaniti",
    person: [
      {
        firstname: "Nick",
        middlename: null,
        lastname: "Corasaniti",
        qualifier: null,
        title: null,
        role: "reported",
        organization: "",
        rank: 1,
      },
    ],
    organization: null,
  },
  type_of_material: "News",
  _id: "nyt://article/46c671f3-09ab-55b7-80e2-f1620110d42c",
  word_count: 870,
  uri: "nyt://article/46c671f3-09ab-55b7-80e2-f1620110d42c",
};

const nyTimesApiKey = import.meta.env.VITE_NY_TIMES_API_KEY;

// const fetchArticles = async () => {
//   const response = await axios.get("http://localhost:3000/api/articles");

//   return response.data;
// };

function App() {
  const [count, setCount] = useState(0);

  const postData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/articles",
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchArticles();
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching articles:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <button
        onClick={() => {
          postData();
        }}
      >
        Post Data
      </button>
    </div>
  );
}

export default App;
