import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, Grid, Modal, Typography } from '@mui/material'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout'
import { AppDispatch, RootState } from '../reducers/store';
import { fetchContents, fetchPostById } from '../reducers/postSlice';
import AddContentModal from '../components/AddContentModal';

function ViewTopic() {
  const token = useSelector((state: RootState) => state.auth.token);
  const userRole = useSelector((state: RootState) => state.auth.user?.role);
  const topic = useSelector((state: RootState) => state.posts.selectedPost);
  const content = useSelector((state: RootState) => state.posts.content);
  const [openAddContent, setOpenAddContent] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const getTopicById = async () => {
    if (id && token) {
      dispatch(fetchPostById({ token, id }));
    }
  }
  const getContentsByTopicId = () => {
    if (id && token) {
      dispatch(fetchContents({ token, topic: id }))
    }
  }
  useEffect(() => {
    getTopicById()
    getContentsByTopicId()
  }, [id]);

  const handleCloseAddCategory = () => {
    setOpenAddContent(false);
  }
  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Home</Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {(['admin', 'creator'].includes(userRole)) && (
              <>
                <Button variant="contained" color="primary" onClick={() => setOpenAddContent(true)}>
                  Add New Content
                </Button>
              </>
            )}
          </Grid>
          <Grid item xs={9}>

            {
              topic && (
                <Card
                  variant="outlined"
                >
                  <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                      Category: {topic?.category?.name}
                    </Typography>
                    <Typography variant="h5" component="div">
                      Topic: {topic?.title}
                    </Typography>
                  </CardContent>
                </Card>
              )
            }
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>Content</h3>
            {
              content.map(element => {
                return (
                  <Card
                    variant="outlined"
                    key={element._id}
                  >
                    <CardContent>
                      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        {element.topic?.title}
                      </Typography>
                      <Typography variant="h5" component="div">
                        <div dangerouslySetInnerHTML={{ __html: element.content }}></div>
                      </Typography>
                    </CardContent>
                  </Card>
                )
              })
            }
          </Grid>
        </Grid>
      </Box>
      <Modal open={openAddContent} onClose={handleCloseAddCategory}>
        <AddContentModal
          onClose={handleCloseAddCategory}
          topic={topic}
        />
      </Modal>
    </Layout>
  )
}

export default ViewTopic
