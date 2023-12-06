import css from './App.module.css';
import Content from './components/Content';
import Sidebar from './components/Sidebar';
// import NavBarSimple from './components/NavBarSimple';
import NavBarForm from './components/NavBarForm';
import ContentHooks from './components/ContentHooks';

function App() {
  return (
    <div className={css.App}>
      < Sidebar />
      < NavBarForm />
      {/* <Content /> */}
      <ContentHooks />
    </div>
  );
}

export default App;