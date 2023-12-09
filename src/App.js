import {AddPostForm} from './features/posts/AddPostForm'
import {PostsList} from './features/posts/PostsList'

console.log("The app commences rendering")

function App() {
    
    return (
        <>
            <AddPostForm />
            <PostsList />
        </>
    )
}
export default App