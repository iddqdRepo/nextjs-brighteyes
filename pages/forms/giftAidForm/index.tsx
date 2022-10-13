import React, { useState } from "react";

const Index = () => {
  const [render, setRender] = useState([1]);

  const doRender = () => {
    console.log("DORENDEr");
    let temp = render;
    temp.push(1);
    console.log(temp);
    setRender([...temp]);
  };

  return (
    <>
      <button onClick={doRender}>RERENDER</button>
    </>
  );
};

export default Index;

//^ paste below into adoptoionForm
