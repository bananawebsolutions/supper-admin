"use client";

import { getOrderData } from "@/server/actions/getOrderData";
import { useEffect, useState } from "react";

interface Props {
    orderId: string;
    email: string;
}
export const useOrderData = ({ orderId, email }: Props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClientsData = async () => {
            try {
                const response = await getOrderData({ orderId, email });

                if (!response) {
                    throw new Error("Failed to fetch user Info data");
                }

                setData(response);
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
    }, [orderId, email]);

    return { data, loading, error };
};
