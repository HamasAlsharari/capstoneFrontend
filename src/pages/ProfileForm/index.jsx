import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as profileAPI from "../../utilities/profile-api";
import "./styles.css";

export default function ProfileForm({ user, setUser, editProfile }) {
  const initialState = {
    full_name: "",
    currency: "",
    monthly_budget: "",
    image_url: ""
  };
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (editProfile && user.profile) {
      setFormData({
        full_name: user.profile.full_name || "",
        currency: user.profile.currency || "",
        monthly_budget: user.profile.monthly_budget || "",
        image_url: user.profile.image_url || ""
      });
    }
  }, [editProfile, user.profile]);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      let updatedUser;
      if (editProfile && user.profile) {
        updatedUser = await profileAPI.updateProfile(user.id, formData);
      } else {
        updatedUser = await profileAPI.addProfile(user.id, formData);
      }
      setUser(updatedUser);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-form-container">
        <h1>{editProfile ? "Edit Profile" : "Set Up Your Profile"}</h1>
        <form onSubmit={handleSubmit} autoComplete="off" className="profile-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Currency</label>
            <input
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Monthly Budget</label>
            <input
              name="monthly_budget"
              type="number"
              value={formData.monthly_budget}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Profile Image (URL)</label>
            <input
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn submit-btn">
            {editProfile ? "Update Profile" : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}