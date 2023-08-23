import React from "react";

function FormatedTime(props) {
  const date = new Date(props.timestamp || props.children);

  // Format the date and time as a string
  const formattedDateTime = `${date.toLocaleTimeString()} • ${date.toLocaleDateString()}`;

  return <span>{formattedDateTime}</span>;
}

export default FormatedTime;
