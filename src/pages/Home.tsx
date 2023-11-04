import React from "react";
import "../App.css";
import { useItemsOnSale } from "../data-loaders";
import { Link } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  const { status, data } = useItemsOnSale();

  return (
    <div className="App">
      <header className="App-header">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          data?.itemsOnSale?.nodes.map((itemOnSale, index) => (
            <div key={index}>
              <img src={itemOnSale.images[0].url} alt={itemOnSale.images[0].id} />
              <Link to={`items/${itemOnSale.id}`}>
                <p>{itemOnSale.title}</p>
              </Link>

              <p>About: {itemOnSale.description}</p>
              <p>Current bid: ${itemOnSale.currentPrice}</p>
            </div>
          ))
        )}
      </header>
    </div>
  );
};

export default Home;
