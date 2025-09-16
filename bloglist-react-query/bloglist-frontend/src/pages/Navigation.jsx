import { Link } from 'react-router-dom'

const Navigation = ({ user, onLogout }) => {
  return (
    <nav className="navigation">
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/users">Users</Link>
      </div>
      <div className="nav-right">
        <span>{user.username}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navigation
