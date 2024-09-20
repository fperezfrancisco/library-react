import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Rating({ rating }) {
  return (
    <div className="book__ratings">
      {new Array(Math.floor(rating)).fill(0).map((_, index) => (
        <FontAwesomeIcon icon={faStar} key={index} />
      ))}
      {!Number.isInteger(rating) && <FontAwesomeIcon icon={faStarHalfAlt} />}
    </div>
  );
}

export default Rating;
