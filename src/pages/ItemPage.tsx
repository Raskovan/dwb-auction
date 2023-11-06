import React from "react";
import { useItemById } from "../data-loaders";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ItemOnSale from "../components/ItemOnSale";

const ItemPage = () => {
  const { itemId } = useParams();
  const { data, isLoading } = useItemById(itemId);

  return (
    <div>
      <Header />
      <div style={{ padding: "50px 8vmin" }}>
        {isLoading || !data || !itemId ? <p>Loading...</p> : <ItemOnSale itemId={itemId} itemById={data?.itemById} />}
      </div>
    </div>
  );
};

export default ItemPage;
