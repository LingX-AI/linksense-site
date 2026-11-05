'use client'

import { useId } from 'react'

export function Segmented({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: [{ value: string; label: string }, { value: string; label: string }]
  onChange: (value: string) => void
}) {
  const id = useId()

  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-sm text-fd-muted-foreground">{label}</legend>
      <div className="relative inline-grid grid-cols-2 rounded-full bg-fd-secondary p-1.5 text-fd-foreground">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-1.5 start-1.5 w-[calc((100%-0.75rem)/2)] rounded-full bg-brand transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{
            transform: `translateX(${value === options[1].value ? 100 : 0}%)`,
          }}
        />
        {options.map((option) => (
          <label
            key={option.value}
            className="relative cursor-pointer rounded-full px-5 py-3 text-center text-sm font-medium has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-fd-primary"
          >
            <input
              type="radio"
              className="peer sr-only"
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="relative transition-colors duration-200 peer-checked:text-brand-foreground motion-reduce:transition-none">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
