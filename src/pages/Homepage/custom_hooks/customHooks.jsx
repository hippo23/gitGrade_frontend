import { useState, useEffect } from "react";

const useUndo = (initialValue = null) => {
  const [stateHistory, setStateHistory] = useState([]);
  const [pointer, setPointer] = useState(-1);

  useEffect(() => {
    if (initialValue != null) {
      setStateHistory([initialValue]);
      setPointer(0);
    }
  }, []);

  const getState = () => {
    if (pointer > -1) return stateHistory[pointer];
    return null;
  };

  const changeState = (value) => {
    const updatedStateHistory = stateHistory.filter(
      (stateInstance, index) => index <= pointer,
    );
    updatedStateHistory.push(value);
    setPointer(updatedStateHistory.length - 1);
    setStateHistory(updatedStateHistory);
  };

  const undoChange = () => {
    if (pointer > 0) setPointer(pointer - 1);
  };

  const redoChange = () => {
    if (pointer < stateHistory.length - 1) setPointer(pointer + 1);
  };

  const clearHistory = () => {
    setStateHistory([stateHistory[pointer]]);
    setPointer(0);
  };

  const resetHistory = () => {
    if (stateHistory.length > 0) {
      setStateHistory([stateHistory[0]]);
      setPointer(0);
    }
  };

  return {
    getState,
    changeState,
    undoChange,
    redoChange,
    clearHistory,
    resetHistory,
  };
};

export { useUndo };
