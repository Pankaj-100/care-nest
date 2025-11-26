import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface Props {
  open: boolean;
  handleOpen: () => void;
  children: React.ReactNode;
  className?: string;
  direction?: "top" | "bottom" | "left" | "right";
}

function CustomDrawer({ open, handleOpen, children, className, direction = "bottom" }: Props) {
  return (
    <Drawer open={open} onOpenChange={handleOpen} direction={direction}>
      <DrawerContent className={`${className}`}>{children}</DrawerContent>
    </Drawer>
  );
}

export default CustomDrawer;
