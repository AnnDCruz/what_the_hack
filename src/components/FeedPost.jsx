
import { useState } from 'react';
import { formatCount } from '../utils/sessionUtils.js';

export default function FeedPost({ post, liked, onLike }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const showVideo = Boolean(post.video) && !videoFailed;
  const showImage = !showVideo && post.img && !imageFailed;

  return (
    <article
      className={`post ${showVideo ? 'post-video' : 'post-image'}`}
      style={{
        background: `linear-gradient(160deg, ${post.grad[0]}, ${post.grad[1]})`,
      }}
      onDoubleClick={onLike}
    >
      {showVideo && (
        <video
          className="post-img post-video-player"
          src={post.video}
          poster={post.img || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoFailed(true)}
          aria-label={`Video reel by ${post.user}`}
        />
      )}

      {!showVideo && showImage && (
        <img
          className="post-img"
          src={post.img}
          alt=""
          onError={() => setImageFailed(true)}
        />
      )}

      {!showVideo && !showImage && (
        <div className="post-fallback">
          <span>🎬</span>
          <p>Reel loading...</p>
        </div>
      )}

      <div className="blobs" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="scrim" />

      <div className="caption">
        <strong>@{post.user}</strong>
        <p>{post.caption}</p>
        <small>
          {post.tag} · {formatCount(post.likes + (liked ? 1 : 0))} likes
        </small>
      </div>
    </article>
  );
}
