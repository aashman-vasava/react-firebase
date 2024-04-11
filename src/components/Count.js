import { useState } from "react";

export const Count = () => {
  const [count, setCount] = useState(5);

  function decre() {
    setCount((prev) => prev - 1);
  }
  function incre() {
    setCount((prev) => prev + 1);
  }
  return (
    <div>
      <button onClick={decre}>-</button>
      <span>{count}</span>
      <button onClick={incre}>+</button>
    </div>
  );
};
