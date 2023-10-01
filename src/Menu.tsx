import React, { Dispatch, SetStateAction, useRef } from "react";
import { Menubar } from "primereact/menubar";
import { OverlayPanel } from "primereact/overlaypanel";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { AiOutlinePrinter, AiOutlineFontSize } from "react-icons/ai";
import { CgBorderStyleDotted } from "react-icons/cg";
import { BsKeyboard } from "react-icons/bs";
import { TbFileOrientation } from "react-icons/tb";

interface Props {
  orientation: "landscape" | "portrait";
  setOrientation: Dispatch<SetStateAction<"landscape" | "portrait">>;
  setKeyboard: Dispatch<SetStateAction<"hebrew" | "qwerty" | undefined>>;
  gridLines: {
    top: boolean;
    middle: boolean;
    bottom: boolean;
  };
  setGridLines: Dispatch<
    SetStateAction<{
      top: boolean;
      middle: boolean;
      bottom: boolean;
    }>
  >;
  handlePrint: () => void;
}

export const Menu: React.FC<Props> = ({
  orientation,
  setOrientation,
  gridLines,
  setGridLines,
  handlePrint,
}) => {
  const orientationPanel = useRef<OverlayPanel>(null);
  const formattingPanel = useRef<OverlayPanel>(null);
  const gridLinesPanel = useRef<OverlayPanel>(null);
  const keyboardPanel = useRef<OverlayPanel>(null);

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
            label: "Orientation",
            icon: (
              <TbFileOrientation size={24} style={{ marginRight: "10px" }} />
            ),
            command: (e) => orientationPanel.current?.toggle(e.originalEvent),
          },
          {
            label: "Formatting",
            icon: (
              <AiOutlineFontSize size={24} style={{ marginRight: "10px" }} />
            ),
            command: (e) => formattingPanel.current?.toggle(e.originalEvent),
          },
          {
            label: "Guide Lines",
            icon: (
              <CgBorderStyleDotted size={24} style={{ marginRight: "10px" }} />
            ),
            command: (e) => gridLinesPanel.current?.toggle(e.originalEvent),
          },
          {
            label: "Keyboard",
            icon: <BsKeyboard size={24} style={{ marginRight: "10px" }} />,
            command: (e) => keyboardPanel.current?.toggle(e.originalEvent),
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

      {/* Page orientation menu dropdown */}
      <OverlayPanel ref={orientationPanel}>
        <div style={{ marginBottom: "16px" }}>
          <RadioButton
            style={{ marginRight: "10px" }}
            checked={orientation === "portrait"}
            onClick={() => setOrientation("portrait")}
          />
          Portrait
        </div>
        <div>
          <RadioButton
            style={{ marginRight: "10px" }}
            checked={orientation === "landscape"}
            onClick={() => setOrientation("landscape")}
          />
          Landscape
        </div>
      </OverlayPanel>

      {/* Grid lines dropdown */}
      <OverlayPanel ref={gridLinesPanel}>
        <div style={{ marginBottom: "16px" }}>
          <Checkbox
            style={{ marginRight: "10px" }}
            checked={gridLines.top}
            onClick={() => setGridLines((c) => ({ ...c, top: !c.top }))}
          />
          Top
        </div>
        <div style={{ marginBottom: "16px" }}>
          <Checkbox
            style={{ marginRight: "10px" }}
            checked={gridLines.middle}
            onClick={() => setGridLines((c) => ({ ...c, middle: !c.middle }))}
          />
          Middle
        </div>
        <div>
          <Checkbox
            style={{ marginRight: "10px" }}
            checked={gridLines.bottom}
            onClick={() => setGridLines((c) => ({ ...c, bottom: !c.bottom }))}
          />
          Bottom
        </div>
      </OverlayPanel>

      {/* Formatting dropdown */}
      <OverlayPanel ref={formattingPanel}>Formatting</OverlayPanel>

      {/* Keyboard dropdown */}
      <OverlayPanel ref={keyboardPanel} className="keyboard-overlay">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            className="p-button-text"
            style={{ color: "rgb(73, 80, 87)" }}
          >
            Hebrew
          </Button>
          <Button
            className="p-button-text"
            style={{ color: "rgb(73, 80, 87)" }}
          >
            Hebrew QWERTY
          </Button>
        </div>
      </OverlayPanel>
    </>
  );
};
