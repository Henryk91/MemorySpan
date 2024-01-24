import React from "react";

function Screen({ retVal, calc, message, span }: { retVal: string; calc: string; message: string; span: number }) {
  return (
    <div id="displayScreen">
      {message !== "" ? (
        <div id="messageBox">{message}</div>
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
    </div>
  );
}
export default Screen;
