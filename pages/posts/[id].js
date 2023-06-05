import axios from 'axios';

const Post = ({ post }) => {
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>UserID: {post.userId}</p>
      <p>{post.body}</p>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`
    );
    const post = response.data;
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export default Post;
