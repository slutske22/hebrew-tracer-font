import clsx from "clsx";
import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { TextGroupProperties, fontOptions } from "./constants";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { ImFont } from "react-icons/im";
import { TbLineDotted } from "react-icons/tb";
import { v4 as uuid } from "uuid";

const LINE_HEIGHT = "90px";

const Wrapper = styled.div`
  width: calc(11in - 2in);
  position: relative;
  margin: 1in;
`;

const TextArea = styled.textarea`
  resize: none;
  overflow: hidden;
  height: ${LINE_HEIGHT};
  line-height: ${LINE_HEIGHT};
  min-height: 50px;
  font-family: sans-serif;
  width: 100%;
  background-color: transparent;
  border: none;
  text-align: right;
  direction: rtl;
  z-index: 5;
  letter-spacing: 5px;
  font-size-adjust: 0.6;
  font-family: Cousine Tracer;
  position: relative;

  .portrait & {
    width: calc(8in - 6rem);
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

const GuideLine = styled.div<{ index: number }>`
  width: 100%;
  position: absolute;
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

const FormattingWrapper = styled.div`
  position: absolute;
  top: -20px;
  bottom: -20px;
  right: -60px;
  left: -20px;
  border-radius: 10px;
  box-shadow: 0 0 5px grey;
  z-index: 2;
  opacity: 0;
  text-align: right;
  padding: 30px 0;
  transition: all 200ms;

  .text-group-wrapper:hover & {
    opacity: 1;
    transition: all 200ms;
  }

  &:hover {
    opacity: 1;
    transition: all 200ms;
  }
`;

interface Props {
  /**
   * The value of the text group
   */
  value: TextGroupProperties;
  /**
   * Callback to set the values of the text groups
   */
  setValues: React.Dispatch<React.SetStateAction<TextGroupProperties[]>>;
  /**
   *  The index of this text group in the array of text groups
   */
  index: number;
}

/**
 * Component to render single textarea element, with grid lines and options
 */
export const TextGroup: React.FC<Props> = ({ value, setValues, index }) => {
  const { text, grid } = value;

  const [lines, setLines] = useState(1);
  const [ref, setRef] = useState<HTMLTextAreaElement>();
  const [fontSize, setFontSize] = useState<number>(60);
  const [fontFamily, setFontFamily] = useState<string>("Cousine Tracer");

  const lineHeight = fontSize * 1.5;

  const formattingPanel = useRef<OverlayPanel>(null);

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValues((prev) =>
      prev.map((v) =>
        v.id === value.id ? { ...value, text: e.target.value } : v
      )
    );

    e.target.style.height = "5px";
    e.target.style.height = e.target.scrollHeight + "px";

    const numberOfLines = Math.round(
      Number(getComputedStyle(e.target).height.replace("px", "")) /
        Number(getComputedStyle(e.target).lineHeight.replace("px", ""))
    );

    setLines(numberOfLines);
  };

  /**
   * On mount, focus on newly created text group
   */
  useEffect(() => {
    if (ref) {
      ref.focus();
    }
  }, [ref]);

  return (
    <Wrapper className="text-group-wrapper">
      <FormattingWrapper>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginRight: "16px",
          }}
        >
          <Button
            className="p-button-outlined p-button-secondary"
            style={{ padding: "5px", marginTop: "3px" }}
            onClick={(e) => formattingPanel.current?.toggle(e)}
          >
            <ImFont />
          </Button>
          <Button
            className="p-button-outlined p-button-secondary"
            style={{ padding: "5px", marginTop: "6px" }}
          >
            <TbLineDotted
              style={{
                borderTop: "0.5px solid black",
                borderBottom: "0.5px solid black",
              }}
              size={14}
            />
          </Button>
        </div>
      </FormattingWrapper>

      <TextArea
        id={value.id}
        value={text}
        onChange={onChange}
        style={{
          fontSize: fontSize + "px",
          fontFamily: fontFamily as string,
        }}
        ref={(r) => {
          if (r) {
            setRef(r);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setValues((prev) => {
              const copy = [...prev];
              copy.splice(index + 1, 0, { ...value, id: uuid(), text: "" });
              return copy;
            });
            return;
          }

          if (
            !value.text &&
            index !== 0 &&
            (e.key === "Backspace" || e.key === "Delete")
          ) {
            e.preventDefault();
            setValues((prev) => {
              document.getElementById(prev[index - 1].id)?.focus();
              return prev.filter((v) => v.id !== value.id);
            });
          }
        }}
      />

      <div className="guides">
        {Array.from({ length: lines }).map((_, i) => (
          <GuideLine
            key={i}
            index={i}
            style={{
              height: fontSize + "px",
              top: (lineHeight - fontSize) / 2 + lineHeight * i + "px",
            }}
            className={clsx({
              ...grid,
            })}
          />
        ))}
      </div>

      <OverlayPanel ref={formattingPanel}>
        <h4>Font:</h4>
        <Dropdown
          options={fontOptions}
          value={fontFamily}
          onChange={(e) => setFontFamily(e.value)}
          style={{ width: "100%" }}
        />

        <h4>Font Size:</h4>
        <InputNumber
          value={fontSize}
          onChange={(e) => setFontSize(e.value as number)}
          showButtons
        />
      </OverlayPanel>
    </Wrapper>
  );
};
