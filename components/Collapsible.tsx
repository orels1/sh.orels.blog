export default function Collapsible({
  header,
  children,
} : {
  header: string,
  children: React.ReactNode,
}) {
  return (
    <details className="p-6 rounded-xl ring-1 ring-inset hover:bg-white/10 open:hover:bg-transparent transition-colors ring-white/10">
      <summary className="font-semibold text-lg cursor-pointer">{header}</summary>
      <div className="animate-in fade-in">
        {children}
      </div>
    </details>
  );
}