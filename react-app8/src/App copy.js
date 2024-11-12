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
          onCreate(title, body); // 부모로 전달된 onCreate 호출
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

// App 컴포넌트
function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);

  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ]);

  let content = null;

  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, Web" />;
  } else if (mode === "READ") {
    const topic = topics.find((t) => t.id === id); // 특정 id의 항목 찾기
    if (topic) {
      content = <Article title={topic.title} body={topic.body} />;
    }
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: topics.length + 1, title, body };
          setTopics([...topics, newTopic]); // 새로운 항목 추가
          setMode("READ");
          setId(newTopic.id); // 새 항목을 바로 읽기 모드로 설정
        }}
      />
    );
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
      <a
        href="/create"
        onClick={(event) => {
          event.preventDefault();
          setMode("CREATE");
        }}
      >
        Create
      </a>
    </div>
  );
}

export default App;
