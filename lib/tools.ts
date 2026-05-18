import {
  RotateCw,
  Scissors,
    RefreshCcw,
    Crop,
  FileArchive,
  FileImage,
  FileInput,
  FileLock2,
  FileOutput,
  FileText,
  ImageMinus,
  ImagePlus,
  Images,
  Music,
  QrCode,
  ScanFace,
  type LucideIcon,
} from "lucide-react";

export type Tool = {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
  status: "ready" | "soon";
};

export const tools: Tool[] = [
    {
  slug: "crop-image",
  title: "Crop Image",
  description: "Crop JPG, PNG, and WebP images online.",
  category: "Image",
  icon: Crop,
  status: "ready",
},
{
  slug: "split-pdf",
  title: "Split PDF",
  description: "Extract selected pages from a PDF file.",
  category: "PDF",
  icon: Scissors,
  status: "ready",
},
{
  slug: "image-converter",
  title: "Image Converter",
  description: "Convert images to JPG, PNG, or WebP.",
  category: "Image",
  icon: RefreshCcw,
  status: "ready",
},
  {
    slug: "compress-pdf",
    title: "Compress PDF Online Free",
    description: "Reduce PDF file size while keeping pages clear.",
    category: "PDF",
    icon: FileArchive,
    status: "ready",
  },
  {
    slug: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDFs into one document.",
    category: "PDF",
    icon: FileInput,
    status: "ready",
  },
  {
  slug: "rotate-pdf",
  title: "Rotate PDF",
  description: "Rotate PDF pages clockwise and download a new file.",
  category: "PDF",
  icon: RotateCw,
  status: "ready",
},
  {
    slug: "jpg-to-pdf",
    title: "JPG to PDF",
    description: "Turn JPG images into a downloadable PDF.",
    category: "PDF",
    icon: FileOutput,
    status: "ready",
  },
  {
    slug: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert PDF pages into JPG images.",
    category: "PDF",
    icon: FileImage,
    status: "ready",
  },
  {
    slug: "compress-image",
    title: "Compress Image",
    description: "Make JPG, PNG, and WebP images smaller.",
    category: "Image",
    icon: ImageMinus,
    status: "ready",
  },
  {
    slug: "resize-image",
    title: "Resize Image",
    description: "Change image width and height quickly.",
    category: "Image",
    icon: ImagePlus,
    status: "ready",
  },
  {
    slug: "remove-background",
    title: "Remove Background",
    description: "Prepare product and profile image cutouts.",
    category: "Image",
    icon: Images,
    status: "ready",
  },
  {
    slug: "passport-size-photo",
    title: "Passport Size Photo",
    description: "Create printable passport photo sheets.",
    category: "Photo",
    icon: ScanFace,
    status: "ready",
  },
  {
    slug: "mp4-to-mp3",
    title: "MP4 to MP3",
    description: "Extract audio from video files.",
    category: "Media",
    icon: Music,
    status: "ready",
  },
  {
    slug: "qr-code-generator",
    title: "QR Code Generator",
    description: "Create QR codes for links and text.",
    category: "Utility",
    icon: QrCode,
    status: "ready",
  },
  {
    slug: "word-counter",
    title: "Word Counter",
    description: "Count words, characters, and reading time.",
    category: "Writing",
    icon: FileText,
    status: "ready",
  },
  {
    slug: "unlock-pdf",
    title: "Unlock PDF",
    description: "Remove known password protection from your own PDFs.",
    category: "PDF",
    icon: FileLock2,
    status: "soon",
  },
];

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}