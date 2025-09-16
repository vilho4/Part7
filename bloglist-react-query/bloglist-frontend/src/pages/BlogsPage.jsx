import Blog from '../components/Blog'
import BlogFormToggle from '../components/BlogFormToggle'

const BlogsPage = ({ blogs }) => {
  return (
    <div>
      <h1>Blogs</h1>
      <BlogFormToggle />
      {blogs.map((blog) => (
        <Blog key={blog.id} oneblog={blog} />
      ))}
    </div>
  )
}

export default BlogsPage
