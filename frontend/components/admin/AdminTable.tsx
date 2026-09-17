interface Props {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}

export default function AdminTable({ title, action, children }: Props) {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-white">{title}</h1>
        {action}
      </div>
      <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden">
        {children}
      </div>
    </div>
  )
}
