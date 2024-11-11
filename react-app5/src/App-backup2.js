import logo from './logo.svg';
import './App.css';

// props: Header 컴포넌트를 사용하는 쪽에서 전달받은 속성들
function Header(props) {

  console.log(props.title);

  // props는 READ ONLY로 변경할 수 없음
  // 변경할 때는 부모컴포넌트에서 값을 변경해야함
  // props.title = "AAA";

  return (
    <header>
      <h1><a href='/'>{props.title}</a></h1>
    </header>
  );
}

// props: 부모 컴포넌트에서 전달받은 속성들
// function Nav(props) {
//   // li 태그를 담을 배열 생성
//   const lis = [];

//   for(let t of props.topics){
//     // object -> <li>
//     // jsx에서 태그를 동적으로 생성할 때는 태그에 key를 부여해야함
//     lis.push(<li key={t.id}><a href={'/read/' + t.id}> {t.title} </a></li>)
//   }

//   return (
//     <ol>
//       {lis}
//     </ol>
//   );
// }

function Nav(props) {
  return (
    <ol>
      {props.topics.map((t) => (
        <li key={t.id}>
          <a href={'/read/' + t.id}>{t.title}</a>
        </li>
      ))}
    </ol>
  );
}

function Article(props) {

  console.log(props);
    
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {

  // 객체 타입의 배열 생성
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript i s...'}
  ];

  return (
    <div>
      {/* Header 컴포넌트에 title이라는 속성 추가 */}
      <Header title="web"></Header>

      {/* Nav 컴포넌트에 topics라는 속성을 추가 */}
      <Nav topics={topics}></Nav>

      {/* Article 컴포넌트에 title과 body라는 속성 추가 */}
      <Article title="Welcome" body="Hello, web"></Article>
      <Article title="Hi" body="Hello, React"></Article>
    </div>
  );
}

export default App;
