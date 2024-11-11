import { useState } from 'react';

function Header({ title, onChangeMode }) {
  return (
    <header>
      <h1>
        <a href="/"
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

function Nav({ topics, onChangeMode }) {
  return (
    <ol>
      {topics.map((topic) => (
        <li key={topic.id}>
          <a href={`/read/${topic.id}`}
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
  );
}

function Article({ title, body }) {
  return (
    <article>
      <h2>{title}</h2>
      {body}
    </article>
  );
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [currentId, setCurrentId] = useState(null);

  const topics = [
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' },
  ];

  const getCurrentContent = () => {
    if (mode === 'WELCOME') {
      return <Article title="Welcome" body="Hello, web" />;
    } else if (mode === 'READ') {
      const topic = topics.find((t) => t.id === currentId);
      if (topic) {
        return <Article title={topic.title} body={topic.body} />;
      }
    }
    return null;
  };

  return (
    <div>
      <Header title={mode} onChangeMode={() => setMode('web')}/>
      <Nav topics={topics} onChangeMode={(id) => {
          setMode('READ');
          setCurrentId(id);
        }}
      />
      {getCurrentContent()}
    </div>
  );
}

export default App;
