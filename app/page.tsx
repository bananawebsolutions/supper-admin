"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { month: "Enero", ventas: 186 },
    { month: "Febrero", ventas: 305 },
    { month: "Marzo", ventas: 237 },
    { month: "Abril", ventas: 73 },
    { month: "Mayo", ventas: 209 },
    { month: "Junio", ventas: 214 },
    { month: "Julio", ventas: 300 },
];

const chartConfig = {
    desktop: {
        label: "Ventas",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export default function Dashboard() {
    return (
        <main className="">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Ventas Totales - Supper</CardTitle>
                        <CardDescription>
                            Ventas totales de cada mes
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <AreaChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            indicator="dot"
                                            hideLabel
                                        />
                                    }
                                />
                                <Area
                                    dataKey="ventas"
                                    type="linear"
                                    fill="var(--color-desktop)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-desktop)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full items-start gap-2 text-sm">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 font-medium leading-none">
                                    Trending up by 5.2% this month{" "}
                                    <TrendingUp className="h-4 w-4" />
                                </div>
                                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                    Año 2024
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}
