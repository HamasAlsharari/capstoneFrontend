import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as categoryAPI from "../../../utilities/category-api";
import "../styles.css";

export default function CategoryFormPage({ createCategory, editCategory, deleteCategory }) {
    const [formData, setFormData] = useState({ name: "", icon: "", color: "#4caf50" });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if ((editCategory || deleteCategory) && id) {
            async function fetchCategory() {
                try {
                    const data = await categoryAPI.show(id);
                    setFormData({ name: data.name, icon: data.icon || "", color: data.color?.startsWith("#") ? data.color : "#4caf50" });
                } catch (err) {
                    console.log(err);
                }
            }
            fetchCategory();
        }
    }, [id]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (editCategory) {
                await categoryAPI.update(id, formData);
            } else {
                await categoryAPI.create(formData);
            }
            navigate("/categories");
        } catch (err) {
            console.log(err);
        }
    }

    async function handleDelete(e) {
        e.preventDefault();
        try {
            await categoryAPI.deleteCategory(id);
            navigate("/categories");
        } catch (err) {
            console.log(err);
        }
    }

    if (deleteCategory) return (
        <div className="form-page">
            <h1>Delete Category?</h1>
            <p>Are you sure you want to delete "{formData.name}"?</p>
            <div className="category-actions">
                <Link to={`/categories/${id}`} className="btn secondary">Cancel</Link>
                <button onClick={handleDelete} className="btn delete-btn">Yes, Delete</button>
            </div>
        </div>
    );

    return (
        <div className="form-page">
            <h1>{editCategory ? "Edit Category" : "Add Category"}</h1>
            <form onSubmit={handleSubmit} className="category-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required minLength={2} />
                </div>

                <div className="form-group">
                    <label>Icon:</label>
                    <input type="text" name="icon" value={formData.icon} onChange={handleChange} placeholder="Optional" />
                </div>

                <div className="form-group">
                    <label>Color:</label>
                    <input type="color" name="color" value={formData.color} onChange={handleChange} />
                </div>

                <button type="submit" className="btn submit-btn">{editCategory ? "Update" : "Create"}</button>
            </form>
        </div>
    );
}