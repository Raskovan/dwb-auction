import React from "react";
import { useCreateOrUpdateUser, useItemsOnSale } from "../data-loaders";
import ItemOnSaleCard from "../components/ItemOnSaleCard";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";
import classes from "../styles/Home.module.css";
import { useCatalogUpdatesSubscription } from "../hooks/useCatalogUpdatesSubscription";

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

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div ref={ref} className={classes.items_grid}>
          {data?.itemsOnSale?.nodes
            .filter(item => item.state === "ON_SALE")
            .map((itemOnSale, index) => (
              <ItemOnSaleCard key={index} itemOnSale={itemOnSale} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
