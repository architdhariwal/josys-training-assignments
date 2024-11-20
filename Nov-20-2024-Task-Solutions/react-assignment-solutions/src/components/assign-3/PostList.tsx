// React Query is a powerful library for managing, caching, and synchronizing server state in React applications. It simplifies data fetching, caching, synchronization, and updating server state.
// Key Features of React Query:

// Simplified Data Fetching
// Automatic Caching
// Background Updates
// Error Handling
// Pagination and Infinite Queries
// Mutations


import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import './styles.css';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostList: React.FC = () => {
  const queryClient = useQueryClient();
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  // Add new post mutation
  const addPostMutation = useMutation({
    mutationFn: async (newPost: Omit<Post, 'id'>) => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch posts after mutation
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setNewTitle('');
      setNewBody('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPostMutation.mutate({
      title: newTitle,
      body: newBody,
    });
  };

  if (isLoading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (isError) {
    return <div className="error">Error fetching posts!</div>;
  }

  return (
    <div className="posts-container">
      <h1>React Query Demo - Posts</h1>
      
      <form onSubmit={handleSubmit} className="post-form">
        <h2>Add New Post</h2>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter post title"
          required
        />
        <textarea
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          placeholder="Enter post content"
          required
        />
        <button type="submit" disabled={addPostMutation.isPending}>
          {addPostMutation.isPending ? 'Adding...' : 'Add Post'}
        </button>
      </form>

      <div className="posts-list">
        <h2>Recent Posts</h2>
        {posts?.slice(0, 5).map((post: Post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;