'use client';

import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import { useState } from "react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function CopyButton({
  text
} : {
  text: string;
}){
  const [open, setOpen] = useState(false);

  const handleCopyClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }

  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger>
          <Button onClick={handleCopyClick} variant="outline" title="Copy Link" size="sm"><LinkIcon size="16" /></Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copied!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}