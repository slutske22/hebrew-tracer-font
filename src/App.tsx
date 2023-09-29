import { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/hebrew";
import ReactToPrint, { useReactToPrint } from "react-to-print";

function App() {
  const [content, setContent] = useState("");
  const pageRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => pageRef.current,
  });

  return (
    <>
      <div id="page-view" ref={pageRef}>
        {content}
      </div>
      <Keyboard layout={layout.layout} onChange={(e) => setContent(e)} />

      <ReactToPrint content={() => pageRef.current} />

      <button onClick={handlePrint}>Print!</button>
    </>
  );
}

export default App;
