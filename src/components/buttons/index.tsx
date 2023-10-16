import * as React from "react";
import {
  StyledAppButtonPrimary,
  StyledAppButtonOutline,
  StyledAppButtonText,
} from "./styles";

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "text";
  fontSize?: Number;
  children: React.ReactNode;
  [otherProps: string]: any;
}
const AppButton: React.FC<AppButtonProps> = ({
  variant = "primary",
  fontSize = 16,
  children,
  ...otherProps
}) => {
  if (variant === "outline") {
    return (
      <StyledAppButtonOutline variant={variant} fontSize={fontSize} {...otherProps}>
        {children}
      </StyledAppButtonOutline>
    );
  }

  if (variant === "text") {
    return (
      <StyledAppButtonText variant={variant} fontSize={fontSize} {...otherProps}>
        {children}
      </StyledAppButtonText>
    );
  }

  // default primary
  return (
    <StyledAppButtonPrimary variant={variant} fontSize={fontSize} {...otherProps}>
      {children}
    </StyledAppButtonPrimary>
  );
};

export default AppButton;
