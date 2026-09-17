'use client'

import { useEffect, useState } from 'react'
import { useCountUp } from '@/hooks/useCountUp'
import { useFadeUp } from '@/hooks/useFadeUp'

interface Metric {
  id: string
  label: string
  value: number
  suffix?: string
  prefix?: string
}

const FALLBACK: Metric[] = [
  { id: '1', label: 'People reached',  value: 12000, suffix: '+' },
  { id: '2', label: 'Communities',     value: 24 },
  { id: '3', label: 'Programs',        value: 18 },
  { id: '4', label: 'Years of impact', value: 7 },
]

function MetricItem({ metric, index }: { metric: Metric; index: number }) {
  const format = (v: number) => {
    const rounded = Math.round(v)
    const prefix = metric.prefix ?? ''
    const suffix = metric.suffix ?? ''
    if (metric.value >= 1000) return `${prefix}${(rounded / 1000).toFixed(0)}K${suffix}`
    return `${prefix}${rounded}${suffix}`
  }

  const numberRef = useCountUp(metric.value, { format, duration: 2 })
  const itemRef = useFadeUp<HTMLDivElement>({ delay: index * 0.12, y: 32 })

  return (
    <div ref={itemRef} style={{ opacity: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '0.75rem' }}>
        <span
          ref={numberRef}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 300, lineHeight: 1, color: 'var(--color-white)', letterSpacing: '-0.02em' }}
        >
          0
        </span>
      </div>
      <span className="gold-line" style={{ marginBottom: '0.875rem' }} />
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
        {metric.label}
      </p>
    </div>
  )
}

export default function ImpactCounter() {
  const [metrics, setMetrics] = useState<Metric[]>(FALLBACK)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/misc/impact`)
      .then(r => r.ok ? r.json() : null)
      .then(json => { if (json?.data?.length) setMetrics(json.data) })
      .catch(() => null)
  }, [])

  return (
    <section style={{ backgroundColor: 'var(--color-obsidian)', paddingBlock: 'clamp(5rem, 10vw, 8rem)', borderTop: '1px solid rgba(198,161,91,0.12)' }}>
      <div className="container-site">
        <span className="label-section" style={{ display: 'block', marginBottom: '3.5rem' }}>Our Impact</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem 2rem' }}>
          {metrics.map((metric, i) => (
            <MetricItem key={metric.id} metric={metric} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
