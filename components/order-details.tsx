import { useOrderData } from "@/hooks/useOrderData";
import { Card, CardContent } from "./ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { useOrdersStore } from "@/store/ordersStore";

interface Props {
    orderId: string;
    email: string;
    pickupLocation: string;
    shippingMethod: string;
    schedule: string;
}

interface ProductData {
    _createdAt: string;
    _rev: string;
    _id: string;
    kgQuantity?: number;
    title: string;
    bestseller: boolean;
    brand: string;
    description: string;
    kgPrice: number;
    pPrice: number;
    image: { _type: string; asset: { _ref: string; _type: string } };
    productCategory: string;
    productType: string;
    quantity: number;
    matureQuantity?: number;
    greenQuantity?: number;
    slug: { current: string; _type: string };
}

interface OrderData {
    items: ProductData[];
    amount: number;
    shipping: number;
}

function OrderDetails({
    orderId,
    email,
    shippingMethod,
    pickupLocation,
    schedule,
}: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        data: order,
        error,
        loading,
    } = useOrderData({ orderId, email }) as unknown as {
        data: OrderData | null;
        error: string | null;
        loading: boolean;
    };

    const addOrUpdateOrder = useOrdersStore((state) => state.addOrUpdateOrder);
    const totalOrders = useOrdersStore((state) => state.totalOrders);

    console.log(totalOrders);

    useEffect(() => {
        if (order?.items) {
            order?.items.forEach((item) => {
                addOrUpdateOrder({
                    product: item?.title,
                    quantity: item?.quantity || 0,
                    kgQuantity: item?.kgQuantity || 0,
                    matureKgQuantity: item?.matureQuantity || 0,
                    greenKgQuantity: item?.greenQuantity || 0,
                });
            });
        }
    }, [order, addOrUpdateOrder]);

    if (loading && isOpen && !order) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    // const totalOrders = [];

    // const orderItems = order?.items?.map((item) => {
    //     totalOrders.push({
    //         product: item?.title,
    //         quantity: item?.quantity || 0,
    //         kgQuantity: item?.kgQuantity || 0,
    //     });
    // });

    // console.log(totalOrders);

    return (
        <div className="flex justify-end">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger
                    asChild
                    className="text-muted-foreground text-sm"
                >
                    <Button
                        variant="outline"
                        className={`${isOpen ? "hidden" : "block"}`}
                    >
                        Ver detalles
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className="mt-4 flex flex-row items-center justify-between">
                        <div>
                            <DialogTitle>Detalles del pedido</DialogTitle>
                            <DialogDescription>
                                Detalles del pedido seleccionado
                            </DialogDescription>
                        </div>
                        <Button
                            onClick={() => setIsOpen(false)}
                            variant="outline"
                        >
                            Cerrar
                        </Button>
                    </DialogHeader>
                    <Card className="mt-4 w-full">
                        <CardContent>
                            {order?.items ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>
                                                Orden Detallada
                                            </TableHead>
                                            <TableHead>Precio</TableHead>
                                            <TableHead>Cantidad</TableHead>
                                            <TableHead>Kg Maduro</TableHead>
                                            <TableHead>Kg Verde</TableHead>
                                            <TableHead>Kg</TableHead>
                                            <TableHead>
                                                Lugar recolección pickup
                                            </TableHead>
                                            <TableHead>
                                                Horario de entrega
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {order?.items?.map(
                                            (item: ProductData) => (
                                                <TableRow key={item._id}>
                                                    <TableCell>
                                                        {item.title}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.kgPrice
                                                            ? item.kgPrice
                                                            : item.pPrice}
                                                    </TableCell>
                                                    {item?.quantity ? (
                                                        <TableCell>
                                                            {item.quantity}
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell className="text-muted-foreground italic">
                                                            -
                                                        </TableCell>
                                                    )}
                                                    {item?.matureQuantity ? (
                                                        <TableCell>
                                                            {
                                                                item?.matureQuantity
                                                            }
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell className="text-muted-foreground italic">
                                                            -
                                                        </TableCell>
                                                    )}
                                                    {item?.greenQuantity ? (
                                                        <TableCell>
                                                            {item.greenQuantity}
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell className="text-muted-foreground italic">
                                                            -
                                                        </TableCell>
                                                    )}
                                                    {item?.kgQuantity ? (
                                                        <TableCell className="text-muted-foreground italic">
                                                            {item.kgQuantity}
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell className="text-muted-foreground italic">
                                                            -
                                                        </TableCell>
                                                    )}
                                                    {shippingMethod ===
                                                    "pickup" ? (
                                                        <TableCell>
                                                            {pickupLocation}
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell className="text-muted-foreground italic">
                                                            -
                                                        </TableCell>
                                                    )}
                                                    {shippingMethod ===
                                                    "domicilio" ? (
                                                        <TableCell>
                                                            {schedule}
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell className="text-muted-foreground italic">
                                                            -
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p>No se encontraron detalles de la orden</p>
                            )}
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default OrderDetails;
