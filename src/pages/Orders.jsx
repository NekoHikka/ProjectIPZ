import useOrders from "../viewmodels/useOrders";

const Orders = () => {
  const { orders, error } = useOrders();

  const getOrderStatus = (createdAt) => {
    if (!createdAt) return "Невідомо";
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMs = now - created;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours >= 1 ? "Виконано" : "Нове";
  };

  const getStatusClass = (createdAt) => {
    const status = getOrderStatus(createdAt);
    if (status === "Виконано") return "status-done";
    if (status === "Нове") return "status-new";
    return "status-unknown";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Дата відсутня";

    try {
      const date = new Date(dateString);

      const day = date.toLocaleDateString("uk-UA", { day: "numeric" });
      const month = date.toLocaleDateString("uk-UA", { month: "long" });
      const year = date.toLocaleDateString("uk-UA", { year: "numeric" });

      return `${day} ${month}, ${year}`;
    } catch (error) {
      return dateString;
    }
  };

  if (error) return <div>Помилка: {error.message}</div>;
  if (!orders || orders.length === 0) return <div>Замовлень ще немає</div>;

  return (
    <>
      <div className="orders-container">
        <h2>Ваші замовлення</h2>
        <table className="orderTable">
          <thead>
            <tr>
              <th>№</th>
              <th>Код заказу</th>
              <th>Дата замовлення</th>
              <th>Статус</th>
              <th>Ціна</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>
                  <span className="order-number">{order.id}</span>
                </td>
                <td>
                  <span className="order-code">
                    {order.order_code || "Код відсутній"}
                  </span>
                </td>
                <td>
                  <span className="order-date">
                    {formatDate(order.created_at)}
                  </span>
                </td>
                <td>
                  <div className="block-status">
                    <span
                      className={`status-badge ${getStatusClass(
                        order.created_at
                      )}`}
                    >
                      {getOrderStatus(order.created_at)}
                    </span>
                  </div>
                </td>
                <td>
                  <span className="order-price">
                    {Math.round(order.total_price)}₴
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
