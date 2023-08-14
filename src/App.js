import {AddPostForm} from './features/posts/AddPostForm'
import {PostsList} from './features/posts/PostsList'
import Container from '@mui/material/Container';

function App() {
    return (
        <>
        <Container maxWidth="sm">
            <AddPostForm />
            <PostsList />
        </Container>
            
        </>
    )
}
export default App