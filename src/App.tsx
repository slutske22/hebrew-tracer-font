import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/hebrew";

function App() {
  return (
    <>
      <Keyboard layout={layout.layout} />
    </>
  );
}

export default App;
