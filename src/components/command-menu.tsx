"use client";

import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { CommandIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

interface Props {
  links: { url: string; title: string }[];
}

export const CommandMenu = ({ links }: Props) => {
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  let isMac =
    typeof window !== "undefined"
      ? window.navigator.userAgent.indexOf("Mac") > -1
      : false;

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelectPrint = () => {
    setOpen(false);
    const currentTheme = theme;

    const handlePrint = async () => {
      // If in dark mode, switch to light mode for printing
      if (currentTheme === "dark") {
        setTheme("light");

        // Wait for theme change to take effect
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Print
        window.print();

        // Wait for print dialog to close before switching back
        setTimeout(() => {
          setTheme("dark");
        }, 100);
      } else {
        // Already in light mode, just print
        window.print();
      }
    };

    handlePrint();
  };

  return (
    <>
      <p className="border-t-muted bg-background text-muted-foreground fixed bottom-0 left-0 right-0 hidden border-t p-1 text-center text-sm print:hidden xl:block">
        Press{" "}
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5  text-[10px] font-medium opacity-100">
          <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>+J
        </kbd>{" "}
        to open the command menu
      </p>
      <Button
        onClick={() => setOpen((open) => !open)}
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 flex rounded-full shadow-2xl print:hidden xl:hidden"
      >
        <CommandIcon className="size-6 my-6" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={handleSelectPrint}>
              <span>Print</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              <span>Change to {theme === "dark" ? "light" : "dark"} mode</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Links">
            {links.map(({ url, title }) => (
              <CommandItem
                key={url}
                onSelect={() => {
                  setOpen(false);
                  window.open(url, "_blank");
                }}
              >
                <span>{title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
};
