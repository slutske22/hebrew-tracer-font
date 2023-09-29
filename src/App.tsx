import { ChangeEventHandler, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/hebrew";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import "./App.scss";
import { styled } from "styled-components";

const LINE_HEIGHT = "140px";
const FONT_SIZE = "60px";

const PageWrapper = styled.main`
  border: 0.5px solid black;
  box-shadow: 15px 15px 25px grey;
  width: 1000px;
  aspect-ratio: 11 / 8.5;
  margin: 40px auto;

  #page-view-content {
    position: relative;
    display: flex;
  }

  .guides {
    display: flex;
    flex-direction: column;
    position: absolute;
    padding: 3rem;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`;

const TextArea = styled.textarea`
  margin: 3rem;
  flex: 1;
  resize: none;
  overflow: hidden;
  font-size: ${FONT_SIZE};
  line-height: ${LINE_HEIGHT};
  min-height: 50px;
  font-family: sans-serif;
  width: 100%;
  background-color: transparent;
  border: 1px solid green;

  &:focus {
    outline: none;
    border: 1px solid green;
  }
`;

const GuideLine = styled.div<{ index: number }>`
  height: ${FONT_SIZE};
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  width: calc(100% - 6rem);
  position: absolute;
  top: ${(props) =>
    `calc(3rem + (${LINE_HEIGHT} - ${FONT_SIZE}) / 2 +  ${LINE_HEIGHT} * ${props.index})`};

  &:after {
    content: "";
    border-top: 1px dashed blue;
    width: 100%;
    position: absolute;
    top: 50%;
  }
`;

/**
 * Main App component
 */
const App = () => {
  const [content, setContent] = useState(" ");
  const [lines, setLines] = useState(1);

  const pageRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePrint = useReactToPrint({
    content: () => pageRef.current,
  });

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);

    e.target.style.height = "5px";
    e.target.style.height = e.target.scrollHeight + "px";

    const numberOfLines = Math.round(
      Number(getComputedStyle(e.target).height.replace("px", "")) /
        Number(getComputedStyle(e.target).lineHeight.replace("px", ""))
    );

    setLines(numberOfLines);
  };

  return (
    <>
      <PageWrapper id="page-view-wrapper">
        <div ref={pageRef} id="page-view-content">
          <TextArea ref={textareaRef} onChange={onChange} value={content} />

          <div className="guides">
            {Array.from({ length: lines }).map((_, i) => (
              <GuideLine key={i} index={i} />
            ))}
          </div>
        </div>
      </PageWrapper>
      {/* 
      <Keyboard layout={layout.layout} onChange={(e) => setContent(e)} /> */}

      <ReactToPrint content={() => pageRef.current} />

      <button onClick={handlePrint}>Print!</button>
    </>
  );
};

export default App;
