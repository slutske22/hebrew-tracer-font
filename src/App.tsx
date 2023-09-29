import { ChangeEventHandler, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/hebrew";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import "./App.scss";
import { styled } from "styled-components";
import { Menubar } from "primereact/menubar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { AiOutlinePrinter, AiOutlineFontSize } from "react-icons/ai";
import { BsKeyboard } from "react-icons/bs";

const LINE_HEIGHT = "140px";
const FONT_SIZE = "60px";

const PageWrapper = styled.main`
  border: 0.5px solid black;
  box-shadow: 15px 15px 25px grey;
  height: 8.5in;
  width: 11in;
  margin: 40px auto;

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

  &:focus {
    outline: none;
    border: none;
  }
`;

const GuideLine = styled.div<{ index: number }>`
  height: ${FONT_SIZE};
  border-bottom: 1px solid grey;
  border-top: 1px solid grey;
  width: calc(11in - 6rem);
  position: absolute;
  margin-left: 3rem;
  top: ${(props) =>
    `calc(3rem + (${LINE_HEIGHT} - ${FONT_SIZE}) / 2 +  ${LINE_HEIGHT} * ${props.index})`};
  z-index: -10;

  &:after {
    content: "";
    border-top: 1px dashed lightgrey;
    width: 100%;
    position: absolute;
    top: 50%;
    z-index: -10;
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
      <Menubar
        start={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "auto",
            }}
          >
            <img
              src="./favicon.svg"
              style={{ height: "30px", margin: "0 16px" }}
            />
            <h3>Hebrew Tracing Page Generator</h3>
          </div>
        }
        model={[
          {
            label: "Formatting",
            icon: (
              <AiOutlineFontSize size={24} style={{ marginRight: "10px" }} />
            ),
          },
          {
            label: "Keyboard",
            icon: <BsKeyboard size={24} style={{ marginRight: "10px" }} />,
          },
          {
            label: "Print",
            command: handlePrint,
            icon: (
              <AiOutlinePrinter size={24} style={{ marginRight: "10px" }} />
            ),
          },
        ]}
      />
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

      {/* <Keyboard layout={layout.layout} onChange={(e) => setContent(e)} /> */}

      <ReactToPrint content={() => pageRef.current} />
    </>
  );
};

export default App;
