import './App.css';
import { useState } from 'react';

function Header(props) {

  return (
    <header>
      <h1><a href='/' onClick={
        (event) => {
          event.preventDefault();
          props.onChangeMode();
        }
      }>{props.title}</a></h1>
    </header>
  );
}


function Nav(props) {

  const lis = [];

  for(let t of props.topics){
    lis.push(<li key={t.id}>
        <a href={'/read/' + t.id} id={t.id} onClick={
          (event) => {
            event.preventDefault();
            props.onChangeMode(event.target.id);
          }
        }> {t.title} </a>
      </li>
    )
  }

  return (
    <ol>
      {lis}
    </ol>
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

function App() {

  // 모드를 결정하는 변수
  // let mode = "WELCOME";
  
  // mode를 state로 생성
  // state: 상태를 관리하며 컴포넌트를 새로 생성하는 역활
  let [mode, setMode] = useState('WELCOME'); // 초기값

  // nav의 id를 저장할 state 생성
  let [id, setId] = useState(null);

  // 본문을 저장할 변수
  let content = null;

  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ];

  if(mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, web"></Article>
  } else if(mode === "READ") {

    // 선택한 id에 따라 Article 컴포넌트 생성
    let title, body = null;

    for(let t of topics){
      if(t.id === Number(id)){ // 배열의 id와 현재 id가 같은지 비교
        console.log(t);
        title = t.title;
        body = t.body;
      }
    }
    
    content = <Article title={title} body={body}></Article>
  }

  return (
    <div>
      {/* Header를 클릭하면 모드가 WELCOME으로 변경 */}
      <Header title="web" onChangeMode={
        () => {
          setMode('WELCOME');
        }
      }></Header>

      {/* Nav 클릭하면 모드가 READ로 변경 */}
      <Nav topics={topics} onChangeMode={
        (id) => {
          setMode('READ');
          setId(id);
        }
      }></Nav>

      {/* 생성된 콘텐츠를 출력 */}
      {content} 
    </div>
  );
}

export default App;
