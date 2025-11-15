// import React, { useEffect, useState } from "react";
// import { getDailySales, getSalesPrediction } from "../../services/saleService";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// const SalesAnalysisChart = () => {
//   const [data, setData] = useState([]);

// // useEffect(() => {
// //   const fetchData = async () => {
// //     try {
// //       const actualRes = await getDailySales();
// //       const forecastRes = await getSalesPrediction();

// //       const actual = Array.isArray(actualRes?.data) ? actualRes.data : [];
// //       const forecast = Array.isArray(forecastRes?.forecast)
// //         ? forecastRes.forecast
// //         : [];

// //       const actualData = actual.map((d) => ({
// //         date: d.date,
// //         actualSales: d.actualSales,
// //         predictedSales: null,
// //       }));

// //       const predictedData = forecast.map((f) => ({
// //         date: new Date(Number(f.ds)).toISOString().split("T")[0],
// //         actualSales: null,
// //         predictedSales: Math.round(f.yhat),
// //       }));

// //       const last5Actual = actualData.slice(-5);
// //       const first5Predicted = predictedData.slice(0, 5);

// //       const cleanMerged = [...last5Actual, ...first5Predicted].sort((a, b) => {
// //         // ✔ actual data always come first
// //         if (a.actualSales !== null && b.actualSales === null) return -1;
// //         if (a.actualSales === null && b.actualSales !== null) return 1;

// //         // ✔ then sort inside each group by date
// //         return new Date(a.date) - new Date(b.date);
// //       });

// //       setData(cleanMerged);

// //     } catch (err) {
// //       console.error("Error loading sales data or prediction:", err);
// //     }
// //   };

// //   fetchData();
// // }, []);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const actualRes = await getDailySales();
//       const forecastRes = await getSalesPrediction();

//       const actual = Array.isArray(actualRes?.data) ? actualRes.data : [];
//       const forecast = Array.isArray(forecastRes?.forecast)
//         ? forecastRes.forecast
//         : [];

//       // --- Convert actual sales ---
//       const actualData = actual.map((d) => ({
//         date: d.date,
//         actualSales: d.actualSales,
//         predictedSales: null,
//       }));

//       // Keep last 5 actual points
//       const lastActual = actualData.slice(-5);

//       // Convert prophet predictions (just values)
//       const predictedValues = forecast.slice(0, 5).map((f) =>
//         Math.round(f.yhat)
//       );

//       // Find last actual date
//       const lastDateObj = new Date(lastActual[lastActual.length - 1].date);

//       // Generate 5 consecutive future dates
//       const futureDates = Array.from({ length: 5 }, (_, i) => {
//         const d = new Date(lastDateObj);
//         d.setDate(d.getDate() + (i + 1));
//         return d.toISOString().split("T")[0];
//       });

//       // Build predicted dataset with clean spacing
//       const predictedData = futureDates.map((date, i) => ({
//         date,
//         actualSales: null,
//         predictedSales: predictedValues[i] || 0,
//       }));

//       // Merge final dataset
//       const finalData = [...lastActual, ...predictedData];

//       setData(finalData);
//     } catch (err) {
//       console.error("Error loading sales data or prediction:", err);
//     }
//   };

//   fetchData();
// }, []);

//   return (
//     <div className="p-4 bg-white rounded-2xl shadow">
//       <h2 className="text-lg font-semibold mb-2">📈 Sales Forecast (Prophet ML)</h2>

//       <ResponsiveContainer width="400" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="2 2"/>

//           <XAxis dataKey="date" />

//           <YAxis />

//           <Tooltip />
//           <Legend />

//           {/* Actual Sales */}
//           <Line
//             type="monotone"
//             dataKey="actualSales"
//             stroke="#2563eb"
//             dot={false}
//             name="Actual Sales"
//           />

//           {/* Predicted Sales */}
//           <Line
//             type="monotone"
//             dataKey="predictedSales"
//             stroke="#22c55e"
//             dot={false}
//             name="Predicted Sales (Prophet)"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default SalesAnalysisChart;


import React, { useEffect, useState } from "react";
import { getDailySales, getSalesPrediction } from "../../services/saleService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Area,
} from "recharts";

const SalesAnalysisChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actualRes = await getDailySales();
        const forecastRes = await getSalesPrediction();

        const actual = actualRes?.data || [];
        const forecast = forecastRes?.forecast || [];

        // ----- Convert actual -----
        const actualData = actual.map((d) => ({
          date: d.date,
          actualSales: d.actualSales,
          predictedSales: null,
          upper: null,
          lower: null,
        }));

        const lastActual = actualData.slice(-5);

        // ----- Extract Prophet predicted values -----
        const yhat = forecast.slice(0, 5).map((f) => Math.round(f.yhat));
        const yhatUpper = forecast.slice(0, 5).map((f) => Math.round(f.yhat_upper || f.yhat));
        const yhatLower = forecast.slice(0, 5).map((f) => Math.round(f.yhat_lower || f.yhat));

        // ----- Generate next 5 dates -----
        const lastActualDate = new Date(lastActual[lastActual.length - 1].date);

        const nextDates = Array.from({ length: 5 }, (_, i) => {
          const d = new Date(lastActualDate);
          d.setDate(d.getDate() + (i + 1));
          return d.toISOString().split("T")[0];
        });

        const predictedData = nextDates.map((date, i) => ({
          date,
          actualSales: null,
          predictedSales: yhat[i],
          upper: yhatUpper[i],
          lower: yhatLower[i],
        }));

        setData([...lastActual, ...predictedData]);
      } catch (err) {
        console.error("Error loading sales graph:", err);
      }
    };

    fetchData();
  }, []);

  const today = data.length > 0 ? data[4]?.date : null; // marker between actual & predicted

  return (
    <div className="p-4 bg-white rounded-2xl shadow" style={{ width: "100%" }}>
      <h2 className="text-lg font-semibold mb-2">📈 Sales Forecast</h2>

      <ResponsiveContainer width="450" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />
          <YAxis />

          <Tooltip />
          <Legend />

          {/* Vertical line = TODAY */}
          {today && (
            <ReferenceLine x={today} stroke="#555" strokeDasharray="3 3" label="Today" />
          )}

          {/* Confidence (shaded area) */}
          <Area
            type="monotone"
            dataKey="upper"
            stroke={false}
            fill="#bbf7d0"
            activeDot={false}
          />
          <Area
            type="monotone"
            dataKey="lower"
            stroke={false}
            fill="#ffffff"
            activeDot={false}
          />

          {/* Actual sales */}
          <Line
            type="monotone"
            dataKey="actualSales"
            stroke="#2563eb"
            strokeWidth={2}
            dot={true}
            name="Actual Sales"
          />

          {/* Predicted sales */}
          <Line
            type="monotone"
            dataKey="predictedSales"
            stroke="#16a34a"
            strokeWidth={2}
            dot={true}
            strokeDasharray="6 4"
            name="Predicted Sales (Prophet)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesAnalysisChart;
