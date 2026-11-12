export default function SectionHeader({ index, route, title, description }) {
  return (
    <header className="mb-8 flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="label mb-2">
          <span className="text-accent">{index}</span> / {route}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
      </div>
      {description && <p className="max-w-md text-sm leading-relaxed text-muted">{description}</p>}
    </header>
  );
}
