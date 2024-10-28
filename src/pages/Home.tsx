import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button, Box, Modal, Grid, Card, CardContent } from '@mui/material';
import PostModal from '../components/PostModal';
import { AppDispatch, RootState } from '../reducers/store';
import socket from '../api/socket';
import Layout from '../components/Layout';
import { Post } from '../models';
import { fetchCategories, fetchPosts } from '../reducers/postSlice';
import CategoryModal from '../components/CategoryModal';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const userRole = useSelector((state: RootState) => state.auth.user?.role);
  const token = useSelector((state: RootState) => state.auth.token);
  const { categories, posts } = useSelector((state: RootState) => state.posts);
  const [open, setOpen] = React.useState(false);
  const [openCategory, setOpenCategory] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const getPosts = async () => {
    if (token) {
      dispatch(fetchPosts(token));
    }

  }
  const getCategories = () => {
    if (token) {
      dispatch(fetchCategories(token));
    }
  }
  useEffect(() => {
    getPosts();
    getCategories();
  }, [token]);

  useEffect(() => {
    socket.on('new_post', (post) => {
      alert('New post available! Click to refresh.');
      getPosts();
    });

    return () => {
      socket.off('new_post');
    };

  }, []);

  const handleCloseCategory = () => {
    getCategories();
    setOpenCategory(false);
  }

  const navigateViewTopic = (topic: Post) => {
    navigate(`/topic/${topic._id}`);
  }
  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Home</Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {userRole === 'admin' && (
              <>
                <Button variant="contained" color="primary" onClick={() => setOpenCategory(true)}>
                  Add New Category
                </Button>
                <br />
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                  Add New Post
                </Button>
              </>
            )}
          </Grid>
          <Grid item xs={9}>
            <Box mt={2}>
              {posts.map(post => (
                <Card
                  variant="outlined"
                  key={post._id}
                  onClick={() => navigateViewTopic(post)}
                >
                  <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                      {post.category?.name}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {post.title}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Modal open={openCategory} onClose={handleCloseCategory}>
          <CategoryModal
            onClose={handleCloseCategory}
          />
        </Modal>
        <Modal open={open} onClose={() => setOpen(false)}>
          <PostModal
            categories={categories}
            onClose={() => setOpen(false)}
          />
        </Modal>
      </Box>
    </Layout >
  );
};

export default Home;
