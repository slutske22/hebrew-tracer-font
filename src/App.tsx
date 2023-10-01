import { ChangeEventHandler, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/hebrew";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import "./App.scss";
import { styled } from "styled-components";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Menu } from "./Menu";
import clsx from "clsx";

const LINE_HEIGHT = "140px";
const FONT_SIZE = "60px";

const PageWrapper = styled.main`
  border: 0.5px solid black;
  box-shadow: 15px 15px 25px grey;
  height: 8.5in;
  width: 11in;
  margin: 40px auto;

  &.portrait {
    width: 8.5in;
    height: 11in;
  }

  #page-view-content {
    position: relative;
    width: calc(100% - 6rem);
    height: 100%;
  }

  .guides {
    display: flex;
    flex-direction: column;
    position: absolute;
    padding: 3rem 0;
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
  width: calc(11in - 6rem);
  background-color: transparent;
  border: none;
  text-align: right;
  direction: rtl;
  z-index: 5;
  letter-spacing: 5px;
  font-size-adjust: 0.6;

  .portrait & {
    width: calc(8in - 6rem);
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

const GuideLine = styled.div<{ index: number }>`
  height: ${FONT_SIZE};
  width: calc(11in - 6rem);
  position: absolute;
  margin-left: 3rem;
  top: ${(props) =>
    `calc(3rem + (${LINE_HEIGHT} - ${FONT_SIZE}) / 2 +  ${LINE_HEIGHT} * ${props.index})`};
  z-index: -10;

  .portrait & {
    width: calc(8in - 6rem);
  }

  &.top {
    border-top: 1px solid grey;
  }
  &.bottom {
    border-bottom: 1px solid grey;
  }
  &.middle {
    &:after {
      content: "";
      border-top: 1px dashed lightgrey;
      width: 100%;
      position: absolute;
      top: 50%;
      z-index: -10;
    }
  }
`;

/**
 * Main App component
 */
const App = () => {
  const [content, setContent] = useState(" ");
  const [lines, setLines] = useState(1);
  const [orientation, setOrientation] = useState<"landscape" | "portrait">(
    "landscape"
  );
  const [gridLines, setGridLines] = useState({
    top: true,
    middle: true,
    bottom: true,
  });
  const [keyboard, setKeyboard] = useState<"hebrew" | "qwerty" | undefined>(
    undefined
  );

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
      <Menu
        orientation={orientation}
        setOrientation={setOrientation}
        gridLines={gridLines}
        setGridLines={setGridLines}
        setKeyboard={setKeyboard}
        handlePrint={handlePrint}
      />

      <PageWrapper
        id="page-view-wrapper"
        className={clsx({ portrait: orientation === "portrait" })}
      >
        <div ref={pageRef} id="page-view-content">
          <TextArea ref={textareaRef} onChange={onChange} value={content} />

          <div className="guides">
            {Array.from({ length: lines }).map((_, i) => (
              <GuideLine
                key={i}
                index={i}
                className={clsx({
                  ...gridLines,
                })}
              />
            ))}
          </div>
        </div>
      </PageWrapper>

      {/* <Keyboard layout={layout.layout} onChange={(e) => setContent(e)} /> */}

      <ReactToPrint content={() => pageRef.current} />

      {orientation === "landscape" && (
        <style>
          {`
            @media print {
              @page {
                size: landscape;
              }
            }
        `}
        </style>
      )}
    </>
  );
};

export default App;
