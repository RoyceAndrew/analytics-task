import { BounceLoader } from "react-spinners";
import { useTheme } from "../hook/useTheme";

export const InfoStatus = ({ props }) => {
  const language = useTheme(state => state.language);
  const theme = useTheme(state => state.theme);
  const isDark = theme === "dark";
  const loaderColor = isDark ? "white" : "black";

  if (props.isLoading) {
    return (
      <div className={`w-full h-[calc(100dvh*1/3-20px)] 2xl:h-full flex justify-center items-center col-start-1 col-end-${props.colEnd} col-start-${props.colStart} row-start-${props.rowStart} row-end-${props.rowEnd} ring-2 ring-slate-500 dark:ring-slate-600 dark:bg-slate-800 p-2 rounded-lg`}>
        <BounceLoader color={loaderColor} />
      </div>
    );
  }

  if (props.isError) {
    return (
      <div className={`w-full h-[calc(100dvh*1/3-20px)] 2xl:h-full col-end-${props.colEnd} col-start-${props.colStart} row-start-${props.rowStart} row-end-${props.rowEnd} ring-2 ring-red-500 p-4 rounded-lg flex items-center justify-center`}>
        <div className="text-center text-red-600">
          <p className="text-lg">{ language === 'en' ? 'Failed to load heatmap data.' : 'Gagal memuat data Heatmap.'}</p>
          <p className="text-sm">{props.error?.message || "Unknown error"}</p>
        </div>
      </div>
    );
  }

  if (!props.data || !props.data.length) return (
    <div className={`w-full h-[calc(100dvh*1/3-20px)] 2xl:h-full col-end-${props.colEnd} col-start-${props.colStart} row-start-${props.rowStart} row-end-${props.rowEnd} ring-2 ring-red-500 p-4 rounded-lg flex items-center justify-center`}>
        <div className="text-center text-red-600">
          <p className="text-lg">{ language === 'en' ? 'No heatmap data.' : 'Tidak ada data Heatmap.'}</p>
        </div>
      </div>
  );

  return (
    <></>
  );
};
