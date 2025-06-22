import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Plot from "react-plotly.js";
import { BounceLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useTheme } from "../hook/useTheme";

const api = import.meta.env.VITE_API_URL || "http://localhost:3000";

const fetchMostSold = async () => {
  try {
    const { data } = await axios.get( api + "/product/most-sold");
    return data;
  } catch (err) {
    throw err;
  }
};

export default function PieChart() {
  
  const [mobile, setMobile] = useState(false);
  const language = useTheme(state => state.language);
  const theme = useTheme(state => state.theme);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["mostSold"],
    queryFn: fetchMostSold,
  });

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1e293b' : 'white';
  const textColor = isDark ? 'white' : '#1f2937';
  const loaderColor = isDark ? 'white' : 'black';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1536) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobile])

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100dvh*1/3-20px)] 2xl:h-full flex justify-center items-center col-start-1 col-end-2 row-start-1 row-end-2 ring-2 ring-slate-500 dark:ring-slate-600 dark:bg-slate-800 p-2 rounded-lg">
        <BounceLoader color={loaderColor} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[calc(100dvh*1/3-20px)] 2xl:h-full  row-start-1 row-end-2 col-start-1 col-end-2 ring-2 ring-red-500 p-4 rounded-lg flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg">{ language === 'en' ? 'Failed to load pie chart data.' : 'Gagal memuat data Pie Chart.'}</p>
          <p className="text-sm">{error?.message || "Unknown error"}</p>
        </div>
      </div>
    );
  }

  if (!data || !data.length) return (
    <div className="w-full h-[calc(100dvh*1/3-20px)] 2xl:h-full col-span-2 row-start-1 row-end-2 col-end-3 col-start-2 ring-2 ring-red-500 p-4 rounded-lg flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg">{ language === 'en' ? 'No pie chart data.' : 'Tidak ada data Pie Chart.'}</p>
        </div>
      </div>
  );

  const sorted = [...data].sort((a, b) => b.totalSold - a.totalSold);
  const top10 = sorted.slice(0, 10);

  const labels = top10.map((item) => item.name);
  const values = top10.map((item) => item.totalSold);

  const getLayout = () => {
    return {
      title: {
  text: language === 'en' ? 'Top 10 Sold Products' : 'Top 10 Produk Terjual',
  x: 0.5,
  font: { size: 18, color: textColor }
},
      paper_bgcolor: bgColor,
      plot_bgcolor: bgColor,
      font: { color: textColor },
   
      legend: {
        orientation: mobile ? "h" : "v",
        x: mobile ? 0.5 : 5,
        y: mobile ? 0 : 0.5,
        xanchor: mobile ? 'center' : 'left',
        font: { 
          size: mobile ? 10 : 12,
          color: textColor 
        },
      },
      margin: {
        l: mobile ? 20 : 40,
        r: mobile ? 20 : 60,
        t: mobile ? 40 : 60,
        b: mobile ? 0 : 40
      }
    };
  };

  return (
    <div className="w-full h-auto min-h-[600px] 2xl:min-h-0 col-start-1 z-[50] flex flex-col items-center col-end-2 ring-2 p-2 rounded-lg ring-slate-500 dark:ring-slate-600 dark:bg-slate-800 row-start-1 row-end-2 ">
      
      <Plot
        data={[
          {
           
            type: "pie",
            labels: labels,
            values: values,
            textinfo: window.innerWidth < 768 ? "percent" : "label+percent",
            textposition: "inside",
            hoverinfo: "label+value+percent",
            marker: {
              colors: [
                "#636EFA", "#EF553B", "#00CC96", "#AB63FA", "#FFA15A",
                "#19D3F3", "#FF6692", "#B6E880", "#FF97FF", "#FECB52",
              ],
            },
            
            textfont: {
              color: 'white',
              size: window.innerWidth < 768 ? 10 : 12
            }
          },
        ]}
        layout={getLayout()}
        style={{
          
          width: "100%",
          height: "100%",
        }}
        useResizeHandler={true}
        config={{ 
         
          displayModeBar: window.innerWidth >= 768, 
        }}
      />
    </div>
  );
}