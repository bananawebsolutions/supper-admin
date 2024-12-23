"use client";

import { useClientsData } from "@/hooks/useClientsData";
import { ClientData } from "@/server/actions/getClientsData";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

const Clients = () => {
    const { data: clients, loading, error } = useClientsData();

    if (loading) {
        return <p>Cargando...</p>;
    }
    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>Clientes</CardTitle>
                <CardDescription>Lista de clientes</CardDescription>
            </CardHeader>
            <CardContent>
                {clients?.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map((client: ClientData) => (
                                <TableRow key={client.email}>
                                    <TableCell>{client.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-sm pl-2">No hay clientes todavía</p>
                )}
            </CardContent>
        </Card>
    );
};

export default Clients;
