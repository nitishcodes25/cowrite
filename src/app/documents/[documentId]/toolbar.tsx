"use client";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { LucideIcon, Undo2Icon } from "lucide-react";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button 
        className={cn(
            "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80"
        )}
        onClick={onClick}
    >
      <Icon className="size-4" />
    </button>
  );
};
const Toolbar = () => {
  const {editor} = useEditorStore()
  const options: {
    label: string;
    onClick: () => void;
    icon: LucideIcon;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        onClick: () => editor?.chain().focus().undo().run(),
        icon: Undo2Icon,
      },
    ],
  ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {options[0].map((option) => (
        <ToolbarButton key={option.label} {...option} />
      ))}
    </div>
  );
};

export default Toolbar;
