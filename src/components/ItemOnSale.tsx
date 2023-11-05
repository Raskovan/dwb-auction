import React from "react";
import { useBidsByItemId } from "../data-loaders";
import { Item } from "../gql/graphql";
import { formatDate } from "../helpers";
import classes from "../styles/ItemOnSale.module.css";
import PlaceBidForm from "./PlaceBidForm";
import { Link } from "react-router-dom";

type ItemOnSaleProps = {
  itemId: string | undefined;
  itemById: Item | undefined | null;
};

const ItemOnSale: React.FC<ItemOnSaleProps> = ({ itemId, itemById }) => {
  const [showBidHistory, setShowBidHistory] = React.useState(false);
  const [showPlaceBid, setShowPlaceBid] = React.useState(false);

  const { data: bidsData, refetch: bidsRefetch } = useBidsByItemId(itemId, 10, showBidHistory);

  const handleShowBidHistory = () => {
    setShowBidHistory(!showBidHistory);
    bidsRefetch();
  };

  const handlePlaceBid = () => {
    setShowPlaceBid(!showPlaceBid);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.image_container}>
          <img src={itemById?.images[0].url} alt={itemById?.images[0].id} width="100%" height="100%" className={classes.image} />
        </div>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "10px" }}>{itemById?.title}</h1>
          <p>{itemById?.description}</p>
          <p>Provided by {itemById?.seller?.name}</p>
          {/* <p>Submitted: {formatDate(itemById?.startTime)}</p> */}
          {/* <p>Ends: {itemById?.endTime}</p> */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1.3rem", marginRight: "10px" }}>Current bid: ${itemById?.currentPrice}</h3>
            <button className={classes.button_as_text} onClick={() => handleShowBidHistory()}>
              {showBidHistory ? "Hide bid history" : "Show bid history"}
            </button>
          </div>
          <div>
            {showBidHistory && bidsData
              ? bidsData.bidsByItemId.nodes.map((bid, index) => (
                  <div key={index}>
                    <p style={{ fontSize: "0.8rem", lineHeight: "0.8" }}>
                      <b>Bid ${bid.newPrice}</b> posted by {bid.bidder?.name || "Unknown"} on {formatDate(bid.bidTime)}{" "}
                      {bid.message ? `with message: ${bid.message}` : null}
                    </p>
                  </div>
                ))
              : null}
          </div>
          <div style={{ marginTop: "50px" }}>
            <button onClick={() => handlePlaceBid()}>Place your bid</button>
          </div>
        </div>
      </div>
      {showPlaceBid && <PlaceBidForm handleShowPlaceBid={setShowPlaceBid} itemId={itemId} currentPrice={itemById?.currentPrice} />}
    </>
  );
};

export default ItemOnSale;
