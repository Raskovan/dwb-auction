import React from "react";
import { useItemById } from "../data-loaders";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import ItemOnSale from "../components/ItemOnSale";

const ItemPage = () => {
  const { itemId } = useParams();
  const { data, isLoading } = useItemById(itemId);

  return (
    <div>
      <Header />
      {isLoading || !data || !itemId ? (
        <p>Loading...</p>
      ) : (
        <div style={{ padding: "50px 30px" }}>
          <Link to="/">
            <p>{"< Go back to the list"}</p>
          </Link>
          <ItemOnSale itemId={itemId} itemById={data?.itemById} />
        </div>
      )}
    </div>
  );
};

export default ItemPage;
