import { useEffect, useState } from "react";
import "./App.css";
import Article from "./article/Article";
import LoadingSymbol from "./dialog/loading/LoadingSymbol";
import Header from "./header/Header";

function App() {
  const sampleArticle = {
    title: "What is a String?",
    tags: ["Python", "Datatypes"],
    question: {
      id: 1,
      type:"QUESTION",
      content: "I'm confused by String. Should I use Strings in my program? ", // TODO use markdown,
      upvotes: 10,
      comments: [
        {
          id: 1,
          content: "This.",
          author: {
            name: "monica4president",
            rating: 5
          }
        },
        {
          id: 2,
          content: "Why do you want a String? Strings are bad practice. This sounds like an XY problem.",
          author: {
            name: "user908235",
            rating: 2
          }
        }
      ],
      timestamp: "2015-01-01T00:00:00.000Z",
      author: {
        name: "Jay",
        rating: 5,
      },
    },
    answers: [
      {
        id: 2,
        type:"ANSWER",
        content: "Quotations and stuff. Not important. Do not use.",
        upvotes: 100,
        comments: [],
        timestamp: "2015-02-02T00:00:00.000Z",
        selected: true,
        author: {
          name: "Tom",
          rating: 2
        }
      },
      {
        id: 3,
        type:"ANSWER",
        content: "Check out this link. https://google.com",
        upvotes: -3,
        comments: [],
        timestamp: "2015-02-03T00:00:00.000Z",
        author: {
          name: "Thomas",
          rating: 5
        }
      },
    ],
  };
  const [article, setArticle] = useState(null)
  // Simulating slowness
  // TODO hit real API for data
  useEffect(() => {
    const timer = setTimeout(() => {
      setArticle(sampleArticle)
    }, 2000)
    return () => window.clearTimeout(timer)
  });
  return (
    <div className="App">
      <Header />
      <main>
        {article ? <Article article={article} /> : <LoadingSymbol/>}
      </main>
    </div>
  );
}

export default App;
