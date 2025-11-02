import { Link } from "react-router-dom";
import "./styles.css";

export default function Profile({ user }) {
  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Welcome, {user.username}</h1>
        {user.profile ? (
          <>
            {user.profile.image_url && (
              <img src={user.profile.image_url} alt="Profile" className="profile-img" />
            )}
            <div className="profile-info">
              <p><strong>Full Name:</strong> {user.profile.full_name}</p>
              <p><strong>Currency:</strong> {user.profile.currency}</p>
              <p><strong>Monthly Budget:</strong> {user.profile.monthly_budget}</p>
            </div>
            <div className="profile-actions">
              <Link to="/profile/edit" className="btn edit-btn">Edit Profile</Link>
            </div>
          </>
        ) : (
          <div className="no-profile">
            <p>You haven't set up your profile yet.</p>
            <Link to="/profile/edit" className="btn submit-btn">Set Up Profile</Link>
          </div>
        )}
      </div>
    </div>
  );
}