export function NoteCard() {
  return (
    <button type="button" className="text-left rounded-md outline-none bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <p className="text-sm font-medium text-slate-300">há 4 dias</p>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos optio totam corporis praesentium non? Quo, tempore praesentium nisi quos similique quidem, qui, obcaecati quis molestias molestiae maiores labore corrupti quibusdam? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum placeat laudantium consectetur vero explicabo dignissimos earum hic delectus qui totam quidem a ipsum, maiores accusantium nobis odio, autem voluptate facilis?
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
    </button>
  );
}
