import React, { useState } from "react";
import "../css/Code.css";
import { useDispatch } from "react-redux";
import { showCode } from "../../../redux/codeSectionSwitch";
import { IoMdClose } from "react-icons/io";
import CodeMirrors from "../CodeMirror/CodeMirror";

function Code() {
  
  const dispatch = useDispatch();
  return (
    <div className="code-main-container ">
      <IoMdClose onClick={() => dispatch(showCode())} className="close-icon" />
    
      <CodeMirrors />
    </div>
  );
}

export default Code;
