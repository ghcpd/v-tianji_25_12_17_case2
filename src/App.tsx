import { useState, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import './App.css'

interface Video {
  id: string;
  videoUrl: string;
  thumbnail: string;
  description: string;
  user: string;
  likes: number;
  isLiked: boolean;
  comments: string[];
}

const mockVideos: Video[] = [
  {
    id: '1',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://i.ytimg.com/vi/YE7VzlLtp-4/maxresdefault.jpg',
    description: 'A fun video of a bunny',
    user: 'User1',
    likes: 100,
    isLiked: false,
    comments: ['Nice!', 'Awesome']
  },
  {
    id: '2',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://i.ytimg.com/vi/eIho2S0ZahI/maxresdefault.jpg',
    description: 'Dreaming elephants',
    user: 'User2',
    likes: 200,
    isLiked: false,
    comments: ['Cool', 'Amazing']
  },
  {
    id: '3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg',
    description: 'Blazing fires',
    user: 'User3',
    likes: 150,
    isLiked: false,
    comments: ['Hot!', 'Epic']
  }
];

export function VideoItem({ video, onLike, onComment }: { video: Video; onLike: (id: string) => void; onComment: (id: string, comment: string) => void }) {
  const [isPaused, setIsPaused] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && !isPaused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [inView, isPaused]);

  const handlePlayPause = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const handleLike = () => {
    onLike(video.id);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      onComment(video.id, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="video-item" ref={ref}>
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.thumbnail}
        muted
        loop
        playsInline
        className="video"
      />
      <div className="overlay">
        <div className="controls">
          <button onClick={handlePlayPause} className="control-btn">
            {isPaused ? '▶️' : '⏸️'}
          </button>
          <button onClick={handleLike} className="control-btn">
            {video.isLiked ? '❤️' : '🤍'} {video.likes}
          </button>
          <button onClick={() => setShowComments(!showComments)} className="control-btn">
            💬 {video.comments.length}
          </button>
        </div>
        <div className="info">
          <p><strong>{video.user}</strong></p>
          <p>{video.description}</p>
        </div>
        {showComments && (
          <div className="comments">
            {video.comments.map((c, i) => <p key={i}>{c}</p>)}
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add comment"
            />
            <button onClick={handleComment}>Post</button>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [videos, setVideos] = useState(mockVideos);

  const handleLike = (id: string) => {
    setVideos(videos.map(v => 
      v.id === id ? { ...v, isLiked: !v.isLiked, likes: v.isLiked ? v.likes - 1 : v.likes + 1 } : v
    ));
  };

  const handleComment = (id: string, comment: string) => {
    setVideos(videos.map(v => 
      v.id === id ? { ...v, comments: [...v.comments, comment] } : v
    ));
  };

  return (
    <div className="app">
      <div className="feed">
        {videos.map(video => (
          <VideoItem key={video.id} video={video} onLike={handleLike} onComment={handleComment} />
        ))}
      </div>
    </div>
  );
}

export default App
