import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

const Blog = ({ blog, user }) => {
  // console.log(user, 'user')
  // if (blog.user.id) {
  //   console.log(blog.user.id, 'mitäs blogissa oli')
  // }
  return (
    <div>
      <h3>{blog.title}</h3>
      <ul>
        <li>
          <strong>Author:</strong> {blog.author}
        </li>
        <li>
          <strong>URL:</strong> {blog.url}
        </li>
        <li>
          <strong>Likes:</strong> {blog.likes}{' '}
          <LikeButton blog={blog} />
        </li>
        <li>
          {/* Näytetään delete-nappi vain jos käyttäjä on blogin luoja */}
          {/* {user.username === blog.user.username && (
            <DeleteButton
              blogId={blog.id}
              token={user.token}
            />
          )} */}
        </li>
      </ul>
    </div>
  )
}

export default Blog
