'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'
import ProjectForm from '@/components/admin/ProjectForm'
import type { Project } from '@/types'

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    api.get<{ data: Project }>(`/projects/${id}`, { token: getToken() ?? undefined })
      .then(res => setProject(res.data))
      .catch(() => null)
  }, [id])

  if (!project) {
    return <div className="p-8"><p className="text-white/40 text-sm animate-pulse">Loading…</p></div>
  }

  return <ProjectForm project={project} />
}
