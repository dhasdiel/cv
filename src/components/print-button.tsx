"use client";

import { PrinterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button
      className="size-8 print:hidden"
      variant="outline"
      size="icon"
      onClick={() => window.print()}
      aria-label="Print or save as PDF"
    >
      <PrinterIcon className="size-4" aria-hidden="true" />
    </Button>
  );
}
