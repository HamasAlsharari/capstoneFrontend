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

            <div className="expenses-list">
                <h2>Expenses Linked</h2>
                {category.expenses && category.expenses.length > 0 ? (
                    <ul>
                        {category.expenses.map(exp => (
                            <li key={exp.id}>
                                <Link to={`/expenses/${exp.id}`}>{exp.title}</Link> - ${exp.amount}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted">No linked expenses.</p>
                )}
            </div>
        </div>
    );
}