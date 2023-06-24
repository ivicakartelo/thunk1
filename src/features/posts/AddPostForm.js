import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewPost } from './postsSlice'

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, steContent] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => steContent(e.target.value)

    const canSave = 
        [title, content].every(Boolean) && addRequestStatus === 'idle'

        const onSavePostClicked = async () => {
            if (canSave) {
                try {
                    setAddRequestStatus('pending')
                    await dispatch(addNewPost({title, content})).unwrap()
                    setTitle('')
                    steContent('')
                    setError(null)
                } catch (err) {
                    console.error('Failed to save the post: ', err)
                    setError('Error saving the post')
                } finally {
                    setAddRequestStatus('idle')
                }
            }
        }

        return (
            <section>
                <h2>Add a New Post</h2>
                <form>
                    <label>Post Title:</label>
                    <input 
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        value={title}
                        onChange={onTitleChanged} 
                    />
                    <label><p>Content:</p></label>
                    <textarea
                        id="postContent"
                        name="postContent"
                        value={content}
                        onChange={onContentChanged} 
                    />
                    <button type="button" onClick={onSavePostClicked}>
                        Save Post
                    </button>
                </form>
                {error && <div>{error}</div>}
            </section>
        )
}