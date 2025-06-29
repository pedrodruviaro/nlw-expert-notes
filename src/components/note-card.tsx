import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

import type { Note } from "../app";

type NoteCardProps = {
  note: Note;
  onNoteDeleted: (id: string) => void;
};

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  const handleDeleteNote = () => {
    onNoteDeleted(note.id);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger type="button" className="flex flex-col gap-3 text-left rounded-md outline-none bg-slate-800 p-5 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <p className="text-sm font-medium text-slate-300">{formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}</p>
        <p className="text-sm leading-6 text-slate-400">
          {note.content}
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-slate-700 rounded-md flex flex-col outline-none h-[60dvh]">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 focus:text-slate-100 outline-none">
            <X className="size-5" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <p className="text-sm font-medium text-slate-300">{formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}</p>
            <p className="text-sm leading-6 text-slate-400">
              {note.content}
            </p>
          </div>

          <button onClick={handleDeleteNote} type="button" className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group">
            Deseja
            {" "}
            <span className="text-red-400 group-hover:underline">apagar essa nota</span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
