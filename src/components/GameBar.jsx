import GameIcon from "../assets/GameIcon.svg";
import HelpIcon from "../assets/Help.svg";
import StatisticsIcon from "../assets/Statistics.svg";
import SettingsIcon from "../assets/Settings.svg";
function GameBar() {
  return (
    <div className="flex justify-between w-[540px] items-center">
      <img src={GameIcon} width={44} height={44} alt="GI" />
      <span className="uppercase text-[#d7dadc] text-3xl font-bold tracking-[0.2rem] pointer-events-none text-center">
        KELİME BUL
      </span>
      <div className="flex gap-4 content-center align-middle">
        <img
          className="cursor-pointer"
          src={HelpIcon}
          width={24}
          height={24}
          alt="Help"
        />
        <img
          className="cursor-pointer"
          src={StatisticsIcon}
          width={24}
          height={24}
          alt="Help"
        />
        <img
          className="cursor-pointer"
          src={SettingsIcon}
          width={24}
          height={24}
          alt="Help"
        />
      </div>
    </div>
  );
}

export default GameBar;
