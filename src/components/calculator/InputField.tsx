'use client';

interface InputFieldProps {
  label: string;
  id: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
}

export function InputField({
  label,
  id,
  value,
  onChange,
  prefix = '$',
  suffix,
  min = 0,
  max,
  step = 1,
  helpText,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          id={id}
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          min={min}
          max={max}
          step={step}
          placeholder="0"
          className={`w-full rounded-xl border border-gray-300 bg-white py-3 text-gray-900 shadow-sm transition-colors
            focus:border-[#1E5F6C] focus:outline-none focus:ring-2 focus:ring-[#1E5F6C]/20
            ${prefix ? 'pl-8' : 'pl-4'} ${suffix ? 'pr-12' : 'pr-4'}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {helpText && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  );
}
