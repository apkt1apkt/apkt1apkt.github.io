import type { ButtonProps, PopconfirmProps } from 'antd';
import { Button, Popconfirm } from 'antd';

export type ConfirmButtonProps = Omit<PopconfirmProps & ButtonProps, 'onSubmit'>;

export const ConfirmButton = (props: ConfirmButtonProps) => {
  const { title, description, onConfirm, onCancel, okText, cancelText, children, ...buttonProps } = props;

  const popupconfirmProps = {
    title,
    description,
    onConfirm,
    onCancel,
    okText: okText || 'Confirm',
    cancelText,
  };

  return (
    <Popconfirm {...popupconfirmProps}>
      <Button {...buttonProps}>{children} </Button>
    </Popconfirm>
  );
};
