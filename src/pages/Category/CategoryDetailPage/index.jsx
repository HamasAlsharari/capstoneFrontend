import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as categoryAPI from "../../../utilities/category-api";
import "../styles.css";

export default function CategoryDetailPage() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const data = await categoryAPI.show(id);
                setCategory(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCategory();
    }, [id]);

    if (!category) return <h2>Loading category...</h2>;

    return (
        <div className="category-page page-container">
            <h1 style={{ color: category.color }}>{category.name}</h1>
            {category.icon && <p>Icon: {category.icon}</p>}

            <div className="category-actions">
                <Link to={`/categories/edit/${category.id}`} className="btn edit-btn">Edit</Link>
                <Link to={`/categories/confirm_delete/${category.id}`} className="btn delete-btn">Delete</Link>
            </div>
        </div>
    );
}