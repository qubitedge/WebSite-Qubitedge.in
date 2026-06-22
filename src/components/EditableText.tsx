import { useState, useRef, useEffect, useCallback } from "react";
import { useAdmin } from "@/lib/AdminContext";

type EditableTextProps = {
  value: string;
  onChange: (v: string) => void;
  /** HTML tag to render in display mode */
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  /** Use textarea instead of input for multi-line editing */
  multiline?: boolean;
  /** Placeholder when value is empty */
  placeholder?: string;
  /** Additional inline style */
  style?: React.CSSProperties;
};

export function EditableText({
  value,
  onChange,
  as: Tag = "span",
  className = "",
  multiline = false,
  placeholder = "Click to edit…",
  style,
}: EditableTextProps) {
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Sync draft when value changes externally
  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  // Auto-focus when entering edit mode
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      // Move cursor to end
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, [editing]);

  const commit = useCallback(() => {
    setEditing(false);
    if (draft !== value) {
      onChange(draft);
    }
  }, [draft, value, onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setDraft(value);
        setEditing(false);
      } else if (e.key === "Enter" && !multiline) {
        commit();
      }
    },
    [commit, value, multiline]
  );

  if (!isAdmin) {
    // Visitor mode: render plain text
    return (
      <Tag className={className} style={style}>
        {value}
      </Tag>
    );
  }

  if (editing) {
    const sharedClasses = `${className} editable-text-input`;
    const sharedStyle: React.CSSProperties = {
      ...style,
      background: "transparent",
      border: "none",
      outline: "none",
      color: "inherit",
      font: "inherit",
      letterSpacing: "inherit",
      lineHeight: "inherit",
      textAlign: "inherit",
      width: "100%",
      resize: multiline ? "vertical" : "none",
      boxShadow: "inset 0 0 0 2px rgba(100, 206, 251, 0.5)",
      borderRadius: "4px",
      padding: "2px 4px",
      margin: "-2px -4px",
    };

    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          className={sharedClasses}
          style={sharedStyle}
          rows={Math.max(2, draft.split("\n").length)}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        className={sharedClasses}
        style={sharedStyle}
      />
    );
  }

  // Admin mode: show editable indicator
  return (
    <Tag
      className={`${className} editable-text-display`}
      style={{
        ...style,
        cursor: "text",
      }}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setEditing(true);
      }}
      title="Click to edit"
    >
      {value || <span className="text-white/30 italic">{placeholder}</span>}
    </Tag>
  );
}
