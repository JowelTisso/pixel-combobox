import { useRef, useState } from "react";
import "./App.css";
import { EventType, KeyType, optionsData, SelectItem } from "./constants";

function App() {
  const [isOptionVisible, setIsOptionVisible] = useState(false);
  const [input, setInput] = useState("");
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState(optionsData);

  const comboRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.type === EventType.FOCUS) {
      setIsOptionVisible(true);
    } else {
      setTimeout(() => {
        setIsOptionVisible(false);
      }, 200);
    }
  };

  const optionSelectHandler = (option: SelectItem) => {
    setInput(option.value);
    setIsOptionVisible(false);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case KeyType.Up:
        e.preventDefault();
        if (currentOptionIndex !== 0) {
          setCurrentOptionIndex((prevIndex) => prevIndex - 1);
        } else {
          setCurrentOptionIndex(optionsData.length - 1);
        }
        break;
      case KeyType.Down:
        e.preventDefault();
        if (currentOptionIndex !== optionsData.length - 1) {
          setCurrentOptionIndex((prevIndex) => prevIndex + 1);
        } else {
          setCurrentOptionIndex(0);
        }
        break;
      case KeyType.Enter:
        setInput(optionsData[currentOptionIndex].value);
        setIsOptionVisible(false);
        break;
      case KeyType.Escape:
        setIsOptionVisible(false);
        break;
      default:
        break;
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    const filteredList = optionsData.filter((item) =>
      item.label.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOptions(filteredList);
  };

  const onMouseEnterHandler = (index: number) => {
    setCurrentOptionIndex(index);
  };

  return (
    <div className="wrapper">
      <div ref={comboRef}>
        <div className="input-container">
          <input
            ref={inputRef}
            className="input-box"
            type="text"
            onFocus={handleFocus}
            onBlur={handleFocus}
            value={input}
            onKeyDown={keyDownHandler}
            onChange={inputChangeHandler}
          />
        </div>
        {isOptionVisible && (
          <ul className="input-options">
            {filteredOptions.length ? (
              filteredOptions.map((item, index) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => optionSelectHandler(item)}
                    style={{
                      backgroundColor:
                        index === currentOptionIndex
                          ? "rgb(242, 242, 242)"
                          : "white",
                    }}
                    onMouseEnter={() => onMouseEnterHandler(index)}
                  >
                    {item.label}
                  </li>
                );
              })
            ) : (
              <li>No results</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
