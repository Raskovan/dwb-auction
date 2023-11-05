import React from "react";
import classes from "../styles/PlaceBidForm.module.css";
type PlaceBidFormProps = {
  handleShowPlaceBid: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlaceBidForm: React.FC<PlaceBidFormProps> = ({ handleShowPlaceBid }) => {
  return (
    <div className={classes.form_popup} id="myForm">
      <div className={classes.popup_inner}>
        <form action="/action_page.php" className={classes.form_container}>
          {/* <h1>Login</h1> */}
          <label htmlFor="email">
            <b>Name</b>
          </label>
          <input type="text" placeholder="Enter Name" name="email" required />
          <label htmlFor="bidw">
            <b>Bid</b>
          </label>
          <input type="password" placeholder="Enter Bid" name="bid" required />
          <button type="submit" className={classes.btn}>
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
