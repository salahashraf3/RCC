import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { less } from "@codemirror/lang-less";
import { dracula } from "@uiw/codemirror-theme-dracula";
import sockets from "../../../socket";
import { useParams } from "react-router-dom";
import { IoLogoHtml5, IoLogoCss3, IoLogoJavascript } from "react-icons/io";
import "../css/Code.css";

function CodeMirrors() {
  useEffect(() => {
    sockets.emit("helloo", { data: "helloo world" });
  }, []);

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
          <CodeMirror
            value={Html}
            height="230px"
            width="475px"
            theme={dracula}
            extensions={[html({ jsx: true })]}
            onChange={React.useCallback((value) => {
              setHtml(value);
              sockets.emit("enter-html", { value, roomId });
            })}
          />
          <IoLogoCss3 className="mt-1" />
          <CodeMirror
            value={css}
            height="230px"
            width="475px"
            theme={dracula}
            extensions={[less({ jsx: true })]}
            onChange={React.useCallback((value) => {
              setCss(value);
              sockets.emit("enter-css", { value, roomId });
            })}
          />
          <IoLogoJavascript className="mt-1" />
          <CodeMirror
            value={js}
            height="230px"
            width="475px"
            theme={dracula}
            extensions={[javascript({ jsx: true })]}
            onChange={React.useCallback((value) => {
              setJs(value);
              sockets.emit("enter-js", { value, roomId });
            })}
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
