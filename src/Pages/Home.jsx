import React from "react";
import Nav from "../Components/Nav";
import Landing from "../Components/Landing";
import Highlights from "../Components/Highlights";
import Featured from "../Components/Featured";
import Discounted from "../Components/Discounted";
import Explore from "../Components/Explore";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div>
      <Landing />
      <Highlights />
      <Featured />
      <Discounted />
      <Explore />
    </div>
  );
}

export default Home;
