import React, { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/hebrew";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import "./App.scss";
import { styled } from "styled-components";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Menu } from "./Menu";
import clsx from "clsx";
import { TextGroup } from "./TextGroup";
import { TextGroupProperties, initialTextGroupState } from "./constants";

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

  .guides {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`;

/**
 * Main App component
 */
const App = () => {
  const [orientation, setOrientation] = useState<"landscape" | "portrait">(
    "landscape"
  );
  const [keyboard, setKeyboard] = useState<"hebrew" | "qwerty" | undefined>(
    undefined
  );
  const [values, setValues] = useState<TextGroupProperties[]>([
    initialTextGroupState(),
  ]);

  const pageRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => pageRef.current,
  });

  return (
    <>
      <Menu
        orientation={orientation}
        setOrientation={setOrientation}
        setKeyboard={setKeyboard}
        handlePrint={handlePrint}
      />

      <PageWrapper
        id="page-view-wrapper"
        className={clsx({ portrait: orientation === "portrait" })}
      >
        <div ref={pageRef} id="page-view-content">
          {values.map((value, index) => (
            <TextGroup
              key={value.id}
              value={value}
              setValues={setValues}
              index={index}
            />
          ))}
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
