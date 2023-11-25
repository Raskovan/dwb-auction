import React from "react";
import { useItemById } from "../data-loaders";
import { useParams } from "react-router-dom";
import ItemOnSale from "../components/ItemOnSale";

const ItemPage = () => {
  const { itemId } = useParams();
  const { data, isLoading } = useItemById(itemId);

  return <div>{isLoading || !data || !itemId ? <p>Loading...</p> : <ItemOnSale itemId={itemId} itemById={data?.itemById} />}</div>;
};

export default ItemPage;
