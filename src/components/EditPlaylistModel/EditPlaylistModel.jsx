import { useState, useEffect } from "react";
import { X } from "lucide-react";
import styles from "../CreatePlaylistModel/CreatePlaylistModel.module.css";
import { updatePlaylist, deletePlaylist } from "../../services/api";
import { usePlaylists } from "../../context/playlistcontext";
import placeholder from "../../assets/music-placeholder.jpg";

export function EditPlaylistModel({
    isOpen,
    onClose,
    playlist,
}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [coverUrl, setCoverUrl] = useState("");

    const { loadPlaylists, refreshSelectedPlaylist, selectPlaylist } = usePlaylists();

    useEffect(() => {
        if (playlist) {
            setName(playlist.name || "");
            setDescription(playlist.description || "");
            setCoverUrl(playlist.cover_url || "");
        }
    }, [playlist, isOpen]);

    const handleSave = async () => {
        if (!name.trim()) {
            alert("Playlist name is required");
            return;
        }

        try {
            await updatePlaylist(playlist.id, {
                name,
                description,
                cover_url: coverUrl.trim() ? coverUrl.trim() : null,
            });

            await loadPlaylists();
            await refreshSelectedPlaylist();
            onClose();
        } catch (err) {
            alert(err.message || "Failed to update playlist.");
        }
    };

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${playlist.name}"?`)) {
            try {
                await deletePlaylist(playlist.id);
                await loadPlaylists();
                await selectPlaylist(null);
                onClose();
            } catch (err) {
                alert(err.message || "Failed to delete playlist.");
            }
        }
    };

    if (!isOpen || !playlist) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.model} style={{ minHeight: "auto" }}>
                <div className={styles.header}>
                    <h2>Edit Details</h2>
                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.detailsRow} style={{ marginBottom: 0 }}>
                    <div className={styles.coverContainer}>
                        <img 
                            src={coverUrl.trim() ? coverUrl.trim() : placeholder} 
                            alt="Playlist Cover Preview"
                            onError={(e) => {
                                e.target.src = placeholder;
                            }}
                        />
                    </div>

                    <div className={styles.inputsContainer}>
                        <input
                            placeholder="Playlist Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label className={styles.fileInputLabel}>
                            {coverUrl ? "Change Cover Image" : "Choose Cover Image"}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setCoverUrl(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </label>

                        <textarea
                            placeholder="Description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.buttons} style={{ marginTop: 24 }}>
                    <button
                        onClick={handleDelete}
                        style={{
                            backgroundColor: "#e91429",
                            color: "white",
                            border: "none",
                            borderRadius: "20px",
                            padding: "10px 22px",
                            fontWeight: 700,
                            fontSize: "14px",
                            cursor: "pointer",
                            marginRight: "auto"
                        }}
                    >
                        Delete Playlist
                    </button>

                    <button
                        className={styles.cancel}
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className={styles.create}
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
