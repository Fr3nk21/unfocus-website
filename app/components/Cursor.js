'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const rafId   = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const rng  = ringRef.current
    if (!dot || !rng) return

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

    const onLeave = () => {
      dot.style.opacity = '0'
      rng.style.opacity = '0'
    }

    const onEnter = () => {
      dot.style.opacity = '1'
      rng.style.opacity = '0.4'
    }

    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.08
      ring.current.y += (mouse.current.y - ring.current.y) * 0.08
      rng.style.left = ring.current.x + 'px'
      rng.style.top  = ring.current.y + 'px'
      rafId.current = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    rafId.current = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cur-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />
    </>
  )
}
