import type { Video } from './components/VideoCard'

const mockVideos: Video[] = [
  {
    id: '1',
    user: 'alice',
    caption: 'First video!',
    videoUrl: 'https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4',
    likes: 12,
    isFollowing: false,
  },
  {
    id: '2',
    user: 'bob',
    caption: 'Look at this!',
    videoUrl: 'https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_2mb.mp4',
    likes: 34,
    isFollowing: true,
  },
  {
    id: '3',
    user: 'carol',
    caption: 'Nice view',
    videoUrl: 'https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_3mb.mp4',
    likes: 56,
    isFollowing: false,
  },
]

export default mockVideos
