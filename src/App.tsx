import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import './App.css'

const VALID_NUMBER = /^\d+([.,]\d+)?$/g

function App() {
  const [value, setValue] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isValueWrong, setIsValueWrong] = useState(false);
  const [isNeedToShake, setIsNeedToShake] = useState(false);

  useEffect(() => {
    setIsValueWrong(value.match(VALID_NUMBER) ? false : true)
  }, [value])

  function changeInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function onSubmit(): void {
    if (isValueWrong) {
      setIsNeedToShake(true);
    }
    if (!isValueWrong) {
      setIsAlertVisible(true);
    }
  }
  return (
    <div className="App">
      <div className="container">
        <input 
          value={value} 
          onChange={(e) => changeInputHandler(e)} 
          onFocus={() => setIsNeedToShake(false)}
          className={cn({
          input: !isNeedToShake,
          input__error: isNeedToShake
        })} />
        <button className="button" onClick={onSubmit} disabled={!!isNeedToShake}>
          Submit
        </button>
        {value}
      </div>
      <div
        className={cn({
          alert: true,
          invisible: !isAlertVisible
        })}
      >
        <div className="alert__content">
          {value}
          <button className="button" onClick={() => setIsAlertVisible(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;