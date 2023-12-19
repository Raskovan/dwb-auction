import React from "react";

const AuctionHelp = () => {
  return (
    <div>
      <h1>Welcome to the NRC Stupa Auction!</h1>
      <p>All money collected through the auction will go to the NRC Stupa of Complete Victory project.</p>
      <div style={{ fontSize: "0.8rem" }}>
        <p style={{ fontWeight: 500, marginBottom: 0 }}>How does it work?</p>
        <ol style={{ lineHeight: 1.3, paddingInlineStart: "2rem", marginTop: 0 }}>
          <li>The auction is only available for logged-in DW-connect users.</li>
          <li>Some items you see are on sale already, and some are just announced. For the announced ones, you cannot make bids.</li>
          <li>
            Like something? Bid on it. Click on the item picture and click the “Place your bid” button. Enter the price you are willing to
            pay and hit “Place your bid”!
          </li>
          <li>
            The auction will remain active until each item’s page deadline, usually a few weeks. If you win, we will connect with you to
            congratulate you! If not, you get an email with “outbid” information.
          </li>
        </ol>
        <p style={{ fontWeight: 500, marginBottom: 0 }}>How to pay?</p>
        <ol style={{ lineHeight: 1.3, paddingInlineStart: "2rem", marginTop: 0 }}>
          <li>
            We request all payments through a check to avoid paying fees. Please contact the Finance team{" "}
            <a href="mailto:nrcstupa@diamondway.org">(nrcstupa@diamondway.org)</a> to arrange this.
          </li>
          <li>
            If you cannot pay with the check, contact <a href="mailto:krvss@hotmail.com">krvss@hotmail.com</a>
          </li>
        </ol>
        <p style={{ fontWeight: 500, marginBottom: 0 }}>How to ship?</p>
        <ol style={{ lineHeight: 1.3, paddingInlineStart: "2rem", marginTop: 0 }}>
          <li>
            Once we connect you with the seller you have the following options:
            <ul style={{ paddingLeft: "16px" }}>
              <li>Seller covers the shipment</li>
              <li>Buyer covers the shipment</li>
              <li>Both buyer and seller cover the shipment</li>
              <li>The seller can drop the item at the NRC and the buyer can come to pick it up on the course.</li>
              <li>You can send it with some traveling friends for free.</li>
            </ul>
          </li>
          <li>Cannot figure it out? Talk to the Auction team!</li>
        </ol>
        <p style={{ fontWeight: 500, marginBottom: 0 }}>How to stay updated? </p>
        <p>
          Join the{" "}
          <a
            href="https://signal.group/#CjQKIAYnT0fmMttHr-k0P77nX3iD0iBuAL8QYuXIPxdroC8vEhA-gu0dDTqSFsmrMI6ntKuN"
            target="_blank"
            rel="noreferrer"
          >
            Signal group
          </a>{" "}
          to stay connected!
        </p>
      </div>
    </div>
  );
};

export default AuctionHelp;
