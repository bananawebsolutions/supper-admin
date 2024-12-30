import { useOrderData } from "@/hooks/useOrderData";
import { Card, CardHeader, CardDescription, CardContent } from "./ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

interface Props {
    orderId: string;
    email: string;
}

interface ProductData {
    _createdAt: string;
    _rev: string;
    _id: string;
    title: string;
    bestseller: boolean;
    brand: string;
    description: string;
    price: number;
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

function OrderDetails({ orderId, email }: Props) {
    const {
        data: order,
        error,
        loading,
    } = useOrderData({ orderId, email }) as unknown as {
        data: OrderData | null;
        error: string | null;
        loading: boolean;
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <Card>
            <CardHeader className="px-7">
                Detalles de la orden
                <CardDescription>
                    Detalles de la orden seleccionada
                </CardDescription>
            </CardHeader>
            <CardContent>
                {order?.items ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Orden Detallada</TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Kg Maduro</TableHead>
                                <TableHead>Kg Verde</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order?.items?.map((item: ProductData) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    {item?.quantity &&
                                    item?.productType === "other" ? (
                                        <TableCell>{item.quantity}</TableCell>
                                    ) : (
                                        <TableCell className="text-muted-foreground italic">
                                            -
                                        </TableCell>
                                    )}
                                    {item?.matureQuantity &&
                                    item?.productType !== "other" ? (
                                        <TableCell>
                                            {item?.matureQuantity}
                                        </TableCell>
                                    ) : (
                                        <TableCell className="text-muted-foreground italic">
                                            -
                                        </TableCell>
                                    )}
                                    {item?.greenQuantity &&
                                    item?.productType !== "other" ? (
                                        <TableCell>
                                            {item.greenQuantity}
                                        </TableCell>
                                    ) : (
                                        <TableCell className="text-muted-foreground italic">
                                            -
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No se encontraron detalles de la orden</p>
                )}
            </CardContent>
        </Card>
    );
}

export default OrderDetails;
