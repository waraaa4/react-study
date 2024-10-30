import logo from './logo.svg';
import './App.css';


function Header(props) {

  console.log(props);

  return (
    <header>
      <h1><a href='/' onClick={
        (event) => {
          event.preventDefault(); // 페이지 이동 방지
          props.onChangeMode(); // props로 전달받은 이벤트함수 실행
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
            event.preventDefault(); // 이벤트 객체로 페이지 이동 방지
            console.log(event.target.id);
            props.onChangeMode(event.target.id);
          }
        }> {t.title} </a>
      </li>)
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

  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript i s...'}
  ];

  return (
    <div>
      {/* Header 컴포넌트에 이벤트 기능 추가 */}
      <Header title="web" onChangeMode={
        () => {
          alert('HI');
        }
      }></Header>

      {/* Nav 컴포넌트에 이벤트 기능 추가
        클릭하면 해당 id가 경고창으로 출력 */}
      <Nav topics={topics} onChangeMode={
        (id) => {
          alert(id);
        }
      }></Nav>

      <Article title="Welcome" body="Hello, web"></Article>
    </div>
  );
}

export default App;
