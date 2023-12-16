import React from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "../gql/graphql";
import classes from "../styles/ItemOnSaleCard.module.css";
import { formatDate } from "../helpers";

type ItemAnnouncedCardProps = {
  itemOnSale: Item;
};

const ItemAnnouncedCard: React.FC<ItemAnnouncedCardProps> = ({ itemOnSale }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.card_container_announced} onClick={() => navigate(`items/${itemOnSale.id}`)}>
      <div className={classes.image_container_announced}>
        <img
          src={itemOnSale.images[0].url}
          alt={itemOnSale.images[0].id}
          width="100%"
          height="100%"
          style={{ objectFit: "contain", border: "1px solid grey" }}
        />
      </div>
      <div className={classes.card_text_container_announced}>
        <p className={[classes.secondary_title, classes.truncate_text].join(" ")}>{itemOnSale.title}</p>
        <p className={classes.caption}>Starts on {formatDate(itemOnSale.startTime, true)}</p>
      </div>
    </div>
  );
};

export default ItemAnnouncedCard;
