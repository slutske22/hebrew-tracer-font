import React, { Dispatch, SetStateAction, useRef } from "react";
import { Menubar } from "primereact/menubar";
import { OverlayPanel } from "primereact/overlaypanel";
import { RadioButton } from "primereact/radiobutton";
import { AiOutlinePrinter } from "react-icons/ai";
import { IoDocumentOutline } from "react-icons/io5";
import { BsKeyboard } from "react-icons/bs";
import { InputNumber } from "primereact/inputnumber";

interface Props {
  orientation: "landscape" | "portrait";
  setOrientation: Dispatch<SetStateAction<"landscape" | "portrait">>;
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  setMargins: Dispatch<
    SetStateAction<{
      top: number;
      bottom: number;
      left: number;
      right: number;
    }>
  >;
  setKeyboardOpen: Dispatch<SetStateAction<boolean>>;
  handlePrint: () => void;
}

/**
 * Primary top menu for the app
 */
export const Menu: React.FC<Props> = ({
  orientation,
  setOrientation,
  margins,
  setMargins,
  setKeyboardOpen,
  handlePrint,
}) => {
  const orientationPanel = useRef<OverlayPanel>(null);

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
            <h3>Hebrew Tracing Page Maker</h3>
          </div>
        }
        model={[
          {
            label: "Page Format",
            icon: (
              <IoDocumentOutline size={24} style={{ marginRight: "10px" }} />
            ),
            command: (e) => orientationPanel.current?.toggle(e.originalEvent),
          },
          {
            label: "Keyboard",
            icon: <BsKeyboard size={24} style={{ marginRight: "10px" }} />,
            command: () => setKeyboardOpen(true),
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
        <h4>Page Orientation</h4>
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

        <h4>Margins</h4>
        {Object.keys(margins).map((side) => (
          <div
            style={{
              display: "flex",
              marginBottom: "6px",
              alignItems: "center",
            }}
          >
            <span style={{ textTransform: "capitalize", width: "80px" }}>
              {side}
            </span>
            <InputNumber
              value={margins[side as keyof typeof margins]}
              onChange={(e) =>
                setMargins((prev) => ({ ...prev, [side]: e.value as number }))
              }
              min={0}
              maxFractionDigits={2}
              minFractionDigits={2}
              step={0.05}
              showButtons
              suffix=" in"
            />
          </div>
        ))}
      </OverlayPanel>
    </>
  );
};
