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
import { useState } from "react";
import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { useProcessPrintOrder } from "@/hooks/useProcessPrintOrder";
import { Loader2 } from "lucide-react";

interface Props {
    orderId: string;
    email: string;
    printQuantities: boolean;
}

export interface ProductData {
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
    quantity?: number;
    matureQuantity?: number;
    greenQuantity?: number;
    slug: { current: string; _type: string };
}

export interface OrderData {
    items: ProductData[];
    amount: number;
    shipping: number;
}

function OrderDetails({ orderId, email, printQuantities }: Props) {
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

    useProcessPrintOrder(order, printQuantities);

    if (loading) {
        return (
            <div className="fixed top-[82px] left-0 md:left-[222px] lg:left-[282px] right-0 bottom-0 bg-background z-[99]">
                <div className="flex justify-center flex-col items-center w-full h-full">
                    <Loader2 className="animate-spin" />
                </div>
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

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
