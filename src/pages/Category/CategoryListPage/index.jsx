import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as categoryAPI from "../../../utilities/category-api";
import "../styles.css";

export default function CategoryListPage() {
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await categoryAPI.index();
        setCategories(data);
      } catch (err) {
        console.log(err);
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="category-page">
      <div className="page-header">
        <h1>Categories</h1>
        <Link to="/categories/new" className="btn add-category">+ Add Category</Link>
      </div>

      <div className="category-grid">
        {categories.map(cat => (
          <div
            key={cat.id}
            className={`category-item ${selectedId === cat.id ? "selected" : ""}`}
            style={{ backgroundColor: cat.color || "#e8f5e9" }}
            onClick={() => setSelectedId(cat.id)}
          >
            {cat.icon && <span className="category-icon">{cat.icon}</span>}
            <Link to={`/categories/${cat.id}`} className="category-link">
              {cat.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}