import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

import { Notification } from "./components/notification";
import { useField } from "./hooks";

const padding = {
  paddingRight: 5,
};

const AnecdoteList = ({ anecdotes, notification, isVisible }) => (
  <div>
    <h2>Anecdotes</h2>
    {notification && isVisible && (
      <Notification notification={notification} isVisible={isVisible} />
    )}
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((a) => a.id === Number(id));
  return (
    <div>
      <div>
        <h2>{anecdote.content}</h2>
      </div>
      <div>
        <em>votes: </em>
        {anecdote.votes}
      </div>
      <div>
        <em>author: </em>
        {anecdote.author}
      </div>
      <div>
        <em>info: </em>
        {anecdote.info}
      </div>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    <br />
    Anecdote app for <a href="https://fullstackopen.com/">
      Full Stack Open
    </a>. <br />
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const navigation = useNavigate();

  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigation("/");
  };

  const handleReset = () => {
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div onSubmit={handleSubmit}>
      <form>
        Content:
        <input {...content} />
        <br />
        Author:
        <input {...author} />
        <br />
        Url for more info:
        <input {...info} />
        <br />
        <div>
        <button type="submit">Create</button>
        </div>
        <div>
        <button type="button" onClick={handleReset}>Reset </button>
        </div>     
      </form>
    </div>
  );

  // return (
  //   <div>
  //     <h2>create a new anecdote</h2>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         content
  //         <input
  //           name="content"
  //           value={content}
  //           onChange={(e) => setContent(e.target.value)}
  //         />
  //       </div>
  //       <div>
  //         author
  //         <input
  //           name="author"
  //           value={author}
  //           onChange={(e) => setAuthor(e.target.value)}
  //         />
  //       </div>
  //       <div>
  //         url for more info
  //         <input
  //           name="info"
  //           value={info}
  //           onChange={(e) => setInfo(e.target.value)}
  //         />
  //       </div>
  //       <button type="submit">create</button>
  //     </form>
  //   </div>
  // );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`Anecdote ${anecdote.content} has been added`);
    setIsVisible(true);

    setTimeout(() => {
      setNotification("");
      setIsVisible(false);
    }, 5000);
  };

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          Anecdotes
        </Link>
        <Link style={padding} to="/about">
          {" "}
          About{" "}
        </Link>
        <Link style={padding} to="/createNew">
          {" "}
          Create New
        </Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <AnecdoteList
              anecdotes={anecdotes}
              notification={notification}
              isVisible={isVisible}
            />
          }
        />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/createNew" element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
