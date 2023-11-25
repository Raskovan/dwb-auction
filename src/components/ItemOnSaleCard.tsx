import React from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "../gql/graphql";
import classes from "../styles/ItemOnSaleCard.module.css";

type ItemOnSaleCardProps = {
  itemOnSale: Item;
};

const ItemOnSaleCard: React.FC<ItemOnSaleCardProps> = ({ itemOnSale }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.card_container} onClick={() => navigate(`items/${itemOnSale.id}`)}>
      <div className={classes.image_container}>
        <img
          src={itemOnSale.images[0].url}
          alt={itemOnSale.images[0].id}
          width="100%"
          height="100%"
          style={{ objectFit: "contain", border: "1px solid grey" }}
        />
      </div>
      <div className={classes.card_text_container}>
        <h1>{itemOnSale.title}</h1>
        <h3>Current bid: ${itemOnSale.currentPrice}</h3>
      </div>
    </div>
  );
};

export default ItemOnSaleCard;
