import { useState } from "react";
import { useTheme } from "../hook/useTheme";
import { useData } from "../hook/useData";

export default function Nav() {
  const [dShow, setShow] = useState(false);
  const show = useData((s) => s.show);
  const setShow2 = useData((s) => s.setShow);
  const theme = useTheme((s) => s.theme);
  const language = useTheme((s) => s.language);
  const changeTheme = useTheme((s) => s.changeTheme);
  const changeLanguage = useTheme((s) => s.changeLanguage);

  function handleClick() {
    if (show) {
      setShow2(false);
    } else {
      setShow(!dShow);
    }
  }

  return (
    <>
      <i
        onClick={handleClick}
        className={`${dShow || show ? "bi-x-lg" : "bi-list"} ${
          show
            ? "right-[calc(100%-60px)] top-[calc(100%-60px)]"
            : "right-5 top-5 sm:right-10 sm:top-10"
        } bi fixed  bg-amber-300 dark:bg-blue-600 dark:hover:bg-blue-800 w-[40px] sm:w-[50px] sm:h-[50px] hover:bg-amber-500 transition-all duration-1000 h-[40px] flex items-center cursor-pointer rounded-full text-lg sm:text-2xl text-white justify-center z-[999] bi-list`}
      ></i>
      <div
        onClick={() => setShow(false)}
        className={`${
          dShow ? "visible" : "invisible"
        } fixed z-[998] w-full h-full duration-500 transition-all backdrop-blur-md dark:bg-black/30 bg-white/30 `}
      ></div>
      <nav
        className={`${
          dShow ? "left-0" : "left-[-200px]"
        } w-[200px] bg-white h-[100dvh] border-r dark:bg-slate-800 dark:border-slate-900 border-slate-300 transition-all duration-500 fixed z-[1000]`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-2 p-4">
            <h1 className="text-2xl dark:text-white text-black font-semibold">
              Dashboard
            </h1>
            <ul className="flex flex-col gap-2">
              <li
                className="cursor-pointer dark:text-white text-black"
                onClick={changeTheme}
              >
                {theme === "light" ? "Light" : "Dark"}
              </li>
              <li
                className="cursor-pointer dark:text-white text-black"
                onClick={changeLanguage}
              >
                {language === "en" ? "English" : "Indonesia"}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
