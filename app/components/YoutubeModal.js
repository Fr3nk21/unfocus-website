'use client'
import { useEffect } from 'react'

export default function YoutubeModal({ isOpen, onClose, videoId, title = 'Video', vertical = false }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || !videoId) return null

  return (
    <div
      className="yt-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={vertical ? 'yt-container yt-vertical' : 'yt-container'}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="yt-close"
          onClick={onClose}
          aria-label="Close video"
        >
          ✕
        </button>
        <div className={vertical ? 'yt-frame-wrap yt-frame-vertical' : 'yt-frame-wrap'}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
