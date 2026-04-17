import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Импортируем хук для получения параметров URL
import PostCard from "./PostCard";

function PostList({ AddToCart }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryName } = useParams(); // Получаем название категории из URL (например, "burgers")

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://0e65bba3ec32faab.mokky.dev/products');
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (isLoading) return <h2 style={{ textAlign: 'center' }}>Загрузка...</h2>;

  // ЛОГИКА ФИЛЬТРАЦИИ И ЛИМИТА
  let displayedProducts = products;

  if (categoryName) {
    // Фильтруем по категории и берем только первые 5
    displayedProducts = products
      .filter(item => item.category === categoryName)
      .slice(0, 5);
  }

  return (
    <div className="post-list-container">
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>
        {categoryName ? `Категория: ${categoryName}` : "Все товары"}
      </h1>
      
      <div className="props" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {displayedProducts.length > 0 ? (
          displayedProducts.map((post) => (
            <PostCard key={post.id} post={post} AddToCart={AddToCart} />
          ))
        ) : (
          <p>В этой категории пока нет товаров.</p>
        )}
      </div>
    </div>
  );
}

export default PostList;