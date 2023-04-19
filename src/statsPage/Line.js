import React, { useState, useEffect }from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area
} from "recharts";
// import './line.css';
  
  


export default function MyLine({data}) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  let minYValue = Math.min(...data.map((d) => d.y));
  minYValue = minYValue-50
  let maxYValue = Math.max(...data.map((d) => d.y));
  maxYValue = maxYValue+50
  const { width, height } = windowSize;

  const variableWidth = width > 1200 ? 0.7 * width : 0.8 * width;
  const variableHeight = width > 1200 ? 0.8 * height : 0.6 * height;
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <LineChart
        width={variableWidth}
        height={variableHeight}
        data={data}        
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{top:30,bottom : 30,right:1 }}/>
        <YAxis domain={[minYValue, maxYValue]}/>
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pay"
          stroke="#FF69B4"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="receive" stroke="#00FFFF" />
      </LineChart>
      </div>
  );
}
