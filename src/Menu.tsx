import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Menubar } from "primereact/menubar";
import { OverlayPanel } from "primereact/overlaypanel";
import { RadioButton } from "primereact/radiobutton";
import { AiOutlinePrinter } from "react-icons/ai";
import { IoDocumentOutline } from "react-icons/io5";
import { BsKeyboard, BsCardImage, BsInfoCircleFill } from "react-icons/bs";
import { useLocalStorage } from "usehooks-ts";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Disclaimer } from "./Disclaimer";
import { TbSquareLetterA } from "react-icons/tb";
import { Example, letterExamples, sentenceExamples } from "./examples";

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
  onImageUpload: () => void;
  isDragging: boolean;
  dragProps: {
    onDrop: (e: MouseEvent) => void;
    onDragEnter: (e: MouseEvent) => void;
    onDragLeave: (e: MouseEvent) => void;
    onDragOver: (e: MouseEvent) => void;
    onDragStart: (e: MouseEvent) => void;
  };
  setupExample: (example: Example) => void;
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
  onImageUpload,
  handlePrint,
  dragProps,
  isDragging,
  setupExample,
}) => {
  const orientationPanel = useRef<OverlayPanel>(null);

  const [showDisclaimerOnStart] = useLocalStorage(
    "showDisclaimerOnStart",
    true
  );

  const [disclaimerOpen, setDisclaimerOpen] = useState(showDisclaimerOnStart);

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
            <Button
              className="p-button-text p-button-secondary"
              style={{ padding: 0, marginLeft: "10px" }}
              onClick={() => setDisclaimerOpen(true)}
            >
              <BsInfoCircleFill size={22} />
            </Button>
          </div>
        }
        model={[
          {
            label: "Templates",
            icon: <TbSquareLetterA size={24} style={{ marginRight: "10px" }} />,
            items: [
              {
                label: "Letters",
                items: letterExamples.map((example) => ({
                  label: example.label,
                  command: () => setupExample(example),
                })),
              },
              {
                label: "Phrases",
                items: sentenceExamples.map((example) => ({
                  label: example.label,
                  command: () => setupExample(example),
                })),
              },
            ],
          },
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
            label: "Add Image",
            icon: <BsCardImage size={24} style={{ marginRight: "10px" }} />,
            template: () => (
              <li className="p-menuitem" onClick={() => onImageUpload()}>
                {/* @ts-expect-error ignore mouseevent props */}
                <a
                  href="#"
                  className="p-menuitem-link"
                  style={{
                    borderRadius: "6px",
                    border: isDragging ? "1px dashed green" : undefined,
                  }}
                  {...dragProps}
                >
                  <BsCardImage size={24} style={{ marginRight: "10px" }} />
                  <span className="p-menuitem-text">Add Image</span>
                </a>
              </li>
            ),
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

      <Disclaimer
        visible={disclaimerOpen}
        onHide={() => setDisclaimerOpen(false)}
      />
    </>
  );
};
