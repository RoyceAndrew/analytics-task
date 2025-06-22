import { useEffect } from "react";
import { useTheme } from "../hook/useTheme";
import PieChart from "../component/PieChart";
import ScatterChart from "../component/ScatterChart";
import HeatmapChart from "../component/HeatMap";
import ScatterPop from "../component/ScatterPop";
import Nav from "../component/Nav";
import { useData } from "../hook/useData";


export default function Home() {
  const theme = useTheme((s) => s.theme);
  const shpw = useData((s) => s.show);
  useEffect(() => {

    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (shpw) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [shpw]);


  return (
    <>
      <ScatterPop />
      <Nav />
      <div className="2xl:grid flex gutter-stable  flex-col w-full dark:bg-slate-800 bg-white min-h-[100dvh] p-2  gap-4 grid-cols-2 grid-rows-2">
        <PieChart />
        <ScatterChart />
        <HeatmapChart />
      </div>
    </>
  );
}
