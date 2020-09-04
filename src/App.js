import React, { useState } from "react";
import "./styles.css";

let currentActive = 1;

const numbers = [
  {
    id: 1,
    active: true
  },
  {
    id: 2,
    active: false
  },
  {
    id: 3,
    active: false
  },
  {
    id: 4,
    active: false
  }
];

export default function App() {
  const [prevDisable, setPrev] = useState(true);
  const [nextDisable, setNext] = useState(false);
  const [activeState, setActive] = useState(1);
  const [numbersArr, setNumbers] = useState(numbers);

  const prevHandler = () => {
    currentActive--;
    setActive(currentActive);

    if (currentActive < 1) {
      currentActive = 1;
      setActive(1);
    }

    updateUI();
  };

  const nextHandler = () => {
    currentActive++;
    setActive(currentActive);

    if (currentActive > numbers.length) {
      currentActive = numbers.length;
      setActive(numbers.length);
    }

    updateUI();
  };

  const updateUI = () => {
    setNumbers(
      numbers.map((number, idx) => {
        if (idx < currentActive) {
          number.active = true;
        } else {
          number.active = false;
        }
        return number;
      })
    );

    if (currentActive === 1) {
      setPrev(true);
    } else if (currentActive === numbers.length) {
      setNext(true);
    } else {
      setPrev(false);
      setNext(false);
    }
  };

  return (
    <div className="container">
      <div className="progress-container">
        <div
          className="progress"
          style={{
            width: ((activeState - 1) / (numbers.length - 1)) * 100 + "%"
          }}
        ></div>
        {numbersArr.map((number) => (
          <div
            key={number.id}
            className={number.active === true ? "circle active" : "circle"}
          >
            {number.id}
          </div>
        ))}
      </div>

      <button disabled={prevDisable} className="btn" onClick={prevHandler}>
        Prev
      </button>
      <button disabled={nextDisable} className="btn" onClick={nextHandler}>
        Next
      </button>
    </div>
  );
}
