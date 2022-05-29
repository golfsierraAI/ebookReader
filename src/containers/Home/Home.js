import GenreWrapper from "components/genreWrapper";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import React from "react";
import { IconButton } from "@mui/material";
import { HashLoader } from "react-spinners";

const Home = () => {
  let [data, setData] = React.useState([]);
  let [images, setImages] = React.useState([]);
  let [mode, setMode] = React.useState("bright");
  React.useEffect(() => {
    fetchData();
    fetchImages();
  }, []);

  const fetchData = () => {
    fetch("https://ebooksbackend.herokuapp.com/get")
      .then((response) => {
        return response.json();
      })
      .then((apiData) => {
        setData(() => {
          return [...apiData.resources];
        });
      });
  };

  const fetchImages = () => {
    fetch("https://ebooksbackend.herokuapp.com/getImages")
      .then((response) => {
        return response.json();
      })
      .then((apiData) => {
        setImages(() => {
          return [...apiData.resources];
        });
      });
  };

  const getName = (name) => {
    name = name
      .substring(name.lastIndexOf("/") + 1)
      .replaceAll("-", " ")
      .replaceAll(".epub", "");

    name = name.substring(0, name.lastIndexOf("_"));
    return name;
  };

  const prepareProps = (data) => {
    let prps = [];
    prps.push(
      data.map((element) => {
        const name = getName(element.public_id);
        return {
          name,
          url: element.secure_url,
          genre: element.folder.substring(element.folder.lastIndexOf("/") + 1),
          imgUrl: images.find((e) => {
            const imageName = getName(e.public_id);
            if (name === imageName) {
              return e.secure_url;
            }
          })?.secure_url,
        };
      })
    );
    return prps;
  };
  const modeManager = (mode) => {
    console.log(mode);
    setMode(mode);
  };

  return data.length ? (
    <div style={{ backgroundColor: mode == "bright" ? "white" : "black" }}>
      {/* <h2
        style={{
          color: mode != "bright" ? "white" : "black",
          margin: 0,
          textAlign: "center",
          fontWeight: 800,
          fontSize: "40px",
        }}
      >
        Read books that fascinate you
      </h2> */}
      {mode === "bright" ? (
        <IconButton
          style={{ position: "absolute", top: 0, right: 0 }}
          size="large"
          onClick={() => modeManager("dark")}
          children={
            <DarkModeIcon
              fontSize="large"
              style={{ fill: mode != "bright" ? "" : "turquoise" }}
            />
          }
        />
      ) : (
        <IconButton
          onClick={() => modeManager("bright")}
          style={{ position: "absolute", top: 0, right: 0 }}
          size="large"
          children={
            <LightModeIcon
              fontSize="large"
              style={{ fill: mode != "bright" ? "yellow" : "black" }}
            />
          }
        />
      )}
      <GenreWrapper props={prepareProps(data)} mode={mode} />
    </div>
  ) : (
    <HashLoader
      color="teal"
      size={60}
      css={`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `}
    />
  );
};
export default Home;
