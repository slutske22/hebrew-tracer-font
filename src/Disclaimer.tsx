import { Checkbox as CheckboxBase } from "primereact/checkbox";
import { Dialog, DialogProps } from "primereact/dialog";
import { useLocalStorage } from "usehooks-ts";
import React from "react";
import { styled } from "styled-components";

const Checkbox = styled(CheckboxBase)`
  height: 16px;
  width: 16px;
  margin-right: 6px;

  & * {
    height: 16px;
    width: 16px;
  }
`;

export const Disclaimer: React.FC<DialogProps> = (props) => {
  const [showDisclaimerOnStart, setShowDisclaimerOnStart] = useLocalStorage(
    "showDisclaimerOnStart",
    true
  );

  return (
    <Dialog
      {...props}
      draggable={false}
      style={{ maxWidth: "600px" }}
      closeOnEscape
      header={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
    >
      <p style={{ textAlign: "center", marginTop: 0 }}>
        A simple app to make hebrew tracing worksheets.
      </p>
      <p style={{ textAlign: "center" }}>
        Best viewed on desktop and laptop devices.
      </p>

      <div
        style={{
          border: "1px solid lightgrey",
          borderRadius: "8px",
          margin: "40px 0",
          overflow: "hidden",
        }}
      >
        <p
          style={{
            margin: 0,
            maxHeight: "140px",
            overflowY: "auto",
            fontSize: "10px",
            padding: "3px",
          }}
        >
          Copyright (c) 2023, Blue Ohana, LLC. All rights reserved.
          <br />
          <br /> Redistribution and use in source and binary forms, with or
          without modification, are permitted provided that the following
          conditions are met:
          <ul style={{ maxWidth: "70%" }}>
            <li>
              Redistributions of source code must retain the above copyright
              notice, this list of conditions and the following disclaimer.
            </li>
            <li>
              Redistributions in binary form must reproduce the above copyright
              notice, this list of conditions and the following disclaimer in
              the documentation and/or other materials provided with the
              distribution.
            </li>
            <li>
              Neither the name of the Blue Ohana nor the names of its
              contributors may be used to endorse or promote products derived
              from this software without specific prior written permission.
            </li>
          </ul>
          THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
          "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
          LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
          A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL BLUE OHANA BE
          LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
          CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
          SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
          BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
          WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
          OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN
          IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        </p>
      </div>

      <p
        style={{ textAlign: "center", fontSize: "12px", marginBottom: "20px" }}
      >
        Problems? Requests? Open an issue on{" "}
        <a
          href="https://github.com/slutske22/hebrew-tracer-font/issues"
          target="_blank"
        >
          github
        </a>
        .
      </p>

      <div style={{ textAlign: "right" }}>
        <Checkbox
          checked={!showDisclaimerOnStart}
          onClick={() => setShowDisclaimerOnStart((show) => !show)}
        />
        <small>Don't show this again</small>
      </div>
    </Dialog>
  );
};
