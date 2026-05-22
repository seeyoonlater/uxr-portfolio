import React, { useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (newVal: string) => void;
  active: boolean;
  className?: string;
  type?: 'input' | 'textarea';
  style?: React.CSSProperties;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  active,
  className = '',
  type = 'input',
  style,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea heights to match text content as the user types
  useEffect(() => {
    if (active && type === 'textarea' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, active, type]);

  if (!active) {
    if (type === 'textarea') {
      return (
        <span className={className} style={style}>
          {value.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < value.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </span>
      );
    }
    return <span className={className} style={style}>{value}</span>;
  }

  if (type === 'textarea') {
    return (
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} w-full bg-amber-500/[0.04] border border-dashed border-amber-400 focus:bg-amber-500/[0.08] focus:border-amber-500 focus:outline-none p-1.5 rounded transition-all resize-none block text-left inline-block`}
        style={{ ...style, height: 'auto' }}
        rows={1}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${className} bg-amber-500/[0.04] border border-dashed border-amber-400 focus:bg-amber-500/[0.08] focus:border-amber-500 focus:outline-none px-1.5 py-0.5 rounded transition-all max-w-full text-left inline-block`}
      style={style}
    />
  );
};
