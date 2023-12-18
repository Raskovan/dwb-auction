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

  const { data: bidsData, hasNextPage: bidsHasNextPage, fetchNextPage: fetchBidsNextPage } = useBidsByItemId(itemId, 10, showBidHistory);
  const itemOnPreview = itemById?.state === "ANNOUNCED";

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
    // bidsRefetch();
  };

  const handlePlaceBid = () => {
    setShowPlaceBid(!showPlaceBid);
  };

  return (
    <div ref={ref}>
      <div onClick={() => navigate(-1)} style={{ marginBottom: "32px" }}>
        <p style={{ cursor: "pointer", color: "#d22238", marginBottom: 0 }}>{"< Go back"}</p>
      </div>
      <div className={classes.container}>
        <div style={{ width: "50vw", marginRight: "20px" }}>
          <div style={{ height: "50vw", width: "50vw" }}>
            <img
              src={itemById?.images[viewableImageIndex].url}
              alt={itemById?.images[viewableImageIndex].id}
              width="100%"
              height="100%"
              className={classes.image}
            />
          </div>
          {itemById?.images && itemById?.images.length > 1 ? (
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
          ) : null}
        </div>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>{itemById?.title}</h1>
          <p>{itemById?.description}</p>
          {itemById?.seller?.name && <p className={classes.caption}>Provided by {itemById?.seller?.name}</p>}
          <p className={classes.caption}>
            {itemOnPreview ? "Starts" : "Started"} on {formatDate(itemById?.startTime, true)}
          </p>
          {!itemOnPreview && <p className={classes.caption}>Ends on {formatDate(itemById?.endTime, true)}</p>}
          {itemOnPreview ? (
            <div style={{ marginBottom: "20px", marginTop: "20px" }}>
              <h3 style={{ fontSize: "1.3rem", marginRight: "10px" }}>Start price: ${itemById?.currentPrice}</h3>
            </div>
          ) : (
            <div style={{ marginBottom: "20px", marginTop: "20px" }}>
              <h3 style={{ fontSize: "1.3rem", marginRight: "10px" }}>Current bid: ${itemById?.currentPrice}</h3>
              <button className={classes.button_as_text} onClick={() => handleShowBidHistory()}>
                {showBidHistory ? "Hide bid history" : "Show bid history"}
              </button>
            </div>
          )}
          {showBidHistory && bidsData ? (
            <div>
              {bidsData.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.bidsByItemId.nodes.map((bid, index) => (
                    <p key={index} style={{ fontSize: "0.8rem", marginBottom: 0 }}>
                      <b>${bid.newPrice}</b> by {bid.bidder?.name || "Unknown"} on {formatDate(bid.bidTime)}{" "}
                      {bid.message ? `with message: ${bid.message}` : null}
                    </p>
                  ))}
                </React.Fragment>
              ))}
              {bidsHasNextPage && (
                <p style={{ fontSize: "0.8rem", marginBottom: 0, cursor: "pointer", color: "#d22238" }} onClick={() => fetchBidsNextPage()}>
                  previous bids
                </p>
              )}
            </div>
          ) : null}
          {!itemOnPreview && (
            <div style={{ marginTop: "50px" }}>
              <button className={classes.bid_button} onClick={() => handlePlaceBid()}>
                Place your bid
              </button>
            </div>
          )}
        </div>
      </div>
      {showPlaceBid && <PlaceBidForm handleShowPlaceBid={setShowPlaceBid} itemId={itemId} currentPrice={itemById?.currentPrice} />}
    </div>
  );
};

export default ItemOnSale;
