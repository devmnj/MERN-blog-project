import logo from './logo.svg';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import  './bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/navbar.component'
import Posts from './components/posts.component'
import TagPage from './components/tagpage.component'
import SinglePost from "./components/singlePost.component";
import NewUser from "./components/newUser.component";
import Post from "./components/post.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Route path="/" exact component={Posts}/>
      <Route path="/tag" exact component={TagPage}/>
      <Route path="/post/:pid" exact component={SinglePost}/>
      <Route path="/new" exact component={Post}/>
      <Route path="/user/new" exact component={NewUser}/>

      </div>
      {/* <Route path="/login" exact component={Login}/>
      <Route path="/tag/posts" exact component={TagPosts}/>
      <Route path="/post/new" exact component={NewPost}/>
      <Route path="/user/new" exact component={NewUser }/>  */}
    </Router>
  );
}

export default App;
