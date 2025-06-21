import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";

import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

type Note = {
  id: string;
  date: Date;
  content: string;
};

export function App() {
  const [parent] = useAutoAnimate();

  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      return JSON.parse(storedNotes);
    }
    return [];
  });

  const onNoteCreated = (content: string) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  const filteredNotes = search !== ""
    ? notes.filter(note =>
        note.content.toLowerCase().includes(search.toLowerCase()),
      )
    : notes;

  return (
    <main className="mx-auto max-w-6xl my-12 space-y-6">
      <div>
        <span className="font-semibold text-xl tracking-tight font-mono ">expert notes</span>
      </div>

      <form>
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          value={search}
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <section className="grid grid-cols-3 auto-rows-[250px] gap-6" ref={parent}>
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
          />
        ))}

      </section>
    </main>
  );
}
