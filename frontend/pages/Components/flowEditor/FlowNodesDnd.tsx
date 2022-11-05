import React from "react";

export default () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    console.log(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const style = {
    height: "20px",
    padding: "10px",
    backgroundColor: "var(--custom-dark-blue)",
    color: "white",
    borderRadius: "10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "grab",
  };

  return (
    <>
      {/* <div
        style={style}
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div> */}
      <div
        style={style}
        onDragStart={(event) => onDragStart(event, "sendMail")}
        draggable
      >
        Trimite e-mail
      </div>
      <div
        style={style}
        onDragStart={(event) => onDragStart(event, "sendMail")}
        draggable
      >
        Completeaza formular
      </div>
    </>
  );
};
