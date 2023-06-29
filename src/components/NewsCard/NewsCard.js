import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { createRef, useEffect, useState } from "react";
import "./style.css";

const NewsCard = ({
  article: { description, publishedAt, source, title, url, urlToImage },
  index,
  activeArticle,
}) => {

  const [elRefs, setElRefs] = useState([]);

  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);
  useEffect(() => {
    setElRefs((refs) =>
      Array(20)
        .fill()
        .map((_, j) => refs[j] || createRef())
    );
  }, []);

  useEffect(() => {
    if (index === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [index, activeArticle, elRefs]);
  return (
    <>
      <Card
        ref={elRefs[index]}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        className={activeArticle - 1 === index ? "activeCard" : "normalCard"}
      >
        <CardActionArea href={url} target="_blank">
          <CardMedia
            style={{ height: 250 }}
            image={
              urlToImage ||
              "https://cdn.pixabay.com/photo/2013/07/12/19/16/newspaper-154444_1280.png"
            }
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px",
            }}
          >
            <Typography variant="body2" color="textSecondary" component="h2">
              {new Date(publishedAt).toDateString()}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="h2">
              {source.name}
            </Typography>
          </div>
          <Typography gutterBottom variant="h5" style={{ padding: "0 16px" }}>
            {title}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{
            padding: "0 16px 8px 16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button size="small" color="primary">
            Learn More
          </Button>
          <Typography variant="h5" color="textSecodary">
            {index + 1}
          </Typography>
        </CardActions>
      </Card>
    </>
  );
};

export default NewsCard;
