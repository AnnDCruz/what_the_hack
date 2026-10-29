import { useState } from 'react';
import { formatCount } from '../utils/sessionUtils.js';

export default function FeedPost({ post, liked, onLike }) {
  const [failed, setFailed] = useState(false);
  return (
    <article className="post" style={{ background: `linear-gradient(160deg, ${post.grad[0]}, ${post.grad[1]})` }} onDoubleClick={onLike}>
      {!failed && <img className="post-img" src={post.img} alt="" onError={() => setFailed(true)} />}
      <div className="blobs" aria-hidden="true"><i /><i /><i /></div>
      <div className="scrim" />
      <div className="caption">
        <strong>@{post.user}</strong>
        <p>{post.caption}</p>
        <small>{post.tag} &middot; {formatCount(post.likes + (liked ? 1 : 0))} likes</small>
      </div>
    </article>
  );
}
