import React, { useState } from "react";

const StringArea = ({ text, max }) => {
  const [showFullText, setShowFullText] = useState(false);

  const handleClick = () => {
    setShowFullText(!showFullText);
  };

  let shortText = text;
  if (text.length > max && !showFullText) {
    shortText = text.substring(0, max) + "...";
  }

  return <p onClick={handleClick}>{shortText}</p>;
};

export default StringArea;
