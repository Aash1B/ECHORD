import { Header } from './components/Header/Header.jsx';
import { LibrarySidebar } from './components/LibrarySidebar/LibrarySidebar.jsx';
import { PlayerBar } from './components/PlayerBar/PlayerBar.jsx';
import { RightSidebar } from './components/RightSidebar/RightSidebar.jsx';
import { MainPage } from './components/MainPage';
import styles from './App.module.css';
import { useState } from "react";
import { PlaylistView } from "./components/PlaylistView/PlaylistView";

function App() {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  return (
    <div className={styles.appFrame}>
     <Header
  onHomeClick={() => setSelectedPlaylist(null)}
/>
      <div className={styles.appShell}>
        <LibrarySidebar
  onPlaylistSelect={setSelectedPlaylist}
  selectedPlaylist={selectedPlaylist}
/>
        <main
  className={styles.mainPlaceholder}
  aria-label="Main content"
>
  {selectedPlaylist ? (
    <PlaylistView playlist={selectedPlaylist} />
  ) : (
    <MainPage />
  )}
</main>
        <RightSidebar />
      </div>
      <PlayerBar />
    </div>
  );
}

export default App;
