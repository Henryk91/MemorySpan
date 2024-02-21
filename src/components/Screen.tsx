import React from "react";

function Screen({
  retVal,
  calc,
  message,
  active = false,
  span,
}: {
  retVal: string;
  calc: string;
  message: string;
  active?: boolean;
  span: number;
}) {
  return (
    <div id="displayScreen">
      {message !== "" ? (
        <div className="messageBox">{message}</div>
      ) : (
        <>
          {active ? (
            <div className="messageBox" id="display">
              {calc}
            </div>
          ) : (
            <div id="insideScreen">
              <div className="infoBlock textLeft">
                <div>Score: {retVal}</div>
                <div>Span: {span}</div>
              </div>
              <div className="infoBlock textRight center">
                <div id="display">{calc}</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default Screen;
