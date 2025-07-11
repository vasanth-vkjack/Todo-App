import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, uploadProfilepic } from "../slices/profileSlice";
import "./Profile.css";

const Profile = () => {
  const [newPic, setNewPic] = useState(null);
  const dispatch = useDispatch();
  const { profile, loading, error, uploadLoading } = useSelector(
    (state) => state.profile
  );

  const handleUpload = async () => {
    if (newPic) {
      await dispatch(uploadProfilepic(newPic));
      setNewPic(null);
      fetchProfile();
    }
  };
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;
  if (!profile) return <p>No profile data available</p>;

  const { user, todoCount } = profile;

  return (
    <div className="profile-section">
      {!user.profilePic ? (
        <div className="top-left-icon">
          {user.email.charAt(0).toUpperCase()}
        </div>
      ) : (
        <img
          src={user.profilePic || "/default-avatar.png"}
          alt="Profile"
          className="profile-image"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      )}

      <div className="user-info">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Total Todos: {todoCount}</p>
      </div>
      <div className="image">
        <label className="image-upload" htmlFor="image">
          Choose image
        </label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={(e) => setNewPic(e.target.files[0])}
          hidden
        />
      </div>
      <div className="img-btn">
        <button onClick={handleUpload} disabled={!newPic || uploadLoading}>
          {uploadLoading ? "Uploading..." : "Update Picture"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
