"use client";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormatting,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 shrink-0 w-[120px] flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1 z-10 bg-white rounded-sm shadow-md">
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => {editor?.chain().focus().setFontFamily(value).run()}}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-200/80"
            )}
            style={{fontFamily : value}}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
  const { editor } = useEditorStore();
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
      {
        label: "Redo",
        onClick: () => editor?.chain().focus().redo().run(),
        icon: Redo2Icon,
      },
      {
        label: "Print",
        onClick: () => window.print(),
        icon: PrinterIcon,
      },
      {
        label: "Spell Check",
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
        icon: SpellCheckIcon,
      },
    ],
    [
      {
        label: "Bold",
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
        icon: BoldIcon,
      },
      {
        label: "Italic",
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        icon: ItalicIcon,
      },
      {
        label: "Underline",
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        icon: UnderlineIcon,
      },
    ],
    [
      {
        label: "Comment",
        isActive: false,
        onClick: () => {
          console.log("To do: comment");
        },
        icon: MessageSquarePlusIcon,
      },
      {
        label: "Task List",
        isActive: editor?.isActive("taskList"),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        icon: ListTodoIcon,
      },
      {
        label: "Remove Formatting",
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        icon: RemoveFormatting,
      },
    ],
  ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {options[0].map((option) => (
        <ToolbarButton key={option.label} {...option} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/*Heading*/}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/*Font size*/}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {options[1].map((option) => (
        <ToolbarButton key={option.label} {...option} />
      ))}
      {/*Text color*/}
      {/*Highlight  color*/}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/*Link*/}
      {/*Image*/}
      {/*Align*/}
      {/*Line height*/}
      {/*List*/}
      {options[2].map((option) => (
        <ToolbarButton key={option.label} {...option} />
      ))}
    </div>
  );
};

export default Toolbar;
