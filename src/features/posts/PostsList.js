import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts, handleDelete } from './postsSlice'
import { UpdatePostForm } from './UpdatePostForm'

const PostExcerpt = ({ post }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [updateId, setUpdateId] = useState('')
    const dispatch = useDispatch()

    const handleUpdate = (id) => {
        setUpdateId(id);
        setShowEditForm(true);
      }

    return (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            {showEditForm && updateId === post.id ? (
                <UpdatePostForm
                    post={post}
                    setShowEditForm={setShowEditForm}
                />
                ) : (
                <button onClick={() => handleUpdate(post.id)}>
                    Update
                </button>
            )}

            <button onClick={() => dispatch(handleDelete(post.id))}>Delete</button>
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
            <h2>Posts</h2>
            {content}
        </section>
    )
}