import React from "react";
import { useItemById } from "../data-loaders";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ItemOnSale from "../components/ItemOnSale";
import PlaceBidForm from "../components/PlaceBidForm";

const ItemPage = () => {
  const { itemId } = useParams();
  const { status, data } = useItemById(itemId);

  return (
    <div>
      <Header />
      {status === "loading" || !data || !itemId ? (
        <p>Loading...</p>
      ) : (
        <div style={{ padding: "50px 30px" }}>
          <ItemOnSale itemId={itemId} itemById={data?.itemById} />
        </div>
      )}
      {/* <PlaceBidForm /> */}
    </div>
  );
};

export default ItemPage;
