import { useRef, useState } from "react";
import "./App.css";
import { KeyType, optionsData, SelectItem } from "./constants";

function App() {
  const [isOptionVisible, setIsOptionVisible] = useState(false);
  const [input, setInput] = useState("");
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState(optionsData);
  const [selectValue, setSelectValue] = useState<SelectItem[]>([]);

  const backdropDivRef = useRef<HTMLDivElement>(null);

  const optionSelectHandler = (option: SelectItem) => {
    const isSelected = selectValue.includes(option);
    if (isSelected) {
      removeSelectedOption(option);
    } else {
      setSelectValue((values) => [...values, option]);
    }
    setInput("");
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case KeyType.Up:
        e.preventDefault();
        if (isOptionVisible) {
          if (currentOptionIndex !== 0) {
            setCurrentOptionIndex((prevIndex) => prevIndex - 1);
          } else {
            setCurrentOptionIndex(filteredOptions.length - 1);
          }
        }
        break;
      case KeyType.Down:
        e.preventDefault();
        if (isOptionVisible) {
          if (currentOptionIndex !== filteredOptions.length - 1) {
            setCurrentOptionIndex((prevIndex) => prevIndex + 1);
          } else {
            setCurrentOptionIndex(0);
          }
        }
        break;
      case KeyType.Enter:
        if (isOptionVisible) {
          setSelectValue((values) => [
            ...values,
            optionsData[currentOptionIndex],
          ]);
          setInput("");
          setIsOptionVisible(false);
        }
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
    if (filteredList.length > 0) {
      setIsOptionVisible(true);
    }
    setFilteredOptions(filteredList);
  };

  const onMouseHoverHandler = (index: number) => {
    setCurrentOptionIndex(index);
  };

  const isOptionSelected = (item: SelectItem) => selectValue.includes(item);

  const removeSelectedOption = (item: SelectItem) => {
    setSelectValue((prevValue) =>
      prevValue.filter((value) => value.id !== item.id)
    );
  };

  return (
    <div
      ref={backdropDivRef}
      className="wrapper"
      id="backdrop"
      onClick={(e) => {
        if (backdropDivRef.current === e.target) {
          setIsOptionVisible(false);
        }
      }}
    >
      <div className="combobox">
        <div className="input-container">
          {selectValue.map((option) => (
            <span aria-label="selected option" key={option.id} className="tag">
              {option.label}
            </span>
          ))}
          <input
            className="input-box"
            role="combobox"
            aria-expanded={isOptionVisible ? "true" : "false"}
            aria-controls="option-list"
            type="text"
            value={input}
            onKeyDown={keyDownHandler}
            onChange={inputChangeHandler}
          />
        </div>
        {isOptionVisible && (
          <ul
            id="option-list"
            className="input-options"
            role="listbox"
            aria-label="list of fruits"
            aria-multiselectable="true"
          >
            {filteredOptions.length ? (
              filteredOptions.map((item, index) => {
                return (
                  <div className="item-container" key={item.id}>
                    <li
                      role="option"
                      aria-label="fruit"
                      onClick={() => optionSelectHandler(item)}
                      style={{
                        backgroundColor:
                          index === currentOptionIndex
                            ? "rgb(242, 242, 242)"
                            : "white",
                      }}
                      aria-selected={selectValue.includes(item)}
                      onMouseEnter={() => onMouseHoverHandler(index)}
                    >
                      {item.label}
                    </li>
                    {isOptionSelected(item) && (
                      <button
                        className="btn-remove"
                        onClick={() => removeSelectedOption(item)}
                      >
                        x
                      </button>
                    )}
                  </div>
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
