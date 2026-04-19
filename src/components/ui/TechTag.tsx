interface TechTagProps {
  label: string;
}

export default function TechTag({ label }: TechTagProps) {
  return (
    <span className="font-mono text-[10px] text-text-muted border border-border-default px-2 py-0.5 rounded-[3px] tracking-wider">
      {label}
    </span>
  );
}
