import { Button, ButtonProps, CopyButton } from "@mantine/core";

interface CopyButtonProps {
  buttonProps?: ButtonProps;
  copyLabel: string;
  copiedLabel: string;
  value: string;
}

const CopyButtonComponent = (props: CopyButtonProps) => {
  return (
    <CopyButton value={props.value}>
      {({ copied, copy }) => (
        <Button
          color={copied ? "teal" : "blue"}
          onClick={copy}
          variant="outline"
          {...props.buttonProps}
        >
          {copied ? props.copiedLabel : props.copyLabel}
        </Button>
      )}
    </CopyButton>
  );
};

export default CopyButtonComponent;
