"use client";

import { getOrdersData } from "@/server/actions/getOrdersData";
import { useEffect, useState } from "react";

// export const useOrdersData = (date: Date) => {
export const useOrdersData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrdersData = async () => {
            try {
                // const response = await getOrdersData(date);
                const response = await getOrdersData();

                if (!response) {
                    throw new Error("Failed to fetch orders data");
                }

                setData(response);
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
        // }, [date]);
    }, []);

    return { data, loading, error };
};
