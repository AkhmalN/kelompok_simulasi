import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import "../src/index.css";

import wordsToNumbers from "words-to-numbers";
const alanKey =
  "0ae818d1daa3fe3eb7701bcc948647b82e956eca572e1d8b807a3e2338fdd0dc/stage";
function App() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          console.log(articles);
          setNewsArticles(articles);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];
          window.open(article.url, "_blank");

          // if (parsedNumber > 20) {
          //   alanBtn.playText("Please try that again");
          // } else if (article) {
          //   window.open(article.url, "_blank");
          //   alanBtn.playText("Opening...");
          // }
          // console.log(number);
        }
      },
    });
  }, []);
  return (
    <div className="">
      <div
        style={{
          padding: "0 5%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          // [theme.breakpoints.down("sm")]: {
          //   flexDirection: "column-reverse",
          //   textAlign: "center",
          // },
        }}
      >
        <img
          src="https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_1280.jpg"
          alt="Logo"
          style={{
            height: "27vmin",
            borderRadius: "15%",
            padding: "0 5%",
            margin: "3% 0",
            // [theme.breakpoints.down('sm')]: {
            //   height: '35vmin',
            // },
          }}
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
