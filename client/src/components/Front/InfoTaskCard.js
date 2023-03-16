import React from "react";

function InfoTaskCard({ data }) {
  return (
    <div className="info-task-card">
      {data.title}
      {console.log(data)}
    </div>
  );
}

export default InfoTaskCard;
