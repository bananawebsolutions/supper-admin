// TODO: Do not make all this client, find the way to do it better. Or else, leave it there.
"use client";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import usePaymentsData from "@/hooks/usePaymentsData";
import Stripe from "stripe";
import FormattedPrice from "../formatted-price";

export default function Orders() {
    const { data: payments, loading, error } = usePaymentsData();

    if (loading) {
        return <p>Cargando...</p>;
    }
    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>Pedidos</CardTitle>
                <CardDescription>
                    Pedidos recientes de la tienda en línea.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Cliente</TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Método de Envío
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Status
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Fecha
                            </TableHead>
                            <TableHead className="text-right">
                                Importe
                            </TableHead>
                            <TableHead className="text-right hidden md:table-cell">
                                Id Pedido
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments?.map((payment: Stripe.Checkout.Session) => (
                            <TableRow key={payment.id}>
                                <TableCell>
                                    <div className="text-sm md:inline">
                                        {payment.metadata["email"]}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {payment.metadata["shippingMethod"]}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge
                                        className={`text-xs ${
                                            payment.payment_status === "paid"
                                                ? "bg-green-100 dark:bg-green-600 dark:border-green-500 border-green-200 hover:bg-green-100 hover:dark:bg-green-700"
                                                : "bg-red-100 dark:bg-red-600 border-red-200 dark:border-red-500 hover:bg-red-100 hover:dark:bg-red-700"
                                        } border-[1px] border-green-200`}
                                        variant="secondary"
                                    >
                                        {payment.payment_status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {payment.metadata["date"]}
                                </TableCell>
                                <TableCell className="text-right">
                                    <FormattedPrice
                                        amount={payment.amount_total / 100}
                                    />
                                </TableCell>
                                <TableCell className="text-right hidden md:table-cell">
                                    {payment.id.slice(-10)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
