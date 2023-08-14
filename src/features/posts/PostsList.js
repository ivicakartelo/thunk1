import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts, handleDelete } from './postsSlice'
import { UpdatePostForm } from './UpdatePostForm'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PostExcerpt = ({ post }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [updateId, setUpdateId] = useState('')
    const dispatch = useDispatch()

    const handleUpdate = (id) => {
        setUpdateId(id);
        setShowEditForm(true);
      }

      const card = (
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Published
            </Typography>
            <Typography variant="h5" component="div">
            {post.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Author
            </Typography>
            <Typography variant="body2">
                {post.content}
            </Typography>
          </CardContent>
          <CardActions>
            {showEditForm && updateId === post.id ? (
                <UpdatePostForm
                    post={post}
                    setShowEditForm={setShowEditForm}
                />
                ) : (
                <Button size="small" variant="contained" onClick={() => handleUpdate(post.id)}>
                    Update
                </Button>
            )}

            <Button size="small" color="error" variant="contained" onClick={() => dispatch(handleDelete(post.id))}>Delete</Button>
          </CardActions>
        </React.Fragment>
      );

      const card1 = (
        <React.Fragment>
          <CardContent>
            
            <Typography variant="h5" component="div">
            Posts
            </Typography>
            
            
          </CardContent>
          
        </React.Fragment>
      );

    return (
        
        <article key={post.id}>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">{card1}</Card>
            </Box>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">{card}</Card>
            </Box>
            

            
        </article>
    )
}

export const PostsList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    console.log(posts)
    const postStatus = useSelector(state => state.posts.status)
    console.log(postStatus)
    const error = useSelector(state => state.posts.error)
    console.log(error)
    
    useEffect(() => {
        postStatus === 'idle' && dispatch(fetchPosts())
    },[postStatus, dispatch])

let content
    
postStatus === 'loading' ? (
    content = <h1>Loading...</h1>
) : postStatus === 'succeeded' ? (
    content = posts.map(post => <PostExcerpt key={post.id} post={post} />)
) : (
    content = <div>{error}</div>
)

    return (
        <section>
            {content}
        </section>
    )
}