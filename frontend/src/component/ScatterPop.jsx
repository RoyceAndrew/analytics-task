import { useData } from "../hook/useData";
import Plot from "react-plotly.js";
import { useEffect } from "react";
import { useTheme } from "../hook/useTheme";

export default function ScatterPop() {
  const show = useData((s) => s.show);
  const scatterChart = useData((s) => s.scatterChart);
  const theme = useTheme((s) => s.theme);
  const language = useTheme((s) => s.language);

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }, [show])

  if (!scatterChart || !scatterChart.length) return null;

  

  const yRange = [-0.05, 1];
  const maxQty = Math.max(
    ...scatterChart.map((s) => Math.max(...s.values.map((v) => v.quantity)))
  );

  return (
    <div
      className={`${
        show ? "flex" : "hidden"
      } fixed top-0 left-0 z-[995] w-full h-[100dvh] overflow-y-scroll overflow-x-hidden flex-wrap p-10 bg-white dark:bg-slate-800`}
    >
      {scatterChart.map((s, i) => (
        <div
          key={i}
          className="w-full md:w-1/2 xl:w-1/3 p-2 box-border  max-w-full"
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
                  font: { size: 14, color: theme === "dark" ? "#fff" : "#000" },
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
                  font: { size: 14, color: theme === "dark" ? "#fff" : "#000" },
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
            config={{ responsive: true }}
          />
        </div>
      ))}
    </div>
  );
}
