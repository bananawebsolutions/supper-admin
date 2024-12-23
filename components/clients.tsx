"use client";

import { useClientsData } from "@/hooks/useClientsData";
import { ClientData } from "@/server/actions/getClientsData";

const Clients = () => {
    const { data: clients, loading, error } = useClientsData();

    if (loading) {
        return <p>Cargando...</p>;
    }
    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <>
            {clients.map((client: ClientData) => (
                <div key={client.email}>
                    <p>{client.email}</p>
                </div>
            ))}
        </>
    );
};

export default Clients;
