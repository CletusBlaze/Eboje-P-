interface FieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
  hint?: string
}

export function Field({ label, required, children, hint }: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
        {label}{required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-white/30">{hint}</p>}
    </div>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="w-full bg-white/5 border border-white/10 text-white px-4 py-2.5 text-sm outline-none focus:border-gold transition-colors rounded-sm disabled:opacity-40"
    />
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export function Textarea(props: TextareaProps) {
  return (
    <textarea
      {...props}
      className="w-full bg-white/5 border border-white/10 text-white px-4 py-2.5 text-sm outline-none focus:border-gold transition-colors rounded-sm resize-y min-h-[120px] disabled:opacity-40"
    />
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
}
export function Select({ options, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className="w-full bg-[#0d2820] border border-white/10 text-white px-4 py-2.5 text-sm outline-none focus:border-gold transition-colors rounded-sm"
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}
export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input type="checkbox" {...props} className="w-4 h-4 accent-gold" />
      <span className="text-sm text-white/70">{label}</span>
    </label>
  )
}
