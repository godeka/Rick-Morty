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
  descriptions: React.ReactNode[];
  imageUrl?: string;
}

export function RickmortyDialog({
  card,
  title,
  subtitle,
  descriptions,
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
          {descriptions.map((des) =>
            des ? <DialogDescription>{des}</DialogDescription> : null
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
