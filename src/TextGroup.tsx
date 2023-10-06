import clsx from "clsx";
import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { TextGroupProperties, fontOptions } from "./constants";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { Checkbox } from "primereact/checkbox";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { ImFont } from "react-icons/im";
import { TbLineDotted } from "react-icons/tb";
import { v4 as uuid } from "uuid";
import { Slider } from "primereact/slider";

const Wrapper = styled.div<{
  margins: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
}>`
  position: relative;
  width: ${(props) =>
    `calc(11in - ${props.margins.left}in - ${props.margins.right}in)`};
  margin-left: ${(props) => props.margins.left};
  margin-right: ${(props) => props.margins.right};

  &:first-child {
    margin-top: ${(props) => props.margins.top};
  }

  &:last-child {
    margin-bottom: ${(props) => props.margins.bottom};
  }
`;

const TextArea = styled.textarea`
  resize: none;
  overflow: hidden;
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

  display: flex;
  align-items: center;
  /* border: 1px solid blue; */

  .inner {
    height: 65%;
    transform: translate(0, -2%);
    width: 100%;

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
  }
`;

const FormattingWrapper = styled.div`
  position: absolute;
  top: -20px;
  bottom: -20px;
  right: -60px;
  left: -20px;
  display: flex;
  align-items: center;
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

  &:hover,
  &.focused {
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
  /**
   * Whole page margins
   */
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

/**
 * Component to render single textarea element, with grid lines and options
 */
export const TextGroup: React.FC<Props> = ({
  value,
  setValues,
  index,
  margins,
}) => {
  const { text, grid } = value;

  const [lines, setLines] = useState(1);
  const [ref, setRef] = useState<HTMLTextAreaElement>();
  const [focused, setFocused] = useState(false);

  const lineHeight = value.font.size * 1.5;

  const formattingPanel = useRef<OverlayPanel>(null);
  const gridPanel = useRef<OverlayPanel>(null);

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
    <Wrapper
      className="text-group-wrapper"
      margins={{
        top: `calc(${margins.top}in - (${lineHeight - value.font.size}px))`,
        bottom: margins.bottom + "in",
        left: margins.left + "in",
        right: margins.right + "in",
      }}
    >
      <FormattingWrapper className={clsx({ focused })}>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginRight: "16px",
            transform: "translate(0, -4%)",
          }}
        >
          <Button
            className="p-button-outlined p-button-secondary"
            style={{ padding: "5px" }}
            onClick={(e) => formattingPanel.current?.toggle(e)}
          >
            <ImFont />
          </Button>
          <Button
            className="p-button-outlined p-button-secondary"
            style={{ padding: "5px", marginTop: "6px" }}
            onClick={(e) => gridPanel.current?.toggle(e)}
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
          fontSize: value.font.size + "px",
          fontFamily: value.font.family,
          height: lineHeight + "px",
          lineHeight: lineHeight + "px",
          opacity: value.font.opacity,
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

      <div className="guides" style={{ opacity: value.grid.opacity }}>
        {Array.from({ length: lines }).map((_, i) => (
          <GuideLine
            key={i}
            index={i}
            style={{
              height: value.font.size + "px",
              top: (lineHeight - value.font.size) / 2 + lineHeight * i + "px",
            }}
          >
            <div className={clsx("inner", { ...grid })} />
          </GuideLine>
        ))}
      </div>

      <OverlayPanel
        ref={formattingPanel}
        onShow={() => setFocused(true)}
        onHide={() => setFocused(false)}
        style={{ width: "360px" }}
      >
        <h4>Font:</h4>
        <Dropdown
          options={fontOptions}
          value={value.font.family}
          itemTemplate={(item) => {
            return (
              <div
                style={{
                  fontFamily: item,
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{item}</span>
                <span>אבגדה</span>
              </div>
            );
          }}
          valueTemplate={(item) => {
            return (
              <div
                style={{
                  fontFamily: item,
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{item}</span>
                <span>אבגדה</span>
              </div>
            );
          }}
          onChange={(e) =>
            setValues((prev) =>
              prev.map((v) =>
                v.id === value.id
                  ? {
                      ...v,
                      font: {
                        ...v.font,
                        family: e.target.value,
                      },
                    }
                  : v
              )
            )
          }
          style={{ width: "100%" }}
        />

        <h4>Font Size:</h4>
        <InputNumber
          value={value.font.size}
          suffix=" px"
          style={{ width: "100%" }}
          onChange={(e) =>
            setValues((prev) =>
              prev.map((v) =>
                v.id === value.id
                  ? {
                      ...v,
                      font: {
                        ...v.font,
                        size: e.value as number,
                      },
                    }
                  : v
              )
            )
          }
          showButtons
        />

        <h4>Opacity</h4>
        <Slider
          value={value.font.opacity}
          min={0}
          max={1}
          step={0.01}
          onChange={(e) =>
            setValues((prev) =>
              prev.map((v) =>
                v.id === value.id
                  ? {
                      ...v,
                      font: {
                        ...v.font,
                        opacity: e.value as number,
                      },
                    }
                  : v
              )
            )
          }
        />
      </OverlayPanel>

      <OverlayPanel
        ref={gridPanel}
        onShow={() => setFocused(true)}
        onHide={() => setFocused(false)}
        style={{ width: "240px" }}
      >
        <h4>Guide Lines</h4>
        <Checkbox
          style={{ marginRight: "10px", marginBottom: "6px" }}
          checked={value.grid.top}
          onChange={() =>
            setValues((prev) =>
              prev.map((v) =>
                v.id === value.id
                  ? {
                      ...v,
                      grid: {
                        ...v.grid,
                        top: !v.grid.top,
                      },
                    }
                  : v
              )
            )
          }
        />
        <span style={{ verticalAlign: "top" }}>Top</span>

        <br />
        <Checkbox
          style={{ marginRight: "10px", marginBottom: "6px" }}
          checked={value.grid.middle}
          onChange={() =>
            setValues((prev) =>
              prev.map((v) =>
                v.id === value.id
                  ? {
                      ...v,
                      grid: {
                        ...v.grid,
                        middle: !v.grid.middle,
                      },
                    }
                  : v
              )
            )
          }
        />
        <span style={{ verticalAlign: "top" }}>Middle</span>

        <br />
        <Checkbox
          style={{ marginRight: "10px" }}
          checked={value.grid.bottom}
          onChange={() =>
            setValues((prev) =>
              prev.map((v) =>
                v.id === value.id
                  ? {
                      ...v,
                      grid: {
                        ...v.grid,
                        bottom: !v.grid.bottom,
                      },
                    }
                  : v
              )
            )
          }
        />
        <span style={{ verticalAlign: "top" }}>Bottom</span>

        <h4>Opacity</h4>
        <Slider
          value={value.grid.opacity}
          min={0}
          max={1}
          step={0.01}
          onChange={(e) =>
            setValues((prev) =>
              prev.map((v) =>
                v.id === value.id
                  ? {
                      ...v,
                      grid: {
                        ...v.grid,
                        opacity: e.value as number,
                      },
                    }
                  : v
              )
            )
          }
        />
      </OverlayPanel>
    </Wrapper>
  );
};
