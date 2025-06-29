import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Plot from "react-plotly.js";
import { useTheme } from "../hook/useTheme";
import { InfoStatus } from "./InfoStatus";


const api = import.meta.env.VITE_API_URL || "http://localhost:3000";

const fetchHeatmapData = async () => {
  try {
    const { data } = await axios.get(api + "/sale/quantity-by-state");
    return data;
  } catch (error) {
    throw error;
  }
};

export default function HeatmapChart() {
  const language = useTheme(state => state.language);
  const theme = useTheme(state => state.theme);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["heatmapData"],
    queryFn: fetchHeatmapData,
  });

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1e293b' : 'white';
  const textColor = isDark ? 'white' : '#1f2937';

  if (isLoading || !data || !data.length || isError) {
    return (
      <InfoStatus props={{isLoading, isError, error, colStart: 1, colEnd: 3, rowStart: 2, rowEnd: 3}} />
    );
  }


  const filteredData = data.filter(item => item.quantity > 0);

  const statesSummary = {};
  const productsSummary = {};

  filteredData.forEach(item => {
    if (!statesSummary[item.state]) {
      statesSummary[item.state] = 0;
    }
    statesSummary[item.state] += item.quantity;

    if (!productsSummary[item.product]) {
      productsSummary[item.product] = 0;
    }
    productsSummary[item.product] += item.quantity;
  });

  const topStates = Object.entries(statesSummary)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([state]) => state);

  const topProducts = Object.entries(productsSummary)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 15)
    .map(([product]) => product);

  const finalData = filteredData.filter(item => 
    topStates.includes(item.state) && topProducts.includes(item.product)
  );

  const z = topStates.map(state => 
    topProducts.map(product => {
      const found = finalData.find(item => 
        item.state === state && item.product === product
      );
      return found ? found.quantity : 0;
    })
  );

  const nonZeroValues = z.flat().filter(val => val > 0);
  const maxValue = Math.max(...nonZeroValues);

  return (
    <div className="w-full h-full dark:bg-slate-800 min-h-[500px] max-w-[1000dvw] col-span-2 row-start-2 row-end-3 ring-2 ring-slate-500 p-2 rounded-lg bg-white">
      <Plot
        data={[
          {
            z: z,
            x: topProducts,
            y: topStates,
            type: "heatmap",
            colorscale: [
              [0, "#ffffff"],     
              [0.3, "#fde047"],    
              [0.5, "#facc15"],    
              [0.7, "#f59e0b"],    
              [0.9, "#dc2626"],    
              [1, "#7f1d1d"]      
            ],
            showscale: true,
            hoverongaps: false,
            hovertemplate: 
              "<b>%{y}</b><br>" +
              "Product: %{x}<br>" +
              "Quantity: %{z}<br>" +
              "<extra></extra>",
            colorbar: {
              title: {
                text: "Qty Sold",
                side: "right"
              },
              thickness: 12,
              len: 0.8,
              tickfont: { size: 10 }
            },
           
            zauto: false,
            zmin: 0,
            zmax: maxValue
          }
        ]}
        layout={{
          title: {
            text: language === 'en' ? "Top Products Sales by Top States" : "Top Produk Terjual Berdasarkan Top Negara",
            font: { size: 18, color: textColor },
            x: 0.5,
            xanchor: 'center'
          },
          xaxis: {
            title: {
              text: "Top 15 Products",
              font: { size: 11 }
            },
            tickangle: -45,
            side: "bottom",
            tickfont: { size: 8 },
            automargin: true
          },
          yaxis: {
            title: {
              text: "Top 10 States",
              font: { size: 11 }
            },
            tickfont: { size: 9 },
            automargin: true
          },
          margin: { 
            l: 80, 
            r: 70, 
            t: 50, 
            b: 120 
          },
          paper_bgcolor: bgColor,
          plot_bgcolor: bgColor,
          font: { 
            family: "Arial, sans-serif",
            size: 9,
            color: textColor
          },
          
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
        config={{ 
          responsive: true,
          displayModeBar: true,
          modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d', 'autoScale2d'],
          displaylogo: false
        }}
      />

      
    </div>
  );
}