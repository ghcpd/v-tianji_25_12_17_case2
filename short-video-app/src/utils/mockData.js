// Mock video data
export const MOCK_VIDEOS = [
  {
    id: 1,
    author: 'Alex Chen',
    avatar: '👨‍🎨',
    title: 'Amazing street art creation',
    videoUrl: 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs2btwEAA',
    thumbnail: '🎨',
    likes: 1240,
    comments: 89,
    shares: 234,
    duration: '00:45',
    liked: false,
    following: false,
    description: 'Street art masterpiece in downtown area'
  },
  {
    id: 2,
    author: 'Jordan Flow',
    avatar: '🏃',
    title: 'Epic parkour routine',
    videoUrl: 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs2btwEAA',
    thumbnail: '🏃',
    likes: 5632,
    comments: 342,
    shares: 1232,
    duration: '01:23',
    liked: false,
    following: false,
    description: 'Insane parkour tricks and flips'
  },
  {
    id: 3,
    author: 'Sofia Music',
    avatar: '🎤',
    title: 'Viral music cover',
    videoUrl: 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs2btwEAA',
    thumbnail: '🎵',
    likes: 8934,
    comments: 567,
    shares: 2341,
    duration: '03:12',
    liked: false,
    following: false,
    description: 'Beautiful cover of popular song'
  },
  {
    id: 4,
    author: 'Mike Cooking',
    avatar: '👨‍🍳',
    title: 'Quick 60-second recipe',
    videoUrl: 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs2btwEAA',
    thumbnail: '🍕',
    likes: 3456,
    comments: 234,
    shares: 567,
    duration: '01:00',
    liked: false,
    following: false,
    description: 'Easy and delicious pizza recipe'
  },
  {
    id: 5,
    author: 'Emma Travel',
    avatar: '✈️',
    title: 'Hidden beach paradise',
    videoUrl: 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs2btwEAA',
    thumbnail: '🏝️',
    likes: 12450,
    comments: 892,
    shares: 3421,
    duration: '02:15',
    liked: false,
    following: false,
    description: 'Breathtaking tropical paradise'
  },
  {
    id: 6,
    author: 'Tech Guru',
    avatar: '💻',
    title: 'Latest tech gadget review',
    videoUrl: 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs2btwEAA',
    thumbnail: '📱',
    likes: 5678,
    comments: 456,
    shares: 1234,
    duration: '04:30',
    liked: false,
    following: false,
    description: 'Unboxing and review of new smartphone'
  }
]

// Generate mock videos from base template
export const generateMockVideos = (count = MOCK_VIDEOS.length) => {
  return MOCK_VIDEOS.slice(0, count)
}
