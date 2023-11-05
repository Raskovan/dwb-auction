import React from "react";
import { useItemsOnSale } from "../data-loaders";
import ItemOnSaleCard from "../components/ItemOnSaleCard";
import Header from "../components/Header";
import Intro from "../components/Intro";

const Home = () => {
  const { data, isLoading } = useItemsOnSale();

  return (
    <div>
      <Header />
      <Intro />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 300px))",
            gridGap: "2rem",
            gridAutoFlow: "dense",
            padding: "50px 50px",
            justifyContent: "center"
          }}
        >
          {data?.itemsOnSale?.nodes.map((itemOnSale, index) => (
            <ItemOnSaleCard key={index} itemOnSale={itemOnSale} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
