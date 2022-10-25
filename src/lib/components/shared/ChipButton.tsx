import { Button } from "@chakra-ui/react";

type ChipButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export const ChipButton = ({ children, onClick }: ChipButtonProps) => {
  return (
    <Button
      size={{ base: "xs", sm: "sm" }}
      onClick={onClick}
      textTransform="capitalize"
    >
      {children}
    </Button>
  );
};
