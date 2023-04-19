import React, { useState,useEffect } from "react";
import { PieChart, Pie, Legend, Sector, Cell, ResponsiveContainer } from 'recharts';

function MyComponent({data,data1}) {

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
    
    const {width,height} = windowSize;
 
    const COLORS = ["#FEB475", "#FCEC62", "#8BFF89", "#88FCCF","#7BF3E6"];
 
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
 
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    const sum = data.reduce((acc, cur) => acc + cur.value, 0);
    const sum1 = data1.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <>
      {width> 1200 ? (
        <div className="wide-screen" style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ margin: '0 20px 0 0' }}>
    <h2 style={{ textAlign: 'center' }}>Incoming-₹{sum}</h2>
        <PieChart width={500} height={600}>
            <Legend layout="vertical" verticalAlign="top" align="top" />
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={200}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    </div>
    <div style={{ margin: '0 0 0 20px' }}>
    <h2 style={{ textAlign: 'center' }}>Outgoing-₹{sum1}</h2>
        <PieChart width={500} height={600}>
            <Legend layout="vertical" verticalAlign="top" align="top" />
            <Pie
                data={data1}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={200}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    </div>
</div>

      ) : (
        <div className="small-screen">
            <>
            <div>
            <h2 style={{ textAlign: 'center',padding:10 }}>Incoming-₹{sum}</h2>
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-md-8" style={{ display: 'flex', justifyContent: 'center',padding:30 }}>
                    <PieChart width={500} height={600} >
                        <Legend layout="vertical" verticalAlign="top" align="top" />
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={200}
                        fill="#8884d8"
                        dataKey="value"
                        
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    </PieChart>
                    </div>
                </div>
            </div>
            </>
            <>
            <div>
            <h2 style={{ textAlign: 'center',padding:10 }}>Outgoing-₹{sum1}</h2>
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-md-8" style={{ display: 'flex', justifyContent: 'center',padding:30 }}>

                    <PieChart width={500} height={600} >
                        <Legend layout="vertical" verticalAlign="top" align="top" />
                    <Pie
                        data={data1}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={200}
                        fill="#8884d8"
                        dataKey="value"
                        
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    </PieChart>
                    </div>
                </div>
            </div>
            </>
        </div>
      )}
    </>
  );
}

export default MyComponent