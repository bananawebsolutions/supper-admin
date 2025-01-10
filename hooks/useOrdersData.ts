"use client";

import { getOrdersData } from "@/server/actions/getOrdersData";
import { useEffect, useState } from "react";

interface Order {
    id: string;
    _createdAt: string;
}

export const useOrdersData = (date: Date) => {
    const [data, setData] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrdersData = async () => {
            try {
                const response = await getOrdersData(date);

                if (!response) {
                    throw new Error("Failed to fetch orders data");
                }

                setData(response as Order[]);
            } catch (error) {
                setError(
                    (error as Error).message || "Failed to fetch orders data"
                );
                throw error;
            } finally {
                setLoading(false);
            }
        };

        fetchOrdersData();
    }, [date]);

    return { data, loading, error };
};
