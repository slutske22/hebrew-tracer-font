import React, { Dispatch, SetStateAction, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { Rnd } from "react-rnd";
import * as layouts from "./layouts";
import { styled } from "styled-components";
import { IoClose } from "react-icons/io5";
import { GoLinkExternal } from "react-icons/go";
import { Button } from "primereact/button";
import { TextGroupProperties } from "./constants";

const Wrapper = styled.div`
  background-color: white;
  padding: 10px;
  box-shadow: 0 0 25px grey;
`;

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  currentInput: string;
  setValues: React.Dispatch<React.SetStateAction<TextGroupProperties[]>>;
}

/**
 * Component that renders onscreen keyboards
 */
export const Keyboards: React.FC<Props> = ({
  setOpen,
  currentInput,
  setValues,
}) => {
  const [keyboardType, setKeyboardType] = useState<"standard" | "qwerty">(
    "standard"
  );
  const [layoutName, setLayoutName] = useState("default");
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 720 / 2,
    y: window.innerHeight - 300,
  });

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName((l) => (l === "default" ? "shift" : "default"));
    }
  };

  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 720,
        height: 282,
      }}
      lockAspectRatio={720 / 200}
      style={{ zIndex: 10000 }}
      enableResizing={false}
      position={position}
      onDragStop={(_e, d) => {
        setPosition(d);
      }}
      onResizeStop={(_e, _direction, _ref, _delta, position) => {
        setPosition(position);
      }}
    >
      <Wrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            marginLeft: "6px",
          }}
        >
          <div>
            <Button
              className="p-button-text p-button-secondary"
              style={{
                padding: "0 6px",
                marginRight: "20px",
                boxShadow:
                  keyboardType === "standard"
                    ? "0 0 0 0.2rem #E2E8F0"
                    : undefined,
              }}
              onClick={() => {
                setKeyboardType("standard");
                setLayoutName("default");
              }}
            >
              Standard
            </Button>
            <Button
              className="p-button-text p-button-secondary"
              style={{
                padding: "0 6px",
                boxShadow:
                  keyboardType === "qwerty"
                    ? "0 0 0 0.2rem #E2E8F0"
                    : undefined,
              }}
              onClick={() => {
                setKeyboardType("qwerty");
                setLayoutName("default");
              }}
            >
              QWERTY
            </Button>
          </div>

          <div>
            <a
              href="https://opensiddur.org/help/typing/"
              style={{ marginLeft: "auto" }}
              target="_blank"
            >
              <Button
                className="p-button-text p-button-secondary"
                style={{ padding: 0, marginRight: "20px" }}
              >
                Typing with Vowels{" "}
                <GoLinkExternal style={{ marginLeft: "6px" }} />
              </Button>
            </a>

            <Button
              className="p-button-text p-button-secondary"
              style={{ padding: 0, marginLeft: "auto" }}
              onClick={() => setOpen(false)}
            >
              <IoClose />
            </Button>
          </div>
        </div>

        <Keyboard
          layout={layouts[keyboardType]}
          layoutName={layoutName}
          inputName={currentInput}
          onKeyPress={onKeyPress}
          preventMouseDownDefault
          onChangeAll={(inputs) => {
            setValues((prev) =>
              prev.map((v) => ({
                ...v,
                text: inputs[v.id],
              }))
            );
          }}
        />
      </Wrapper>
    </Rnd>
  );
};
