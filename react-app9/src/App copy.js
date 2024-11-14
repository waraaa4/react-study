import "./App.css";
import { useState } from "react";

// Header 컴포넌트
function Header({ title, onChangeMode }) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            onChangeMode();
          }}
        >
          {title}
        </a>
      </h1>
    </header>
  );
}

// Nav 컴포넌트
function Nav({ topics, onChangeMode }) {
  return (
    <nav>
      <ol>
        {topics.map((topic) => (
          <li key={topic.id}>
            <a
              href={"/read/" + topic.id}
              onClick={(event) => {
                event.preventDefault();
                onChangeMode(topic.id);
              }}
            >
              {topic.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Article 컴포넌트
function Article({ title, body }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{body}</p>
    </article>
  );
}

// Create 컴포넌트
function Create({ onCreate }) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="Title" required />
        </p>
        <p>
          <textarea name="body" placeholder="Body" required></textarea>
        </p>
        <p>
          <input type="submit" value="Create" />
        </p>
      </form>
    </article>
  );
}

// Update 컴포넌트
function Update({ title: initialTitle, body: initialBody, onUpdate }) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onUpdate(title, body);
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            required
          />
        </p>
        <p>
          <textarea
            name="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Body"
            required
          />
        </p>
        <p>
          <input type="submit" value="Update" />
        </p>
      </form>
    </article>
  );
}

// App 컴포넌트
function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ]);
  const [nextId, setNextId] = useState(4);

  let content = null;
  let contextControl = null;

  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, Web" />;
  } else if (mode === "READ") {
    const topic = topics.find((t) => t.id === id);
    if (topic) {
      content = <Article title={topic.title} body={topic.body} />;
      contextControl = (
        <li>
          <a
            href={"/update/" + id}
            onClick={(event) => {
              event.preventDefault();
              setMode("UPDATE");
            }}
          >
            Update
          </a>
        </li>
      );
    }
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: nextId, title, body };
          setTopics([...topics, newTopic]);
          setNextId(nextId + 1);
          setMode("READ");
          setId(newTopic.id);
        }}
      />
    );
  } else if (mode === "UPDATE") {
    const topic = topics.find((t) => t.id === id);
    if (topic) {
      content = (
        <Update
          title={topic.title}
          body={topic.body}
          onUpdate={(title, body) => {
            const updatedTopics = topics.map((t) =>
              t.id === id ? { ...t, title, body } : t
            );
            setTopics(updatedTopics);
            setMode("READ");
          }}
        />
      );
    }
  }

  return (
    <div className="App">
      <Header title="WEB" onChangeMode={() => setMode("WELCOME")} />
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          setMode("READ");
          setId(id);
        }}
      />
      {content}
      <ul>
        <li>
          <a
            href="/create"
            onClick={(event) => {
              event.preventDefault();
              setMode("CREATE");
            }}
          >
            Create
          </a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
