import React from "react";
import { useBidsByItemId } from "../data-loaders";
import { Item } from "../gql/graphql";
import { formatDate } from "../helpers";
import classes from "../styles/ItemOnSale.module.css";
import PlaceBidForm from "./PlaceBidForm";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { useItemUpdateSubscription } from "../hooks/useItemUpdateSubscription";

type ItemOnSaleProps = {
  itemId: string;
  itemById: Item | undefined | null;
};

const ItemOnSale: React.FC<ItemOnSaleProps> = ({ itemId, itemById }) => {
  const [showBidHistory, setShowBidHistory] = React.useState(false);
  const [showPlaceBid, setShowPlaceBid] = React.useState(false);
  const [viewableImageIndex, setViewableImageIndex] = React.useState(0);
  const navigate = useNavigate();
  const ref = React.useRef<HTMLDivElement>(null);

  const { data: bidsData, refetch: bidsRefetch } = useBidsByItemId(itemId, 10, showBidHistory);

  const updateDimension = () => {
    window?.top?.postMessage({ actions: [{ action: "setHeight", valuePx: ref?.current?.clientHeight }] }, "*");
  };

  useItemUpdateSubscription(itemId);

  React.useEffect(() => {
    window.addEventListener("resize", debounce(updateDimension, 50));
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, []);

  React.useEffect(() => {
    updateDimension();
  }, [itemById, showBidHistory]);

  const handleShowBidHistory = () => {
    setShowBidHistory(!showBidHistory);
    bidsRefetch();
  };

  const handlePlaceBid = () => {
    setShowPlaceBid(!showPlaceBid);
  };

  return (
    <div ref={ref}>
      <div className={classes.container}>
        <div style={{ width: "50vw", marginRight: "20px" }}>
          <div className={classes.image_container}>
            <img
              src={itemById?.images[viewableImageIndex].url}
              alt={itemById?.images[viewableImageIndex].id}
              width="100%"
              height="100%"
              className={classes.image}
            />
          </div>
          {/* {itemById?.images && itemById?.images.length > 1 ? (
            <div style={{ marginTop: "20px" }}>
              {itemById?.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.id}
                  width="100%"
                  height="100%"
                  className={classes.preview_image}
                  style={{ borderColor: viewableImageIndex === index ? "#d22238" : "inherit" }}
                  onClick={() => setViewableImageIndex(index)}
                />
              ))}
            </div>
          ) : null} */}
        </div>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "10px" }}>{itemById?.title}</h1>
          <p>{itemById?.description}</p>
          <p>Provided by {itemById?.seller?.name}</p>
          {/* <p>Submitted: {formatDate(itemById?.startTime)}</p> */}
          {/* <p>Ends: {itemById?.endTime}</p> */}
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1.3rem", marginRight: "10px" }}>Current bid: ${itemById?.currentPrice}</h3>
            <button className={classes.button_as_text} onClick={() => handleShowBidHistory()}>
              {showBidHistory ? "Hide bid history" : "Show bid history"}
            </button>
          </div>
          <div>
            {showBidHistory && bidsData
              ? bidsData.bidsByItemId.nodes.map((bid, index) => (
                  <p key={index} style={{ fontSize: "0.8rem", marginBottom: 0 }}>
                    <b>Bid ${bid.newPrice}</b> posted by {bid.bidder?.name || "Unknown"} on {formatDate(bid.bidTime)}{" "}
                    {bid.message ? `with message: ${bid.message}` : null}
                  </p>
                ))
              : null}
          </div>
          <div style={{ marginTop: "50px" }}>
            <button onClick={() => handlePlaceBid()}>Place your bid</button>
          </div>
        </div>
      </div>
      {showPlaceBid && <PlaceBidForm handleShowPlaceBid={setShowPlaceBid} itemId={itemId} currentPrice={itemById?.currentPrice} />}
      <div onClick={() => navigate(-1)} style={{ marginTop: "32px" }}>
        <p style={{ cursor: "pointer", color: "#d22238", marginBottom: 0 }}>{"< Go back"}</p>
      </div>
    </div>
  );
};

export default ItemOnSale;
