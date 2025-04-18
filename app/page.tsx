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
import { useOrdersStore } from "@/store/ordersStore";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const chartConfig = {
    desktop: {
        label: "Ventas",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export default function Dashboard() {
    const { data: sales, loading, error } = useSalesData();

    const totalOrders = useOrdersStore((state) => state.totalOrders);

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
    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }
    return (
        <main>
            <div className="grid grid-cols-1 gap-4">
                <Card className="max-w-[800px]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="text-foreground h-5" />
                            Ventas Totales - Supper
                        </CardTitle>
                        <CardDescription>
                            Ventas totales de cada mes
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={chartConfig}
                            className="max-h-[400px]"
                        >
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
                <Card>
                    <CardHeader>
                        <CardTitle>Totales de Ventas dia siguiente</CardTitle>
                    </CardHeader>
                    {totalOrders.length > 0 ? (
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Producto</TableHead>
                                        <TableHead>Unidades</TableHead>
                                        <TableHead>Kg</TableHead>
                                        <TableHead>Kg Maduro</TableHead>
                                        <TableHead>Kg Verde</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {totalOrders.map((order, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {order.product}
                                            </TableCell>
                                            <TableCell>
                                                {order.quantity || 0}
                                            </TableCell>
                                            <TableCell>
                                                {order.kgQuantity || 0}
                                            </TableCell>
                                            <TableCell>
                                                {order.matureKgQuantity || 0}
                                            </TableCell>
                                            <TableCell>
                                                {order.greenKgQuantity || 0}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <CardFooter>
                                <div className="flex w-full items-start gap-2 text-sm">
                                    <div className="grid gap-2">
                                        <div className="flex items-center gap-2 font-medium leading-none">
                                            Total de Productos:{" "}
                                            {totalOrders.length}
                                        </div>
                                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                            Total de Unidades:{" "}
                                            {totalOrders.reduce(
                                                (acc, order) =>
                                                    acc + order.quantity,
                                                0
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                            Total de Kg:{" "}
                                            {totalOrders.reduce(
                                                (acc, order) =>
                                                    acc +
                                                    order.kgQuantity +
                                                    order.matureKgQuantity +
                                                    order.greenKgQuantity,
                                                0
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardFooter>
                        </CardContent>
                    ) : (
                        <CardContent>
                            <p>No se han impreso pedidos</p>
                        </CardContent>
                    )}
                </Card>
            </div>
        </main>
    );
}
