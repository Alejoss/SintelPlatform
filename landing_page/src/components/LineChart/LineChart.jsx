"use client";
import { useRef, useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import useOnScreen from "@/utils/useOnScreen";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div
                style={{
                    background: "#000",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "5px",
                }}
            >
                <p>{`Year: ${label}`}</p>
                <p>{`Value: $${payload[0].value.toLocaleString()}`}</p>
            </div>
        );
    }

    return null;
};

const data = [
    { year: "2018", Value: 10000 },
    { year: "2019", Value: 20000 },
    { year: "2020", Value: 30000 },
    { year: "2021", Value: 40000 },
    { year: "2022", Value: 50000 },
    { year: "2023", Value: 55000 },
    { year: "2024", Value: 60000 },
];

const LineChartComponent = () => {
    const chartRef = useRef();
    const isVisible = useOnScreen(chartRef);
    const [isReadyToRender, setIsReadyToRender] = useState(false);
    const [hasRendered, setHasRendered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (isVisible && !hasRendered) {
            setIsReadyToRender(true);
            setHasRendered(true);
        }

        if (typeof window !== "undefined") {
            const handleResize = () => {
                setIsMobile(window.innerWidth < 600);
            };

            window.addEventListener("resize", handleResize);
            handleResize(); // Set initial state

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, [isVisible, hasRendered]);

    return (
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}>
            {isReadyToRender && (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 0,
                            right: isMobile ? 0 : 30,
                            left: isMobile ? 0 : 70,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid
                            stroke="#ffffff"
                            strokeOpacity="0.4"
                            vertical={false}
                        />
                        <XAxis
                            axisLine={false}
                            tickMargin={20}
                            dataKey="year"
                            style={{
                                fontSize: isMobile ? "12px" : "inherit",
                            }}
                        />
                        <YAxis
                            axisLine={false}
                            tickMargin={10}
                            type="number"
                            tickFormatter={(value) =>
                                `$${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                )
                            }
                            domain={[0, 60000]}
                            style={{
                                fontSize: isMobile ? "10px" : "inherit",
                            }}
                        />
                        <Tooltip
                            cursor={{ stroke: "rgba(255, 215, 0, 0.25)" }}
                            content={<CustomTooltip />}
                        />
                        <Line
                            type="monotone"
                            dataKey="Value"
                            stroke="#F7B044" // Yellow color
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default LineChartComponent;
