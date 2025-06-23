import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface OwnProps {
  card: React.ReactNode;
  title: string;
  subtitle?: string;
  description: React.ReactNode;
  imageUrl?: string;
}

export function RickmortyDialog({
  card,
  title,
  subtitle,
  description,
  imageUrl,
}: OwnProps) {
  return (
    <Dialog>
      <DialogTrigger>{card}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
          {imageUrl && <img src={imageUrl} alt={title} />}
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
