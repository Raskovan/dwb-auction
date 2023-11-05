import React from "react";
import classes from "../styles/PlaceBidForm.module.css";
import { useMakeBidByItemId } from "../data-loaders";
import { useQueryClient } from "@tanstack/react-query";

type PlaceBidFormProps = {
  handleShowPlaceBid: React.Dispatch<React.SetStateAction<boolean>>;
  itemId: string | undefined;
  currentPrice: number | undefined;
};

const PlaceBidForm: React.FC<PlaceBidFormProps> = ({ handleShowPlaceBid, itemId, currentPrice = 0 }) => {
  const [bidFormData, setBidFormData] = React.useState({
    newPrice: (currentPrice + 1).toString(),
    message: "",
    itemId: itemId,
    bidderId: "3"
  });

  const ref = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current === event.target) handleShowPlaceBid(false);
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleShowPlaceBid]);

  const queryClient = useQueryClient();

  const mutation = useMakeBidByItemId(
    bidFormData.itemId!,
    bidFormData.bidderId,
    parseInt(bidFormData.newPrice),
    bidFormData.message,
    queryClient
  );

  const onSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutation.mutateAsync();
    handleShowPlaceBid(false);
  };

  const onBidFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setBidFormData({ ...bidFormData, [name]: value });
  };

  return (
    <div className={classes.form_popup} id="bidForm" ref={ref}>
      <div className={classes.popup_inner}>
        <form onSubmit={onSubmitBid} className={classes.form_container}>
          <label htmlFor="bidw">
            <b>Bid</b>
          </label>
          <input
            type="number"
            min={currentPrice + 1}
            value={bidFormData.newPrice}
            onChange={e => onBidFormChange(e)}
            placeholder="Your bid"
            name="newPrice"
            required
          />
          <label htmlFor="message">Message (optional)</label>
          <textarea onChange={e => onBidFormChange(e)} placeholder="Your message" name="message" cols={40} rows={3} />
          <button
            type="submit"
            className={classes.btn}
            disabled={!parseInt(bidFormData.newPrice) || parseInt(bidFormData.newPrice) <= currentPrice}
          >
            Place your bid
          </button>
          <button type="button" className={[classes.btn, classes.cancel].join(" ")} onClick={() => handleShowPlaceBid(false)}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceBidForm;
