import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InsertInnerSolution } from "../redux/Game";

function InputArea({ Index }) {
  const dispatch = useDispatch();
  const { boardState, GameIndex, solution } = useSelector(
    (state) => state.Game
  );
  const textRef = useRef([]);

  const getBackgroundColor = (character, index) => {
    if (solution[index] == character) {
      dispatch(InsertInnerSolution({ index: 0, value: character }));
      return "bg-[#538d4e]";
    }
    for (let arrIndex = 0; arrIndex < solution.length; arrIndex++) {
      if (solution[arrIndex] == character) {
        dispatch(InsertInnerSolution({ index: 1, value: character }));
        return "bg-[#b59f3b]";
      }
    }
    dispatch(InsertInnerSolution({ index: 2, value: character }));
    return "bg-[#3a3a3c]";
  };

  useEffect(() => {
    textRef.current.length &&
      textRef.current.map((ref, index) => {
        if (Index >= GameIndex) {
          ref.classList.remove("bg-black");
          ref.classList.remove("bg-[#538d4e]");
          ref.classList.remove("bg-[#b59f3b]");
          ref.classList.remove("bg-[#3a3a3c]");
        }
        if (Index < GameIndex) {
          ref.classList.remove("bg-black");
          ref.classList.add(
            getBackgroundColor(boardState[Index][index], index)
          );
        } else {
          boardState[Index][index].length > 0
            ? ref.classList.add("bg-black")
            : ref.classList.remove("bg-black");
        }
      });
  }, [boardState[Index], GameIndex, solution]);

  return (
    <div className="flex justify-center gap-2">
      {boardState[Index].map((text, index) => (
        <div
          key={index}
          ref={(el) => (textRef.current[index] = el)}
          className="flex items-center justify-center border-2 border-black w-9 h-9"
        >
          <span className="text-[#d7dadc] font-bold text-[1em] uppercase pointer-events-none select-none">
            {text}
          </span>
        </div>
      ))}
    </div>
  );
}

export default InputArea;
