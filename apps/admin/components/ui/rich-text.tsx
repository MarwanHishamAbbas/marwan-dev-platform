"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Youtube from "@tiptap/extension-youtube";
import { Button } from "@workspace/ui/components/button";
import { Toggle } from "@workspace/ui/components/toggle";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Code,
  Pilcrow,
  MoreHorizontalIcon,
  Youtube as YoutubeIcon,
  Table as TableIcon,
  CheckSquare,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  Highlighter,
  Palette,
  ChevronDown,
} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onBlur?: () => void;
}

const MarkdownEditor = ({
  value,
  onChange,
  placeholder = "Start writing your blog post...",
  className,
  onBlur,
}: MarkdownEditorProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [editorHtml, setEditorHtml] = useState(value);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Highlight,
      TextStyle,
      Color,

      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Youtube.configure({
        width: 640,
        height: 360,
        nocookie: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      // Get HTML representation
      const html = editor.getHTML();
      setEditorHtml(html);

      // Pass HTML to form handler
      onChange(html);
    },
    onBlur: onBlur,
  });

  // Handle synchronizing the editor content when value prop changes
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // Hydration fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={cn("border rounded-md flex flex-col", className)}>
      <ToolbarMenu editor={editor} />
      <EditorContent
        editor={editor}
        className="prose prose-sm md:prose-base dark:prose-invert max-w-none p-4 min-h-[350px] focus-visible:outline-none"
      />
    </div>
  );
};

interface ToolbarMenuProps {
  editor: Editor | null;
}

const ToolbarMenu = ({ editor }: ToolbarMenuProps) => {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isYoutubeDialogOpen, setIsYoutubeDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  if (!editor) {
    return null;
  }

  // Function to handle adding a link with custom dialog
  const openLinkDialog = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any form submission

    // Get selected text for potential link text
    const selectedText = editor.state.selection.empty
      ? ""
      : editor.state.doc.textBetween(
          editor.state.selection.from,
          editor.state.selection.to
        );

    if (selectedText) {
      setLinkText(selectedText);
    }

    // Check if there's already a link and get its URL
    const linkMark = editor.getAttributes("link");
    if (linkMark.href) {
      setLinkUrl(linkMark.href);
    }

    setIsLinkDialogOpen(true);
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission

    if (linkUrl) {
      // If we have text selected, update it, otherwise just add the link
      if (editor.state.selection.empty && linkText) {
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${linkUrl}">${linkText}</a>`)
          .run();
      } else {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: linkUrl })
          .run();
      }
    } else {
      // If url is empty, remove the link
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }

    // Reset and close dialog
    setLinkUrl("");
    setLinkText("");
    setIsLinkDialogOpen(false);
  };

  // Function to handle image upload with custom dialog
  const openImageDialog = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any form submission
    setIsImageDialogOpen(true);
  };

  const handleImageSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission

    if (imageUrl) {
      editor
        .chain()
        .focus()
        .setImage({ src: imageUrl, alt: imageAlt || "Image" })
        .run();
    }

    // Reset and close dialog
    setImageUrl("");
    setImageAlt("");
    setIsImageDialogOpen(false);
  };

  // Function to handle Youtube embed
  const openYoutubeDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsYoutubeDialogOpen(true);
  };

  const handleYoutubeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (youtubeUrl) {
      editor.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run();
    }

    setYoutubeUrl("");
    setIsYoutubeDialogOpen(false);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="border-b flex flex-wrap gap-0.5 p-1 items-center overflow-x-auto">
        {/* Text Formatting Section */}
        <div className="flex flex-wrap gap-0.5 mr-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                aria-label="Bold"
              >
                <Bold className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bold (Ctrl+B)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
                aria-label="Italic"
              >
                <Italic className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Italic (Ctrl+I)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("underline")}
                onPressedChange={() =>
                  editor.chain().focus().toggleUnderline().run()
                }
                aria-label="Underline"
              >
                <UnderlineIcon className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Underline (Ctrl+U)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("highlight")}
                onPressedChange={() =>
                  editor.chain().focus().toggleHighlight().run()
                }
                aria-label="Highlight"
              >
                <Highlighter className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Highlight text</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 flex gap-1"
                  >
                    <Palette className="h-4 w-4" />
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Text color</TooltipContent>
            </Tooltip>
            <DropdownMenuContent>
              <DropdownMenuLabel>Text Color</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid grid-cols-5 gap-1 p-1">
                {[
                  "#000000",
                  "#FF0000",
                  "#00FF00",
                  "#0000FF",
                  "#FFFF00",
                  "#FF00FF",
                  "#00FFFF",
                  "#808080",
                  "#800000",
                  "#808000",
                  "#008000",
                  "#800080",
                  "#008080",
                  "#000080",
                  "#7851A9",
                ].map((color) => (
                  <div
                    key={color}
                    className="w-6 h-6 rounded-md cursor-pointer border border-gray-200"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      editor.chain().focus().setColor(color).run();
                    }}
                  />
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => editor.chain().focus().unsetColor().run()}
              >
                Remove color
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mr-1.5" />

        {/* Paragraph Formatting Section */}
        <div className="flex flex-wrap gap-0.5 mr-1.5">
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 flex gap-1"
                  >
                    {editor.isActive("heading", { level: 1 }) && (
                      <Heading1 className="h-4 w-4" />
                    )}
                    {editor.isActive("heading", { level: 2 }) && (
                      <Heading2 className="h-4 w-4" />
                    )}
                    {editor.isActive("heading", { level: 3 }) && (
                      <Heading3 className="h-4 w-4" />
                    )}
                    {editor.isActive("heading", { level: 4 }) && (
                      <Heading4 className="h-4 w-4" />
                    )}
                    {editor.isActive("heading", { level: 5 }) && (
                      <Heading5 className="h-4 w-4" />
                    )}
                    {editor.isActive("heading", { level: 6 }) && (
                      <Heading6 className="h-4 w-4" />
                    )}
                    {editor.isActive("paragraph") && (
                      <Pilcrow className="h-4 w-4" />
                    )}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Text style</TooltipContent>
            </Tooltip>
            <DropdownMenuContent>
              <DropdownMenuLabel>Text Style</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={cn(
                  "flex items-center gap-2",
                  editor.isActive("paragraph") &&
                    "font-bold bg-gray-100 dark:bg-gray-800"
                )}
              >
                <Pilcrow className="h-4 w-4" /> Paragraph
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={cn(
                  "flex items-center gap-2",
                  editor.isActive("heading", { level: 1 }) &&
                    "font-bold bg-gray-100 dark:bg-gray-800"
                )}
              >
                <Heading1 className="h-4 w-4" /> Heading 1
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={cn(
                  "flex items-center gap-2",
                  editor.isActive("heading", { level: 2 }) &&
                    "font-bold bg-gray-100 dark:bg-gray-800"
                )}
              >
                <Heading2 className="h-4 w-4" /> Heading 2
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={cn(
                  "flex items-center gap-2",
                  editor.isActive("heading", { level: 3 }) &&
                    "font-bold bg-gray-100 dark:bg-gray-800"
                )}
              >
                <Heading3 className="h-4 w-4" /> Heading 3
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={cn(
                  "flex items-center gap-2",
                  editor.isActive("heading", { level: 4 }) &&
                    "font-bold bg-gray-100 dark:bg-gray-800"
                )}
              >
                <Heading4 className="h-4 w-4" /> Heading 4
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
                className={cn(
                  "flex items-center gap-2",
                  editor.isActive("heading", { level: 5 }) &&
                    "font-bold bg-gray-100 dark:bg-gray-800"
                )}
              >
                <Heading5 className="h-4 w-4" /> Heading 5
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
                className={cn(
                  "flex items-center gap-2",
                  editor.isActive("heading", { level: 6 }) &&
                    "font-bold bg-gray-100 dark:bg-gray-800"
                )}
              >
                <Heading6 className="h-4 w-4" /> Heading 6
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: "left" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                aria-label="Align Left"
              >
                <AlignLeft className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align left</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: "center" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                aria-label="Align Center"
              >
                <AlignCenter className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align center</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: "right" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                aria-label="Align Right"
              >
                <AlignRight className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align right</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: "justify" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
                aria-label="Align Justify"
              >
                <AlignJustify className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Justify</TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mr-1.5" />

        {/* Lists and Block Elements Section */}
        <div className="flex flex-wrap gap-0.5 mr-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
                aria-label="Bullet List"
              >
                <List className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bullet list</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
                aria-label="Ordered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Numbered list</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("taskList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleTaskList().run()
                }
                aria-label="Task List"
              >
                <CheckSquare className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Task list</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("blockquote")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBlockquote().run()
                }
                aria-label="Blockquote"
              >
                <Quote className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Blockquote</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("codeBlock")}
                onPressedChange={() =>
                  editor.chain().focus().toggleCodeBlock().run()
                }
                aria-label="Code Block"
              >
                <Code className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Code block</TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mr-1.5" />

        {/* Insert Section */}
        <div className="flex flex-wrap gap-0.5 mr-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={openLinkDialog}
                aria-label="Add Link"
                type="button" // Explicitly set button type to prevent form submission
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert link</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={openImageDialog}
                aria-label="Add Image"
                type="button" // Explicitly set button type to prevent form submission
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert image</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={openYoutubeDialog}
                aria-label="Add YouTube Video"
                type="button"
              >
                <YoutubeIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert YouTube video</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={(e) => {
                  e.preventDefault(); // Prevent any form submission
                  editor.chain().focus().setHorizontalRule().run();
                }}
                aria-label="Add Horizontal Rule"
                type="button" // Explicitly set button type to prevent form submission
              >
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert horizontal rule</TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mr-1.5" />

        {/* History Section */}
        <div className="flex flex-wrap gap-0.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={(e) => {
                  e.preventDefault(); // Prevent any form submission
                  editor.chain().focus().undo().run();
                }}
                disabled={!editor.can().undo()}
                aria-label="Undo"
                type="button" // Explicitly set button type to prevent form submission
              >
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={(e) => {
                  e.preventDefault(); // Prevent any form submission
                  editor.chain().focus().redo().run();
                }}
                disabled={!editor.can().redo()}
                aria-label="Redo"
                type="button" // Explicitly set button type to prevent form submission
              >
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Link Dialog */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
            <DialogDescription>Add a link to your document.</DialogDescription>
          </DialogHeader>
          <div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                  URL
                </Label>
                <Input
                  id="url"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="col-span-3"
                  autoComplete="off"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="text" className="text-right">
                  Text
                </Label>
                <Input
                  id="text"
                  placeholder="Link text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="col-span-3"
                  autoComplete="off"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsLinkDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleLinkSubmit}>Insert Link</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogDescription>
              Add an image to your document.
            </DialogDescription>
          </DialogHeader>
          <div onSubmit={handleImageSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  URL
                </Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="col-span-3"
                  autoComplete="off"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageAlt" className="text-right">
                  Alt Text
                </Label>
                <Input
                  id="imageAlt"
                  placeholder="Image description"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="col-span-3"
                  autoComplete="off"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsImageDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Insert Image</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* YouTube Dialog */}
      <Dialog open={isYoutubeDialogOpen} onOpenChange={setIsYoutubeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert YouTube Video</DialogTitle>
            <DialogDescription>
              Add a YouTube video to your document.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleYoutubeSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="youtubeUrl" className="text-right">
                  URL
                </Label>
                <Input
                  id="youtubeUrl"
                  placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="col-span-3"
                  autoComplete="off"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsYoutubeDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Insert Video</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default MarkdownEditor;
