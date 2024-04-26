import { useAuth } from '@src/auth/useAuth';
import { useLogout } from '@src/auth/useLogout';

export const Navbar = () => {
  const { isLoggedIn, name } = useAuth();
  const logout = useLogout();
  return (
    <nav className="navbar">
      <span className="user-info">Logged in as: {name}</span>
      {isLoggedIn && (
        <button onClick={logout} style={{ cursor: 'pointer' }}>
          Logout
        </button>
      )}
    </nav>
  );
};
