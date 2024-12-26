interface Props {
    orderId: string;
}

function OrderDetails({ orderId }: Props) {
    return <div>OrderDetails {orderId}</div>;
}

export default OrderDetails;
