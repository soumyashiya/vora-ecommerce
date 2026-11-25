"use client";

import { useState } from "react";

const labelCls = "label-xs mb-2 block text-clay";

export function AuthField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <input
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="field-box"
      />
    </label>
  );
}

export function AuthSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <select value={value} onChange={onChange} className="field-box">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export function PasswordField({
  label,
  value,
  onChange,
  placeholder = "••••••••",
  autoComplete = "current-password",
  forgotHref,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  forgotHref?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <label className="block">
      <span className={`${labelCls} flex items-center justify-between`}>
        {label}
        {forgotHref && (
          <a
            href={forgotHref}
            className="tap-pad normal-case tracking-normal text-clay underline underline-offset-4 transition-colors hover:text-espresso"
          >
            Forgot?
          </a>
        )}
      </span>
      <div className="flex items-center rounded-[8px] border border-sand bg-cream pr-2 transition-colors focus-within:border-espresso">
        <input
          required
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full bg-transparent px-4 py-[14px] text-[15px] text-espresso outline-none placeholder:text-taupe"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="rounded-[6px] px-3 py-1.5 text-[12px] font-medium uppercase tracking-[0.06em] text-clay transition-colors hover:bg-beige hover:text-espresso"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </label>
  );
}
