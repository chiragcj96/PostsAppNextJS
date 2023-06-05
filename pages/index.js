"use client"

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleSort = (param) => {
    let sortedPosts = [...posts];

    switch (param) {
      case 'id':
        sortedPosts.sort((a, b) => a.id - b.id);
        break;
      case 'userId':
        sortedPosts.sort((a, b) => a.userId - b.userId);
        break;
      case 'title':
        sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setPosts(sortedPosts);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <div>
        Sort by:
        <button onClick={() => handleSort('id')}>ID</button>
        <button onClick={() => handleSort('userId')}>UserID</button>
        <button onClick={() => handleSort('title')}>Title</button>
      </div>
      {currentPosts.map((post) => (
        <div key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <a>
              <h2>{post.title}</h2>
            </a>
          </Link>
          <p>UserID: {post.userId}</p>
        </div>
      ))}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Index;