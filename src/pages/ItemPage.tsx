import React from "react";
import { useBidsByItemId, useItemById } from "../data-loaders";
import { useParams } from "react-router-dom";

const ItemPage = () => {
  const { itemId } = useParams();
  const { status, data } = useItemById(itemId!);
  const { data: bidsData, refetch: bidsRefetch } = useBidsByItemId(itemId!);

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    // Extract date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format the date string
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  };

  return (
    <div className="App">
      <header className="App-header">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          <div>
            <img src={data?.itemById?.images[0].url} alt={data?.itemById?.images[0].id} />
            <p>{data?.itemById?.title}</p>
            <p>{data?.itemById?.description}</p>
            <p>Submitted: {formatDate(data?.itemById?.startTime)}</p>
            <p>Ends: {data?.itemById?.endTime}</p>
            <p>Current bid: ${data?.itemById?.currentPrice}</p>
            <p>Seller: {data?.itemById?.seller?.name}</p>
            <button onClick={() => bidsRefetch()}>Show bid history</button>
            {bidsData
              ? bidsData.bidsByItemId.nodes.map((bid, index) => (
                  <div key={index}>
                    <p>
                      {formatDate(bid.bidTime)} - {bid.bidder?.name}: ${bid.newPrice}
                    </p>
                  </div>
                ))
              : null}
          </div>
        )}
      </header>
    </div>
  );
};

export default ItemPage;
