import React, { Dispatch, SetStateAction, useRef } from "react";
import { Menubar } from "primereact/menubar";
import { OverlayPanel } from "primereact/overlaypanel";
import { Checkbox } from "primereact/checkbox";
import { AiOutlinePrinter, AiOutlineFontSize } from "react-icons/ai";
import { CgBorderStyleDotted } from "react-icons/cg";
import { BsKeyboard } from "react-icons/bs";

interface Props {
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
  gridLines,
  setGridLines,
  handlePrint,
}) => {
  // const formattingPanel = useRef<OverlayPanel>(null);
  const gridLinesPanel = useRef<OverlayPanel>(null);

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
            className: "formatting-menu-item",
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
            onClick={() => setGridLines((c) => ({ ...c, top: !c.middle }))}
          />
          Middle
        </div>
        <div>
          <Checkbox
            style={{ marginRight: "10px" }}
            checked={gridLines.bottom}
            onClick={() => setGridLines((c) => ({ ...c, top: !c.bottom }))}
          />
          Bottom
        </div>
      </OverlayPanel>
    </>
  );
};
