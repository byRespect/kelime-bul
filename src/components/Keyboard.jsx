import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { popBoardState, setBoardState } from "../redux/Game";
import BackspaceIcon from "../assets/Backspace.svg";

function KeyBoard({ Keys, Index }) {
  const { innerSolution, GameIndex, GameFinish } = useSelector(
    (state) => state.Game
  );
  const dispatch = useDispatch();
  const keysRef = useRef([[], [], []]);
  const sendKey = (key) => {
    dispatch(setBoardState(key.toUpperCase()));
  };

  useEffect(() => {
    for (let i = 0; i < keysRef.current?.length; i++) {
      keysRef.current[i].map((ref) => {
        if (
          innerSolution[0].length == 0 &&
          innerSolution[1].length == 0 &&
          innerSolution[2].length == 0
        ) {
          ref.classList.remove("bg-[#818384]");
          ref.classList.remove("bg-[#b59f3b]");
          ref.classList.remove("bg-[#538d4e]");
          ref.classList.add("bg-[#818384]");
        } else {
          for (let i = 0; i < innerSolution.length; i++) {
            innerSolution[i].map((char) => {
              if (char === ref.textContent) {
                if (i === 0) {
                  ref.classList.remove("bg-[#818384]");
                  ref.classList.remove("bg-[#b59f3b]");
                  ref.classList.remove("bg-[#3a3a3c]");
                  ref.classList.add("bg-[#538d4e]");
                } else if (i === 1) {
                  ref.classList.remove("bg-[#818384]");
                  ref.classList.remove("bg-[#3a3a3c]");
                  ref.classList.add("bg-[#b59f3b]");
                } else if (i == 2) {
                  ref.classList.remove("bg-[#818384]");
                  ref.classList.add("bg-[#3a3a3c]");
                }
              }
            });
          }
        }
      });
    }
  }, [GameIndex, innerSolution]);
  return (
    <div className="flex gap-1 m-1">
      {Keys?.map((vKey, index) =>
        vKey !== "Backspace" ? (
          <div
            ref={(el) => (keysRef.current[Index][index] = el)}
            key={index}
            onClick={() => sendKey(vKey)}
            className={`flex justify-center items-center rounded  ${
              Index == 0 ? "w-[42px]" : Index == 1 ? "w-[34px]" : "w-[44px]"
            } h-[42px] cursor-pointer bg-[#818384]`}
          >
            <span className="text-[#d7dadc] select-none">{vKey}</span>
          </div>
        ) : (
          <div
            onClick={() => {
              if (!GameFinish) dispatch(popBoardState());
            }}
            className="flex justify-center items-center rounded w-[68px] h-[42px] cursor-pointer bg-white"
          >
            <img src={BackspaceIcon} alt="BackspaceIcon" />
          </div>
        )
      )}
    </div>
  );
}

export default KeyBoard;
