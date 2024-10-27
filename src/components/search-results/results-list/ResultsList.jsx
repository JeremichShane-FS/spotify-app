"use client";

import { useSpotifySearch } from "@/hooks/useSpotifySearch";
// import { Play } from "lucide-react";
import { PlaySVG } from "@/components/icons";
import Image from "next/image";

import "./ResultsList.scss";

const RESULT_TYPES = {
  tracks: {
    title: "Songs",
    imageSize: 40,
    showArtist: true,
  },
  artists: {
    title: "Artists",
    imageSize: 128,
    showArtist: false,
  },
  albums: {
    title: "Albums",
    imageSize: 128,
    showArtist: true,
  },
};

function formatDuration(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function ResultsList({ type }) {
  const { data, isLoading } = useSpotifySearch();
  const items = data?.[type] || [];
  const config = RESULT_TYPES[type];

  if (isLoading || !items.length) return null;

  if (type === "tracks") {
    return (
      <div className="results-list">
        <h2 className="results-list__title">{config.title}</h2>
        <div className="results-list__tracks">
          <div className="results-list__header">
            <div className="results-list__header-index">#</div>
            <div className="results-list__header-title">Title</div>
            <div className="results-list__header-duration">Duration</div>
          </div>
          {items.map((track, index) => (
            <div key={track.id} className="results-list__track">
              <div className="results-list__track-index">
                <span className="results-list__number">{index + 1}</span>
                <button className="results-list__play-button">
                  <PlaySVG size={16} />
                </button>
              </div>
              <div className="results-list__track-info">
                {track.album.images[0] && (
                  <div className="results-list__track-image-container">
                    <Image
                      src={track.album.images[0].url}
                      alt={track.name}
                      className="results-list__track-image"
                      width={config.imageSize}
                      height={config.imageSize}
                    />
                  </div>
                )}
                <div className="results-list__track-text">
                  <span className="results-list__track-name">{track.name}</span>
                  <span className="results-list__track-artist">
                    {track.artists.map(a => a.name).join(", ")}
                  </span>
                </div>
              </div>
              <div className="results-list__track-duration">
                {formatDuration(track.duration_ms)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="results-list">
      <h2 className="results-list__title">{config.title}</h2>
      <div className={`results-list__container results-list__container--${type}`}>
        {items.map(item => (
          <div key={item.id} className="results-list__item">
            {item.images?.[0] && (
              <div className="results-list__image-container">
                <Image
                  src={type === "tracks" ? item.album.images[0].url : item.images[0].url}
                  alt={item.name}
                  className="results-list__image"
                  width={config.imageSize}
                  height={config.imageSize}
                />
              </div>
            )}
            <div className="results-list__info">
              <p className="results-list__name">{item.name}</p>
              {config.showArtist && item.artists && (
                <p className="results-list__artist">{item.artists.map(a => a.name).join(", ")}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
