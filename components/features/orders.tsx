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

export default function Orders() {
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
                                No. de Pedido
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                {/* <div className="font-medium">Liam Johnson</div> */}
                                <div className="text-sm md:inline">
                                    liam@example.com
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                Pick & Go
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                <Badge
                                    className="text-xs bg-green-100 dark:bg-green-600 dark:border-green-500 border-[1px] border-green-200"
                                    variant="secondary"
                                >
                                    Pagado
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                2023-06-23
                            </TableCell>
                            <TableCell className="text-right">
                                $250.00
                            </TableCell>
                            <TableCell className="text-right hidden md:table-cell">
                                yaskU293k
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                {/* <div className="font-medium">Olivia Smith</div> */}
                                <div className="text-sm md:inline">
                                    olivia@example.com
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                Domicilio
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                <Badge
                                    className="text-xs bg-red-100 dark:bg-red-600 border-red-200 dark:border-red-500 border-[1px]"
                                    variant="outline"
                                >
                                    Declined
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                2023-06-24
                            </TableCell>
                            <TableCell className="text-right">
                                $150.00
                            </TableCell>
                            <TableCell className="text-right hidden md:table-cell">
                                yaskU293k
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                {/* <div className="font-medium">Noah Williams</div> */}
                                <div className="text-sm md:inline">
                                    noah@example.com
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                Pick & Go
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                <Badge
                                    className="text-xs bg-green-100 dark:bg-green-600 dark:border-green-500 border-[1px] border-green-200"
                                    variant="secondary"
                                >
                                    Pagado
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                2023-06-25
                            </TableCell>
                            <TableCell className="text-right">
                                $350.00
                            </TableCell>
                            <TableCell className="text-right hidden md:table-cell">
                                yaskU293k
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
