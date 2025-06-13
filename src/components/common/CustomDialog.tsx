import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  handleOpen: () => void;
  children: React.ReactNode;
  className?: string;
}
export function CustomDialog({ open, handleOpen, children, className }: Props) {
  let classes =
    "max-w-full w-[10rem] min-h-[10rem] !bg-[#fff] !rounded-3xl overflow-y-auto pt-4 pb-0 ";
  if (className) {
    classes += " " + className;
  }
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className={classes}>
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>

        <div className="flex flex-col">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
