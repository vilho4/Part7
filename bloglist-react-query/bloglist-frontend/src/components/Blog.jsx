import { Link } from 'react-router-dom'

const Blog = ({ oneblog }) => {
  return (
    <div className="blog-card">
      <h3>
        <Link to={`/blogs/${oneblog.id}`}>
          {oneblog.title}
        </Link>
      </h3>
      <p>
        <em>{oneblog.author}</em>
      </p>
    </div>
  )
}

export default Blog
