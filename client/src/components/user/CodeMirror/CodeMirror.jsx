import React, { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import sockets from "../../../socket";
import { useParams } from "react-router-dom";
import { IoLogoHtml5, IoLogoCss3, IoLogoJavascript } from "react-icons/io";
import "../css/Code.css";

function CodeMirrors() {
  const [Html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  const roomId = useParams().roomID;

  sockets.on("save-html", ({ value }) => {
    setHtml(value);
  });

  sockets.on("save-css", ({ value }) => {
    setCss(value);
  });
  sockets.on("save-js", ({ value }) => {
    setJs(value);
  });

  const srcCode = `
  <html>
  <body>${Html}</body>
  <style>${css}</style>
  <script>${js}</script>
  </html>
  `;
  return (
    <>
      <div className="test d-flex ">
        <div className="code_mirror_container d-flex flex-column justify-between my-2 mx-2 ">
          <IoLogoHtml5 />
          {/* <CodeMirror
            value={Html}
            height="230px"
            width="475px"
            theme={dracula}
            extensions={[html({ jsx: true })]}
            onChange={React.useCallback((value) => {
              setHtml(value);
              sockets.emit("enter-html", { value, roomId });
            })}
          /> */}
          <CodeEditor
            value={Html}
            language="html"
            placeholder="Please enter html code."
            onChange={(value) => {
              setHtml(value.target.value);
              sockets.emit("enter-html", { value: value.target.value, roomId });
            }}
            style={{
              fontSize: "16px",
              width: "400px",
              height: "300px",
            }}
          />
          <IoLogoCss3 className="mt-1" />
          {/* <CodeMirror
            value={css}
            height="230px"
            width="475px"
            theme={dracula}
            extensions={[less({ jsx: true })]}
            onChange={React.useCallback((value) => {
              setCss(value);
              // sockets.emit("enter-css", { value, roomId });
            })}
          /> */}
          <CodeEditor
            value={css}
            language="css"
            placeholder="Please enter css code."
            onChange={(value) => {
              setCss(value.target.value);
              sockets.emit("enter-css", { value: value.target.value, roomId });
            }}
            style={{
              fontSize: "16px",
              width: "400px",
              height: "300px",
            }}
          />
          <IoLogoJavascript className="mt-1" />
          {/* <CodeMirror
            value={js}
            height="230px"
            width="475px"
            theme={dracula}
            extensions={[javascript({ jsx: true })]}
            onChange={React.useCallback((value) => {
              setJs(value);
              sockets.emit("enter-js", { value, roomId });
            })}
          /> */}
          <CodeEditor
            value={js}
            language="js"
            placeholder="Please enter js code."
            onChange={(value) => {
              setJs(value.target.value);
              sockets.emit("enter-js", { value: value.target.value, roomId });
            }}
            style={{
              fontSize: "16px",
              width: "400px",
              height: "300px",
            }}
          />
        </div>

        <div className="frame-output">
          <iframe
            height={"80%"}
            width={"100%"}
            sandbox="allow-scripts"
            srcDoc={srcCode}
          />
        </div>
      </div>
    </>
  );
}

export default CodeMirrors;
