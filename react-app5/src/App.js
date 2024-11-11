import './App.css';

// 헤더
function Header() {
  return (
    <header>
      <h1>헤더</h1>
    </header>
  );
};

// 네비
function Nav(props) {
    return (
      <ol>
        {props.topics.map((t) => (
          <li key={t.id}>
            <a href={"/read/" + t.id}>{t.title}</a>
          </li>
        ))}
      </ol>
    );
};



// 푸터
function Footer() {
  return(
    <footer>
      <h3>푸터</h3>
    </footer>
  );
};


function App() {
  const topics = [
    {id:1, title:'html', body:'html'},
    {id:2, title:'css', body:'css'},
    {id:3, title:'js', body:'js'}
  ];

  return (
    <div>
      <Header></Header>

      <Nav topics={topics}></Nav>

      <Footer></Footer>
    </div>
  );
}

export default App;
