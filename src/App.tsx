import React, { useEffect, useRef, useState } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import "./App.scss";
import { styled } from "styled-components";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Menu } from "./Menu";
import clsx from "clsx";
import { TextGroup } from "./TextGroup";
import { TextGroupProperties, initialTextGroupState } from "./constants";
import { Keyboards } from "./Keyboards";
import { MdDelete } from "react-icons/md";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Rnd } from "react-rnd";
import { Button } from "primereact/button";
import { Example } from "./examples";

const PageWrapper = styled.main`
  border: 0.5px solid black;
  box-shadow: 15px 15px 25px grey;
  height: 8.5in;
  width: 11in;
  margin: 40px auto;
  position: relative;
  overflow: hidden;

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

const ImageWrapper = styled.div`
  border: 1px dashed transparent;
  position: relative;
  height: 100%;
  width: 100%;
  transition: all 200ms;

  & img {
    height: 100%;
    width: 100%;
  }

  & button {
    position: absolute;
    bottom: 15px;
    right: 15px;
    z-index: 10;
    padding: 8px;
    opacity: 0;
    transition: all 200ms;
  }

  &:hover {
    border: 1px dashed grey;
    transition: all 200ms;

    button {
      opacity: 1;
      transition: all 200ms;
    }
  }
`;

/**
 * Main App component
 */
const App: React.FC = () => {
  const [shiftKey, setShiftKey] = useState(false);
  const [orientation, setOrientation] = useState<"landscape" | "portrait">(
    "landscape"
  );
  const [margins, setMargins] = useState({
    top: 0.75,
    bottom: 0.75,
    left: 0.75,
    right: 0.75,
  });
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [images, setImages] = useState<ImageListType>([]);
  const [values, setValues] = useState<TextGroupProperties[]>([
    initialTextGroupState(),
  ]);
  const [currentInput, setCurrentInput] = useState(values[0].id);

  const pageRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => pageRef.current,
  });

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.shiftKey) {
        setShiftKey(true);
      }
    });

    window.addEventListener("keyup", () => {
      setShiftKey(false);
    });
  }, []);

  const setupExample = (example: Example) => {
    setOrientation(example.orientation);
    setMargins(example.margins);
    setValues(example.texts);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={(imageList) => setImages(imageList)}
    >
      {({ imageList, onImageUpload, onImageRemove, dragProps, isDragging }) => (
        <>
          <Menu
            orientation={orientation}
            setOrientation={setOrientation}
            margins={margins}
            setMargins={setMargins}
            setKeyboardOpen={setKeyboardOpen}
            handlePrint={handlePrint}
            onImageUpload={onImageUpload}
            dragProps={dragProps}
            isDragging={isDragging}
            setupExample={setupExample}
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
                  setCurrentInput={setCurrentInput}
                  index={index}
                  margins={margins}
                />
              ))}

              {imageList.map((image, index) => (
                <Rnd
                  key={image.dataURL}
                  lockAspectRatio={shiftKey}
                  style={{ zIndex: 100000 }}
                >
                  <ImageWrapper>
                    <img
                      style={{ pointerEvents: "none" }}
                      src={image.dataURL}
                    />
                    <Button
                      className="p-button-danger"
                      onClick={() => onImageRemove(index)}
                    >
                      <MdDelete />
                    </Button>
                  </ImageWrapper>
                </Rnd>
              ))}
            </div>
          </PageWrapper>

          {keyboardOpen && (
            <Keyboards
              setOpen={setKeyboardOpen}
              currentInput={currentInput}
              setValues={setValues}
            />
          )}

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
      )}
    </ImageUploading>
  );
};

export default App;
