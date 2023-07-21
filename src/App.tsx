import { useState } from "react";
import "./App.css";

type ClickPoint = {
  x: number;
  y: number;
};

function App() {
  const [points, setPoints] = useState<ClickPoint[]>([]);
  const [popped, setPopped] = useState<ClickPoint[]>([]);

  function handlePlaceCircle(e: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = e;
    setPoints([
      ...points,
      {
        x: clientX,
        y: clientY,
      },
    ]);
  }

  const handleUndo = () => {
    const newPoints = [...points];
    const poppedPoints = newPoints.pop();
    if (!poppedPoints) return;
    setPopped([...popped, poppedPoints]);
    setPoints(newPoints);
  };
  const handleRedo = () => {
    const newPopped = [...popped];
    const redoPoints = newPopped.pop();
    if (!redoPoints) return;
    setPoints([...points, redoPoints]);
    setPopped(newPopped);
  };
  return (
    <>
      {points.length > 0 ? <button onClick={handleUndo}>Undo</button> : null}
      {popped.length > 0 ? <button onClick={handleRedo}>Redo</button> : null}
      <div className="App" onClick={handlePlaceCircle}>
        {points.map((point, index) => (
          <div
            key={index}
            className="point"
            style={{
              left: point.x + "px",
              top: point.y + "px",
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
