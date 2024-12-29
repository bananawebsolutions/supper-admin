import { useOrderData } from "@/hooks/useOrderData";

interface Props {
    orderId: string;
    email: string;
}

function OrderDetails({ orderId, email }: Props) {
    const { data: order, error, loading } = useOrderData({ orderId, email });

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div>
            OrderDetails
            <div>
                {order?.items?.map((item) => (
                    <div key={item._id}>{item.title}</div>
                ))}
            </div>
        </div>
    );
}

export default OrderDetails;
