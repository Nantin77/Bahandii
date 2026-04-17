import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/style/style.css'; // Используем те же стили

function CartPage({ cart, setCart }) {
    // Считаем итоговую сумму
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Удаление товара полностью
    const removeItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // Изменение количества (+ или -)
    const updateQuantity = (id, amount) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + amount;
                return { ...item, quantity: newQty > 0 ? newQty : 1 };
            }
            return item;
        }));
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>Ваша корзина</h1>
            
            {cart.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <p>В корзине пока ничего нет 😢</p>
                    <Link to="/" style={{ color: "#009746", fontWeight: "bold" }}>Вернуться в меню</Link>
                </div>
            ) : (
                <div>
                    {cart.map(item => (
                        <div key={item.id} className="cart-item" style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                            borderBottom: "1px solid #ddd",
                            padding: "15px 0"
                        }}>
                            {/* Фото товара */}
                            <img src={item.image} alt={item.name} style={{
                                width: "100px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "8px"
                            }} />

                            {/* Информация */}
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: 0 }}>{item.name}</h3>
                                <p style={{ color: "#009746", fontWeight: "bold", margin: "5px 0" }}>
                                    {item.price.toLocaleString('ru-RU')} ₸
                                </p>
                            </div>

                            {/* Управление количеством */}
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn">-</button>
                                <span style={{ fontWeight: "bold", minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn">+</button>
                            </div>

                            {/* Сумма за этот тип товара */}
                            <div style={{ minWidth: "100px", textAlign: "right", fontWeight: "bold" }}>
                                {(item.price * item.quantity).toLocaleString('ru-RU')} ₸
                            </div>

                            {/* Удаление */}
                            <button 
                                onClick={() => removeItem(item.id)} 
                                style={{ background: "none", border: "none", color: "#ff4d4d", cursor: "pointer", fontSize: "20px" }}
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {/* Итоговый блок */}
                    <div style={{ marginTop: "30px", textAlign: "right", borderTop: "2px solid #009746", paddingTop: "20px" }}>
                        <h2 style={{ marginBottom: "20px" }}>Итого: {totalPrice.toLocaleString('ru-RU')} ₸</h2>
                        <button style={{
                            background: "#009746",
                            color: "white",
                            border: "none",
                            padding: "15px 30px",
                            borderRadius: "8px",
                            fontSize: "18px",
                            cursor: "pointer",
                            width: "100%",
                            maxWidth: "300px"
                        }} onClick={() => alert('Заказ отправлен на кухню!')}>
                            Оформить заказ
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;