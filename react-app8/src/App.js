import "./App.css";
import { useState } from "react";

// 1. 글 등록 기능 추가하기

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const lis = [];

  for (let t of props.topics) {
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={function (event) {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }

  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

// 새로운 컴포넌트 생성
// 폼을 생성하고 제목과 본문을 입력하는 필드와 전송 버튼 추가
function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault(); // 기본 폼 제출 동작 방지
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body); // 부모 컴포넌트에 새로운 항목 데이터 전달
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" required />
        </p>
        <p>
          <textarea name="body" placeholder="body" required></textarea>
        </p>
        <p>
          <input type="submit" value="Create" />
        </p>
      </form>
    </article>
  );
}

// 이제 topics 변수에 새로운 요소를 축하하여 목록을 업데이트한다

// create 버튼을 클릭하면글을 생성하는 폼이 나온다
function App() {
  let [mode, setMode] = useState("WELCOME");
  let [id, setId] = useState(null);

  // topics를 상태로 관리
  let [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ]);

  let content = null;

  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, Web"></Article>;
  } else if (mode === "READ") {
    let title,
      body = null;
    for (let t of topics) {
      if (t.id === id) {
        title = t.title;
        body = t.body;
      }
    }
    content = <Article title={title} body={body}></Article>;
    console.log(topics);
  } else if (mode === "CREATE") {
    // Create 컴포넌트를 렌더링할 때 onCreate 함수를 전달
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: topics.length + 1, title, body };
          setTopics([...topics, newTopic]); // 새로운 항목을 추가하여 상태 업데이트
          setMode("READ");
          setId(newTopic.id); // 새로 추가한 항목의 ID를 READ 모드로 설정
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
