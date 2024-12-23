"use client";

import { getClientsData } from "@/server/actions/getClientsData";
import { useEffect, useState } from "react";
import { ClientData } from "@/server/actions/getClientsData";

export const useClientsData = () => {
    const [data, setData] = useState<ClientData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClientsData = async () => {
            try {
                const response = await getClientsData();

                if (!response) {
                    throw new Error("Failed to fetch clients data");
                }

                setData(response as ClientData[]);
            } catch (error) {
                setError(
                    (error as Error).message || "Failed to fetch clients data"
                );
                throw error;
            } finally {
                setLoading(false);
            }
        };

        fetchClientsData();
    }, []);

    return { data, loading, error };
};
