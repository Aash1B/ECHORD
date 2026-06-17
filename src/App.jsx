import { Header } from './components/Header/Header.jsx';
import { LibrarySidebar } from './components/LibrarySidebar/LibrarySidebar.jsx';
import { PlayerBar } from './components/PlayerBar/PlayerBar.jsx';
import { RightSidebar } from './components/RightSidebar/RightSidebar.jsx';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appFrame}>
      <Header />
      <div className={styles.appShell}>
        <LibrarySidebar />
        <main className={styles.mainPlaceholder} aria-label="Main content placeholder" />
        <RightSidebar />
      </div>
      <PlayerBar />
    </div>
  );
}

export default App;
