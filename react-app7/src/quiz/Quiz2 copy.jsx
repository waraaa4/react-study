import "./App.css";
import { useState } from "react";

// 글자수 세기 Quiz2
function TextCount({ text, setText }) {
  const textValue = (event) => {
    setText(event.target.value);
    console.log(setText(event.target.value));
  };

  return (
    <div>
      <input type="text" value={text} onChange={textValue} />
      <p>글자 수: {text.length}</p>
    </div>
  );
}

function App() {
  const [text, setText] = useState("");

  return (
    <div>
      <TextCount text={text} setText={setText} />
    </div>
  );
}

export default App;
