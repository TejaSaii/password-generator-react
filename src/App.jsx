import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef
  const passwordRef = useRef("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "01234567890";
    if (charAllowed) str += "!@#$%^&*(){}`'<>?";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str[index];
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  //to handle copy btn click
  const handleCopyClick = useCallback(() => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);
    }, [password]
  );
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md px-4 py-2 my-8 rounded-lg bg-gray-700 text-orange-500">
        <div className="text-white text-2xl text-center my-3">
          Password Generator
        </div>
        <div className="flex shadow rounded-lg mb-4 overflow-hidden">
          <input
            type="text"
            value={password}
            className="outline-none py-1 px-3 w-full"
            placeholder="password"
            ref={passwordRef}
            readOnly
          />
          <button className="text-white bg-blue-500 px-3 py-0.5 shrink-0 hover:bg-blue-400 active:scale-110 ease-linear"
          onClick={handleCopyClick}>
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              id="slider"
              min={6}
              max={80}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="slider">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed(prev => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="charInput"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed(prev => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
