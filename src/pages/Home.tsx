import React from "react";
import { useCreateOrUpdateUser, useItemsOnSale } from "../data-loaders";
import ItemOnSaleCard from "../components/ItemOnSaleCard";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";
import classes from "../styles/Home.module.css";

const Home = () => {
  const { data, isLoading } = useItemsOnSale();
  const [searchParams] = useSearchParams();

  const ref = React.useRef<HTMLDivElement>(null);
  const mutation = useCreateOrUpdateUser(searchParams.get("userId")!, searchParams.get("userName")!, searchParams.get("email")!);
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
      const res = await mutation.mutateAsync();
      localStorage.setItem("userId", res.createOrUpdateUser);
    };
    if (searchParams.get("userId") && searchParams.get("userName") && searchParams.get("email") && !localStorage.getItem("userId"))
      getUserId();
  }, [searchParams]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div ref={ref} className={classes.items_grid}>
          {data?.itemsOnSale?.nodes.map((itemOnSale, index) => (
            <ItemOnSaleCard key={index} itemOnSale={itemOnSale} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
