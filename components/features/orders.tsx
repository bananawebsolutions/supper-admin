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
import OrderDetails from "../order-details";
import useShippingData from "@/hooks/useShippingData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Button } from "../ui/button";
import { useOrdersStore } from "@/store/ordersStore";

export default function Orders() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    const printQuantities = useOrdersStore((state) => state.printQuantities);
    const resetOrders = useOrdersStore((state) => state.resetOrders);
    const setPrintQuantities = useOrdersStore(
        (state) => state.setPrintQuantities
    );
    const setPrintProcess = useOrdersStore((state) => state.setPrintProcess);

    const { data: payments, loading, error } = usePaymentsData();
    const {
        data: shipping,
        loading: shippingLoading,
        error: shippingError,
    } = useShippingData();

    if (loading || shippingLoading) {
        return <p>Cargando...</p>;
    }
    if (error || shippingError) {
        return <p className="text-red-500">Error: {error || shippingError}</p>;
    }

    const filteredPayments = selectedDate
        ? payments.filter((payment: Stripe.Checkout.Session) => {
              const paymentDate = new Date(payment.created * 1000); // Assuming payment.created is a Unix timestamp
              return paymentDate.toDateString() === selectedDate.toDateString();
          })
        : payments;

    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
    const paginatedPayments = filteredPayments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Card>
            <CardHeader className="px-7">
                <div className="flex gap-2 items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <CardTitle>Pedidos</CardTitle>
                        <CardDescription>
                            Pedidos recientes de la tienda en línea.
                        </CardDescription>
                    </div>
                    <div className="flex gap-2 items-center">
                        <DatePicker
                            selected={selectedDate}
                            dateFormat={"d/M/yyyy"}
                            onChange={(date) => setSelectedDate(date)}
                            placeholderText="Selecciona una fecha"
                            className="border border-muted text-muted-foreground rounded-md px-3 py-1"
                        />
                        <Button
                            onClick={() => {
                                setPrintQuantities(true);
                            }}
                            variant="outline"
                            disabled={printQuantities}
                        >
                            Imprimir Cantidades
                        </Button>
                        <Button
                            variant="outline"
                            disabled={!printQuantities}
                            onClick={() => {
                                resetOrders();
                                setPrintQuantities(false);
                                setPrintProcess(false);
                            }}
                        >
                            Resetear Cantidades
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {paginatedPayments?.length > 0 ? (
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
                                <TableHead className="text-center">
                                    Dirección Cliente
                                </TableHead>
                                <TableHead className="text-center">
                                    Lugar de Recolección
                                </TableHead>
                                <TableHead className="text-center">
                                    Horario de Entrega
                                </TableHead>
                                <TableHead className="text-right">
                                    Detalles del Pedido
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedPayments.map(
                                (payment: Stripe.Checkout.Session) => {
                                    const matchingShipping = shipping?.find(
                                        (item: Stripe.PaymentIntent) =>
                                            item.id === payment.payment_intent
                                    ) as Stripe.PaymentIntent | undefined;

                                    return (
                                        <TableRow key={payment.id}>
                                            <TableCell>
                                                <div className="text-sm md:inline">
                                                    {payment.metadata?.email}
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                {
                                                    payment.metadata
                                                        ?.shippingMethod
                                                }
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge
                                                    className={`text-xs ${
                                                        payment.payment_status ===
                                                        "paid"
                                                            ? "bg-green-100 dark:bg-green-600 dark:border-green-500 border-green-200 hover:bg-green-100 hover:dark:bg-green-600"
                                                            : "bg-red-100 dark:bg-red-600 border-red-200 dark:border-red-500 hover:bg-red-100 hover:dark:bg-red-600"
                                                    } border-[1px] border-green-200`}
                                                    variant="secondary"
                                                >
                                                    {payment.payment_status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {payment.metadata?.date}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <FormattedPrice
                                                    amount={
                                                        payment?.amount_total
                                                            ? payment.amount_total /
                                                              100
                                                            : 0
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell className="text-right hidden md:table-cell">
                                                {payment.id.slice(-10)}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {matchingShipping?.shipping ? (
                                                    <>
                                                        {
                                                            matchingShipping
                                                                .shipping
                                                                ?.address?.city
                                                        }{" "}
                                                        {
                                                            matchingShipping
                                                                .shipping
                                                                ?.address
                                                                ?.country
                                                        }{" "}
                                                        {
                                                            matchingShipping
                                                                .shipping
                                                                ?.address?.state
                                                        }{" "}
                                                        {
                                                            matchingShipping
                                                                .shipping
                                                                ?.address?.line1
                                                        }{" "}
                                                        {
                                                            matchingShipping
                                                                .shipping
                                                                ?.address?.line2
                                                        }{" "}
                                                        {
                                                            matchingShipping
                                                                .shipping
                                                                ?.address
                                                                ?.postal_code
                                                        }
                                                    </>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground italic">
                                                        -
                                                    </p>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {payment.metadata
                                                    ?.pickupLocation &&
                                                payment.metadata
                                                    ?.shippingMethod ===
                                                    "pickup" ? (
                                                    <p className="text-sm text-muted-foreground">
                                                        {
                                                            payment.metadata
                                                                ?.pickupLocation
                                                        }
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground italic">
                                                        -
                                                    </p>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {payment.metadata?.schedule ? (
                                                    <p className="text-sm text-muted-foreground">
                                                        {
                                                            payment.metadata
                                                                ?.schedule
                                                        }
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground italic">
                                                        -
                                                    </p>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <OrderDetails
                                                    email={
                                                        payment?.metadata
                                                            ?.email ?? ""
                                                    }
                                                    orderId={payment?.id}
                                                    printQuantities={
                                                        printQuantities
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                }
                            )}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-sm pl-2">Aún no tienes pedidos.</p>
                )}
                <div className="flex items-center justify-between mt-4">
                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded disabled:opacity-50"
                    >
                        Anterior
                    </Button>
                    <span className="text-sm text-foreground">
                        Página {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded disabled:opacity-50"
                    >
                        Siguiente
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
