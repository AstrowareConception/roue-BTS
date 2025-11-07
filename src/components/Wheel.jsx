import React, { useEffect, useMemo, useRef, useState } from 'react'

/**
 * Wheel component
 * props:
 * - items: string[] (labels)
 * - selectedIndex: number | null
 * - spinning: boolean
 * - durationMs: number
 * - disabledIndices?: number[] (slices that are disabled/inactive)
 * - colorScheme?: 'terms' | 'students'
 */
export default function Wheel({ items, selectedIndex, spinning, durationMs = 8000, disabledIndices = [], colorScheme = 'terms' }) {
  const n = items.length || 1
  const angle = 360 / n
  const disabledSet = useMemo(() => new Set(disabledIndices), [disabledIndices])

  const [rotation, setRotation] = useState(0)
  const [transition, setTransition] = useState('none')
  const lastSpinRef = useRef(0)

  // Colors
  const palette = useMemo(() => {
    const baseA = colorScheme === 'terms' ? 210 : 330 // blue/pink hue
    const altA = colorScheme === 'terms' ? 190 : 300
    const arr = new Array(n).fill(0).map((_, i) => {
      const hue = i % 2 === 0 ? baseA : altA
      const sat = 85
      const light = 55
      return `hsl(${hue} ${sat}% ${light}%)`
    })
    return arr
  }, [n, colorScheme])

  // Compute target rotation when spinning changes to true
  useEffect(() => {
    if (!spinning || selectedIndex == null || n === 0) return

    // ensure a big number of turns for spectacle
    const baseTurns = 8 // full rotations

    // We want the selected slice to land at 0deg (top marker). Slices start centered at angle/2 offset.
    // Each slice i starts at i*angle and its center at i*angle + angle/2.
    const sliceCenterDeg = selectedIndex * angle + angle / 2
    const targetDeg = baseTurns * 360 + (360 - sliceCenterDeg) // rotate so that selected center aligns to 0deg marker

    // Force transition to apply
    requestAnimationFrame(() => {
      setTransition(`transform ${durationMs}ms cubic-bezier(0.2, 0.9, 0.1, 1)`) // ease out
      setRotation(targetDeg)
      lastSpinRef.current = Date.now()
    })
  }, [spinning, selectedIndex, n, angle, durationMs])

  // When not spinning and items change, reset rotation and transition instantly
  useEffect(() => {
    if (!spinning && selectedIndex == null) {
      setTransition('none')
      setRotation(0)
    }
  }, [spinning, selectedIndex, n])

  // Build slices as SVG path wedges
  const slices = useMemo(() => {
    const r = 180 // radius for the viewBox 0 0 400 400 centered at 200,200
    const cx = 200, cy = 200
    const arr = []
    for (let i = 0; i < n; i++) {
      const startAng = (i * angle - 90) * Math.PI / 180 // -90 to start at top
      const endAng = ((i + 1) * angle - 90) * Math.PI / 180
      const x1 = cx + r * Math.cos(startAng)
      const y1 = cy + r * Math.sin(startAng)
      const x2 = cx + r * Math.cos(endAng)
      const y2 = cy + r * Math.sin(endAng)
      const largeArc = angle > 180 ? 1 : 0
      const d = [
        `M ${cx} ${cy}`,
        `L ${x1} ${y1}`,
        `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ')
      arr.push({ d, i })
    }
    return arr
  }, [n, angle])

  return (
    <div className={`wheel ${colorScheme}`}>
      <div className="wheel-viewport">
        <svg className="pointer" viewBox="0 0 40 40" aria-hidden>
          <polygon points="20,0 30,12 10,12" />
        </svg>
        <div className="disc" style={{ transform: `rotate(${rotation}deg)`, transition }}>
          <svg viewBox="0 0 400 400" className="disc-svg">
            <defs>
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.35" />
              </filter>
            </defs>
            {slices.map(({ d, i }) => (
              <path key={i} d={d} fill={disabledSet.has(i) ? '#ccc' : palette[i % palette.length]} />
            ))}
            {items.map((label, i) => {
              const mid = i * angle + angle / 2
              const rad = (mid - 90) * Math.PI / 180
              const rx = 200 + 120 * Math.cos(rad)
              const ry = 200 + 120 * Math.sin(rad)
              return (
                <g key={`t-${i}`} transform={`translate(${rx},${ry}) rotate(${mid})`}>
                  <text className={`slice-label ${disabledSet.has(i) ? 'disabled' : ''}`} textAnchor="middle" transform="rotate(90)" >
                    {label}
                  </text>
                </g>
              )
            })}
            <circle cx="200" cy="200" r="198" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="4" />
            <circle cx="200" cy="200" r="16" fill="#fff" filter="url(#shadow)" />
          </svg>
        </div>
      </div>
    </div>
  )
}
