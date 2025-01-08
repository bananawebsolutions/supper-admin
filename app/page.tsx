"use client";

import { DollarSign } from "lucide-react";
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
import useSalesData from "@/hooks/useSalesData";
import Stripe from "stripe";

const chartConfig = {
    desktop: {
        label: "Ventas",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export default function Dashboard() {
    const { data: sales, loading, error } = useSalesData();
    const thisYear = new Date().getFullYear();

    const salesByMonth = Array.from({ length: 12 }, () => 0);

    sales.forEach((sale: Stripe.PaymentIntent) => {
        const saleDate = new Date(sale.created * 1000);
        const saleMonth = saleDate.getMonth();
        if (saleDate.getFullYear() === thisYear) {
            salesByMonth[saleMonth] += sale.amount_received / 100;
        }
    });

    const chartData = [
        { month: "Enero", ventas: salesByMonth[0] },
        { month: "Febrero", ventas: salesByMonth[1] },
        { month: "Marzo", ventas: salesByMonth[2] },
        { month: "Abril", ventas: salesByMonth[3] },
        { month: "Mayo", ventas: salesByMonth[4] },
        { month: "Junio", ventas: salesByMonth[5] },
        { month: "Julio", ventas: salesByMonth[6] },
        { month: "Agosto", ventas: salesByMonth[7] },
        { month: "Septiembre", ventas: salesByMonth[8] },
        { month: "Octubre", ventas: salesByMonth[9] },
        { month: "Noviembre", ventas: salesByMonth[10] },
        { month: "Diciembre", ventas: salesByMonth[11] },
    ];

    if (loading) {
        return <p>Cargando...</p>;
    }
    if (error || error) {
        return <p className="text-red-500">Error: {error}</p>;
    }
    return (
        <main>
            <div className="grid grid-cols-1 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="text-foreground h-3" />
                            Ventas Totales - Supper
                        </CardTitle>
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
                                    Ventas Totales por Mes (Ene - Dic)
                                </div>
                                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                    Año<span>{thisYear}</span>
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}
