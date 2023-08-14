import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewPost } from './postsSlice'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

const canSave = Boolean(title) && Boolean(content) && Boolean(addRequestStatus === 'idle')
const onSavePostClicked = async () => {
    if (canSave) {
        try {
            setAddRequestStatus('pending')
            await dispatch(addNewPost({title, content})).unwrap()
            setTitle('')
            setContent('')
            setError(null)
        } catch (err) {
            console.error('Failed to save the post: ', err)
            setError('Error saving the post')
        } finally {
            setAddRequestStatus('idle')
        }
    }
}

const card1 = (
    <React.Fragment>
      <CardContent>
        
        <Typography variant="h5" component="div">
        Add New Post
        </Typography>
        
      </CardContent>
      
    </React.Fragment>
  );

return (
    <section>
        
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card1}</Card>
        </Box>
        <form>
        
            <TextField 
                margin="normal"
                fullWidth
                label="Post Title"
                placeholder="Enter your title"
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleChanged} 
            />
            <TextField
                margin="normal"
                fullWidth
                label="Post Content"
                multiline
                rows={4}
                placeholder="Enter your content"
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChanged} 
            />
<Button variant="contained" onClick={onSavePostClicked} disabled={!canSave}>
    Save Post
</Button>
        </form>
        {error && <div>{error}</div>}
    </section>
)
}