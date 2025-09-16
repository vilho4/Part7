import { useState } from 'react'
import BlogForm from './BlogForm'

const BlogFormToggle = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)
  const hideForm = () => setVisible(false)

  return (
    <div>
      {!visible && (
        <button onClick={toggleVisibility}>
          Create new blog
        </button>
      )}

      {visible && (
        <div>
          <BlogForm onCancel={hideForm} />
          <button
            onClick={hideForm}
            style={{ marginTop: '10px' }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default BlogFormToggle
