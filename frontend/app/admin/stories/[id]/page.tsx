'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'
import StoryForm from '@/components/admin/StoryForm'
import type { Story } from '@/types'

export default function EditStoryPage() {
  const { id } = useParams<{ id: string }>()
  const [story, setStory] = useState<Story | null>(null)

  useEffect(() => {
    api.get<{ data: Story }>(`/stories/${id}`, { token: getToken() ?? undefined })
      .then(res => setStory(res.data))
      .catch(() => null)
  }, [id])

  if (!story) {
    return <div className="p-8"><p className="text-white/40 text-sm animate-pulse">Loading…</p></div>
  }

  return <StoryForm story={story} />
}
