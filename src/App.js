import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);

  useEffect(() => console.log("render"));
  useEffect(() => console.log("count changed: ", count), [count]);
  useEffect(() => console.log("toggle changed: ", toggle), [toggle]);
  useEffect(
    () => console.log("count or toggle changed:", count, toggle),
    [count, toggle]
  );
  useEffect(() => console.log("---------"));

  return (
    <div>
      <h1>count:{count}</h1>
      <button onClick={() => setCount(count + 1)}>up</button>
      <h1>current Toggle:{toggle.toString()}</h1>
      <button onClick={() => setToggle(!toggle)}>toggle</button>
    </div>
  );
}

export default App;
