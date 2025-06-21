import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { toast } from "sonner";

type NewNoteCardProps = {
  onNoteCreated: (content: string) => void;
};

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState("");

  const handleStartEditor = () => {
    setShouldShowOnboarding(false);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    setContent(value);

    if (value === "") {
      setShouldShowOnboarding(true);
    }
  };

  const handleSaveNote = (event: FormEvent) => {
    event.preventDefault();

    onNoteCreated(content);
    setContent("");
    setShouldShowOnboarding(true);

    toast.success("Nota criada com sucesso!");
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-left flex flex-col gap-3 rounded-md bg-slate-700 p-5 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <p className="text-sm font-medium text-slate-200">Adicionar nota</p>
        <p className="text-sm leading-6 text-slate-400">Grave uma nota em áudio que será convertido para texto automaticamente</p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-slate-700 rounded-md flex flex-col outline-none h-[60dvh]">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 focus:text-slate-100 outline-none">
            <X className="size-5" />
          </Dialog.Close>

          <form className="flex flex-col flex-1" onSubmit={handleSaveNote}>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <p className="text-sm font-medium text-slate-300">Adicionar nota</p>

              {shouldShowOnboarding
                ? (
                    <p className="text-sm leading-6 text-slate-400">
                      Comece
                      {" "}
                      <button type="button" className="font-medium text-lime-400 hover:underline">gravando uma nota</button>
                      {" "}
                      em áudio, ou se preferir,
                      {" "}
                      <button type="button" className="font-medium text-lime-400 hover:underline" onClick={handleStartEditor}>utilize apenas texto</button>
                      .
                    </p>
                  )
                : (
                    <textarea autoFocus className="outline-none text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1" value={content} onChange={handleContentChange}></textarea>
                  )}

            </div>

            <button type="submit" className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500 transition-colors">
              Salvar nota
            </button>
          </form>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
