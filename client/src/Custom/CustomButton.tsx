import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

const CustomButton = ({ loading, children, ...rest }: CustomButtonProps) => {
  if (loading) {
    return (
      <Button {...rest}>
        <CircularProgress size={20} />
      </Button>
    );
  }
  return <Button {...rest}>{children}</Button>
};

export default CustomButton;
