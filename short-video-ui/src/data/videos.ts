export type Video = {
  id: string
  src: string
  user: string
  description: string
  likes: number
  liked?: boolean
  followed?: boolean
}

export const sampleVideos: Video[] = [
  {
    id: 'v1',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    user: 'alice',
    description: 'A tiny flower loop',
    likes: 120
  },
  {
    id: 'v2',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/sea.mp4',
    user: 'bob',
    description: 'Ocean vibes',
    likes: 230
  },
  {
    id: 'v3',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/bee.mp4',
    user: 'carol',
    description: 'Busy bee',
    likes: 87
  }
]
