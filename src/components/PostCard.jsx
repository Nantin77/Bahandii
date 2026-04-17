import { useState } from "react";
import "../assets/style/style.css";

function PostCard({ post, AddToCart }) {
  // 1. Состояние для списка комментариев
  const [comments, setComments] = useState([]);
  // 2. Состояние для текста, который ты пишешь в данный момент
  const [inputValue, setInputValue] = useState("");

  const handleAddToCart = () => {
    AddToCart(post);
  };

  // Функция добавления комментария
  const addComment = () => {
    if (inputValue.trim() !== "") { // Проверка, что поле не пустое
      setComments([...comments, inputValue]); // Добавляем новый текст в массив
      setInputValue(""); // Очищаем поле ввода
    }
  };

  return (
    <div className="post-card">
      <img src={post.image} alt={post.name} />
      <h1>{post.name}</h1>
      <h2 className="price">{post.price.toLocaleString('ru-RU')} ₸</h2>
      
      <button className="add-btn" onClick={handleAddToCart}>Добавить в корзину</button>

      {/* БЛОК КОММЕНТАРИЕВ */}
      <div className="comment-section">
        <h3>Отзывы:</h3>
        
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((text, index) => (
              <p key={index} className="comment-text">💬 {text}</p>
            ))
          ) : (
            <p className="no-comments">Отзывов пока нет. Будь первым!</p>
          )}
        </div>

        <div className="comment-input-block">
          <input 
            type="text" 
            placeholder="Напишите комментарий..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Обновляем текст при печати
          />
          <button onClick={addComment}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;