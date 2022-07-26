import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import GameBar from "./components/GameBar";
import InputArea from "./components/InputArea";
import KeyBoard from "./components/Keyboard";
import HelpModal from "./components/Modals/HelpModal";

import {
  popBoardState,
  ResetGame,
  setBoardState,
  SetSolution,
  SubmitSolution,
} from "./redux/Game";
import { useEventListener } from "./utils/EventListener";
import { keyboardStruct } from "./utils/Keys";
function App() {
  const { solution, boardState, GameIndex, GameFinish } = useSelector(
    (state) => state.Game
  );
  const [words, setWords] = useState([]);
  const InputItems = ["", "", "", "", "", ""];
  const dispatch = useDispatch();

  useEventListener("keydown", ({ key }) => {
    if (!GameFinish) {
      key === "Enter" && btnSubmitSolution();
      key === "Backspace" && dispatch(popBoardState());
      key.length === 1 &&
        isNaN(key) &&
        dispatch(setBoardState(key.toUpperCase()));
    }
  });

  const getWords = () => {
    return fetch("/words.json")
      .then((data) => data.json())
      .then((data) => {
        return data.words;
      });
  };

  useEffect(() => {
    if (GameIndex == 6 || GameFinish) {
      localStorage.clear();
      dispatch(ResetGame());
      dispatch(
        SetSolution(
          Array.from(
            words[Math.floor(Math.random() * words.length)].toUpperCase()
          )
        )
      );
    }
  }, [GameIndex, GameFinish]);

  useEffect(() => {
    if (!GameFinish && GameIndex == 6) {
      toast.info(solution.join(""), {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [GameFinish, GameIndex]);

  useEffect(() => {
    getWords().then((data) => {
      setWords(data);
      dispatch(
        SetSolution(
          Array.from(
            data[Math.floor(Math.random() * data.length)].toUpperCase()
          )
        )
      );
    });
  }, []);

  const CheckArray = () => {
    for (let index = 0; index < 5; index++)
      if (solution[index] !== boardState[GameIndex][index]) return false;

    return true;
  };

  const CheckWords = () => {
    for (let i = 0; i < words.length; ++i)
      if (GameIndex !== 6)
        if (words[i].toUpperCase() == boardState[GameIndex].join(""))
          return true;
    return false;
  };

  const btnSubmitSolution = () => {
    if (!GameFinish)
      if (CheckWords()) {
        const chkArray = CheckArray();
        chkArray
          ? toast.success("Tebrikler, Doğru kelimeyi buldun!", {
              position: "top-center",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : toast.error("Üzgünüm, Doğru kelime değil!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        dispatch(SubmitSolution(chkArray));
      } else {
        toast.warn("Kelime listesinde yok!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
  };
  if (words.length == 0) return <div>Loading</div>;
  return (
    <div className="flex h-full align-middle items-center justify-center p-5">
      <div className="flex flex-col p-0 m-0">
        <GameBar />
        <hr className="border-black flex-col my-1" />
        <div className="flex flex-col gap-y-2 py-2">
          {InputItems.map((val, index) => (
            <InputArea key={index} Index={index} />
          ))}
        </div>
        <div className="flex flex-col items-center">
          {keyboardStruct.map((Keys, index) => (
            <KeyBoard key={index} Index={index} Keys={Keys} />
          ))}
          <button
            className="text-[18px] text-white font-bold bg-[#65c466] rounded w-6/12 p-2"
            onClick={btnSubmitSolution}
          >
            DENE!
          </button>
        </div>
      </div>
      <HelpModal />
    </div>
  );
}

export default App;
