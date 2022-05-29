import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { IconButton } from "@mui/material";

const BookWrapper = (props) => {
  const wrapperRef = useRef(null);
  const history = useNavigate();
  const scroll = (scrollOffset) => {
    wrapperRef.current.scrollLeft += scrollOffset;
  };
  return (
    <div className="iconsWrapper">
      <div ref={wrapperRef} className="imagesWrapper">
        {props.data.map((element, i) => {
          return element.genre === props.genres ? (
            <div key={i} className="book">
              <button
                key={element.url}
                onClick={() => {
                  window.bookUrl = element.url;
                  history("/books");
                }}
              >
                <img src={element.imgUrl} />
              </button>
            </div>
          ) : null;
        })}
      </div>
      <IconButton
        className="leftIconButton"
        onClick={() => scroll(-100)}
        children={
          <ChevronLeftIcon
            fontSize="large"
            style={{ fill: props.mode == "bright" ? "black" : "white" }}
            className="leftIcon"
          />
        }
      />
      <IconButton
        className="rightIconButton"
        onClick={() => scroll(100)}
        children={
          <ChevronRightIcon
            fontSize="large"
            style={{ fill: props.mode == "bright" ? "black" : "white" }}
            className="rightIcon"
          />
        }
      />
    </div>
  );
};

const GenreWrapper = ({ props, mode }) => {
  const [genres, setGenres] = React.useState(new Set());
  React.useEffect(() => {
    props[0].forEach((element) => {
      setGenres((genres) => {
        let data = new Set(genres);
        data.add(element.genre);
        return data;
      });
    });
  }, []);

  return (
    genres.size > 0 &&
    [...genres].map((element, i) => {
      return (
        <div key={i}>
          <h2
            className="genreHeading"
            style={{
              color: mode == "bright" ? "black" : "white",
              marginTop: 0,
              paddingTop: "15px",
            }}
          >
            {element}
          </h2>
          <BookWrapper genres={element} data={props[0]} mode={mode} />
        </div>
      );
    })
  );
};

export default GenreWrapper;
