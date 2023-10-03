import clsx from "clsx";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { styled } from "styled-components";
import { TextGroupProperties } from "./constants";
import { v4 as uuid } from "uuid";

const LINE_HEIGHT = "90px";
const FONT_SIZE = "60px";

const Wrapper = styled.div`
  width: calc(11in - 6rem);
  position: relative;
  border: 1px solid orange;
  margin: 3rem;
`;

const TextArea = styled.textarea`
  resize: none;
  overflow: hidden;
  height: ${LINE_HEIGHT};
  font-size: ${FONT_SIZE};
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
  width: 100%;
  position: absolute;
  top: ${(props) =>
    `calc((${LINE_HEIGHT} - ${FONT_SIZE}) / 2 +  ${LINE_HEIGHT} * ${props.index})`};
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
      <TextArea
        id={value.id}
        value={text}
        onChange={onChange}
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
            className={clsx({
              ...grid,
            })}
          />
        ))}
      </div>
    </Wrapper>
  );
};
