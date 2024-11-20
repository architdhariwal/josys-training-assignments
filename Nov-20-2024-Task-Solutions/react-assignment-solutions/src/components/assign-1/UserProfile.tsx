import { useAuth } from "./AuthContext";

const UserProfile: React.FC = () => {
  const { user, login, logout } = useAuth();

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      {user ? (
        <div>
          <h2 >Welcome, {user.name}!</h2>
          <button 
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <h2 >You are not logged in.</h2>
          <button
            onClick={() => login({ id: 1, name: "John Doe" })}
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
