'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api/client'
import { getToken } from '@/lib/auth/adminAuth'
import ProgramForm from '@/components/admin/ProgramForm'
import type { Program } from '@/types'

export default function EditProgramPage() {
  const { id } = useParams<{ id: string }>()
  const [program, setProgram] = useState<Program | null>(null)

  useEffect(() => {
    api.get<{ data: Program }>(`/programs/${id}`, { token: getToken() ?? undefined })
      .then(res => setProgram(res.data))
      .catch(() => null)
  }, [id])

  if (!program) {
    return (
      <div className="p-8">
        <p className="text-white/40 text-sm animate-pulse">Loading…</p>
      </div>
    )
  }

  return <ProgramForm program={program} />
}
