import React from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "../gql/graphql";

type ItemOnSaleCardProps = {
  itemOnSale: Item;
};

const ItemOnSaleCard: React.FC<ItemOnSaleCardProps> = ({ itemOnSale }) => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column", cursor: "pointer" }} onClick={() => navigate(`items/${itemOnSale.id}`)}>
      <div style={{ width: "300px", height: "300px" }}>
        <img
          src={itemOnSale.images[0].url}
          alt={itemOnSale.images[0].id}
          width="100%"
          height="100%"
          style={{ objectFit: "contain", border: "1px solid grey" }}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <h1>{itemOnSale.title}</h1>
        <h3>Current bid: ${itemOnSale.currentPrice}</h3>
      </div>
    </div>
  );
};

export default ItemOnSaleCard;
