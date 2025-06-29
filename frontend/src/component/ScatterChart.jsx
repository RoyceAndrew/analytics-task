import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Plot from "react-plotly.js";
import { useTheme } from "../hook/useTheme";
import { useData } from "../hook/useData";
import { InfoStatus } from "./InfoStatus";

const api = import.meta.env.VITE_API_URL || "http://localhost:3000";

const fetchGroupedScatterData = async () => {
  const { data } = await axios.get(
   api + "/sale/discount-vs-quantity"
  );
  return data;
};

export default function ScatterChart() {
  const theme = useTheme((s) => s.theme);
  const setScatter = useData((s) => s.setScatter);
  const setShow = useData((s) => s.setShow);
  const language = useTheme((s) => s.language);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["scatterData"],
    queryFn: fetchGroupedScatterData,
  });
  setScatter(data);

  if (isLoading || !data || !data.length || isError) {
      return (
        <InfoStatus props={{isLoading, isError, error, colStart: 2, colEnd: 3, rowStart: 1, rowEnd: 2}} />
      );
    }
  

  const slice = data.slice(0, 2);

  const yRange = [-0.05, 1];
  const maxQty = Math.max(
    ...data.map((s) => Math.max(...s.values.map((v) => v.quantity)))
  );

  return (
    <div className="flex w-full col-start-2 col-end-3 row-start-1 row-end-2 dark:bg-slate-800 dark:ring-slate-600 ring-2 ring-slate-500 p-4 rounded-lg flex-col items-center  ">
      <h2 className="text-xl dark:text-white text-black ">
        {language === "en" ? "Discount vs Quantity" : "Diskon vs Jumlah"}
      </h2>
      <div className="w-full h-full justify-center flex-wrap flex">
        {slice.map((s, i) => (
          <div
            key={i}
            className="w-full md:w-1/2  p-2 box-border items-center  max-w-full"
            style={{ minHeight: "400px" }}
          >
            <Plot
              data={[
                {
                  x: s.values.map((v) => v.quantity),
                  y: s.values.map((v) => v.discount),
                  customdata: s.values.map((v) => v.count),
                  mode: "markers",
                  type: "scatter",
                  marker: { size: 10, cliponaxis: false },
                  hovertemplate: `Quantity: %{x}<br>Discount: %{y}<br>Count: %{customdata}<extra></extra>`,
                },
              ]}
              layout={{
                title: {
                  text: s.state,
                  font: { size: 18, color: theme === "dark" ? "#fff" : "#000" },
                },
                margin: { l: 60, r: 40, t: 40, b: 80 },
                xaxis: {
                  title: {
                    text: language === "en" ? "Quantity" : "Jumlah",
                    font: {
                      size: 14,
                      color: theme === "dark" ? "#fff" : "#000",
                    },
                    layer: "below traces",
                    standoff: 20,
                  },
                  tickformat: ",d",
                  automargin: true,
                  range: [0, maxQty + 1],
                  color: theme === "dark" ? "#fff" : "#000",
                  gridcolor: theme === "dark" ? "#475569" : "#e2e8f0",
                },
                yaxis: {
                  title: {
                    text: language === "en" ? "Discount (%)" : "Diskon (%)",
                    font: {
                      size: 14,
                      color: theme === "dark" ? "#fff" : "#000",
                    },
                    standoff: 20,
                  },
                  tickformat: ".0%",
                  automargin: true,
                  range: yRange,
                  color: theme === "dark" ? "#fff" : "#000",
                  gridcolor: theme === "dark" ? "#475569" : "#e2e8f0",
                },
                paper_bgcolor: theme === "dark" ? "#1e293b" : "#fff",
                plot_bgcolor: theme === "dark" ? "#1e293b" : "#fff",
                font: { color: theme === "dark" ? "#fff" : "#000" },
              }}
              style={{ width: "100%", height: "100%", minHeight: "100%" }}
              useResizeHandler={true}
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => setShow(true)}
        className="px-4 py-2 bg-blue-500  duration-300 ease-in z-[50] cursor-pointer hover:bg-blue-600 text-white rounded"
      >
        Show All
      </button>
    </div>
  );
}
