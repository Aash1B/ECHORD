import { ListFilter, Plus, Search } from 'lucide-react';
import styles from './LibrarySidebar.module.css';

const libraryItems = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/comfort/64',
    title: 'Comfort',
    subtitle: 'Playlist - Shubham',
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/hindi-nostalgic/64',
    title: 'HindiNostalgic',
    subtitle: 'Playlist - Shubham',
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/country/64',
    title: 'Country',
    subtitle: 'Playlist - Shubham',
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/rocknroll/64',
    title: 'Absolute rocknroll',
    subtitle: 'Playlist - Shubham',
  },
  {
    id: 5,
    image: 'https://picsum.photos/seed/guns-roses/64',
    title: "Guns N' Roses",
    subtitle: 'Artist',
  },
];

const filters = ['Playlists', 'Artists', 'Albums', 'Podcasts'];

export function LibrarySidebar() {
  return (
    <aside className={styles.sidebar} aria-label="Your library">
      <div className={styles.sidebarHeader}>
        <div className={styles.libraryTitle}>
          <h2>Your Library</h2>
          <span className={styles.tooltip}>Collapse Your Library</span>
        </div>
        <button className={styles.createButton} type="button">
          <Plus size={17} strokeWidth={2.5} />
          <span>Create</span>
        </button>
      </div>

      <div className={styles.filterButtons} aria-label="Library filters">
        {filters.map((filter) => (
          <button type="button" key={filter}>
            {filter}
          </button>
        ))}
      </div>

      <div className={styles.sidebarControls}>
        <button className={styles.controlButton} type="button" aria-label="Search your library">
          <Search size={18} strokeWidth={2.2} />
        </button>
        <button className={styles.recentsButton} type="button">
          Recents
          <ListFilter size={18} strokeWidth={2.1} />
        </button>
      </div>

      <div className={styles.libraryList}>
        {libraryItems.map((item) => (
          <button className={styles.libraryItem} type="button" key={item.id}>
            <img src={item.image} alt="" />
            <span className={styles.itemInfo}>
              <span className={styles.itemTitle}>{item.title}</span>
              <span className={styles.itemSubtitle}>{item.subtitle}</span>
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
