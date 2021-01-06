import {BrowserRouter as Router,Route} from 'react-router-dom'
import  './bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/navbar.component'
import Posts from './components/posts.component'
import TagPage from './components/tagpage.component'
import {Post,DeletePost} from "./components/post.component";
import FullPost from "./components/fullPost.component";
import TagPosts from "./components/tagedposts.component";
import About from "./components/about.component";
require("dotenv").config();
function App() {
  return (
    <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Route path="/" exact component={Posts}/>
      <Route path="/tag" exact component={TagPage}/>
      <Route path="/post/:pid" exact component={FullPost}/>
      <Route path="/tag/post/:tid" exact component={TagPosts}/>
      <Route path="/new" exact component={Post}/>
      <Route path="/about" exact component={About}/>
      <Route path="/post/delete/:pid" exact component={DeletePost}/>

     </div>
    </Router>
  );
}

export default App;
