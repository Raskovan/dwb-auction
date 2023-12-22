import React from "react";
import { useCreateOrUpdateUser, useItemsOnSale } from "../data-loaders";
import ItemOnSaleCard from "../components/ItemOnSaleCard";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";
import classes from "../styles/Home.module.css";
import { useCatalogUpdatesSubscription } from "../hooks/useCatalogUpdatesSubscription";
import ItemAnnouncedCard from "../components/ItemAnnouncedCard";
import AuctionHelp from "../components/AuctionHelp";

const Home = () => {
  const { data, isLoading } = useItemsOnSale();

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const userName = searchParams.get("userName");
  const userEmail = searchParams.get("email");

  const ref = React.useRef<HTMLDivElement>(null);
  const mutation = useCreateOrUpdateUser(userId!, userName!, userEmail!);
  const updateDimension = () => {
    window?.top?.postMessage({ actions: [{ action: "setHeight", valuePx: ref?.current?.clientHeight }] }, "*");
  };

  React.useEffect(() => {
    window.addEventListener("resize", debounce(updateDimension, 50));
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, []);

  React.useEffect(() => {
    updateDimension();
  }, [data]);

  React.useEffect(() => {
    const getUserId = async () => {
      try {
        const res = await mutation.mutateAsync();
        localStorage.setItem("userId", res.createOrUpdateUser);
      } catch (err) {
        console.error(`Couldn't set a user for userId: ${userId} with error: ${err}`);
      }
    };

    if (userId && userName && userEmail) getUserId();
  }, [userId, userName, userEmail]);

  useCatalogUpdatesSubscription();
  const announcedItems = data?.itemsOnSale?.nodes.filter(item => item.state === "ANNOUNCED");
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div ref={ref} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className={classes.items_grid}>
            {data?.itemsOnSale?.nodes
              .filter(item => item.state === "ON_SALE")
              .map((itemOnSale, index) => (
                <ItemOnSaleCard key={index} itemOnSale={itemOnSale} />
              ))}
          </div>
          {announcedItems && announcedItems.length > 0 && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <h1 style={{ color: "grey" }}>Coming up soon</h1>
              </div>
              <div className={classes.items_grid}>
                {announcedItems
                  ?.filter(item => item.state === "ANNOUNCED")
                  .map((itemOnSale, index) => (
                    <ItemAnnouncedCard key={index} itemOnSale={itemOnSale} />
                  ))}
              </div>
            </div>
          )}
          <div>
            <hr style={{ height: "1px", border: "none", color: "grey", backgroundColor: "grey", marginBottom: "20px" }} />
            <AuctionHelp />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
