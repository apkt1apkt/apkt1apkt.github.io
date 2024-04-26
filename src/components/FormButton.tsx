import { ConfirmButton, ConfirmButtonProps } from '@src/components/ConfirmButton';
import { useAppFormContext } from '@src/hooks/useAppForm';

export type FormButtonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (values: any) => void;
} & Omit<ConfirmButtonProps, 'onConfirm'>;

export const FormButton = ({ onSubmit, ...props }: FormButtonProps) => {
  const { handleSubmit, formState, formMode } = useAppFormContext();

  if (formMode === 'VIEW') return <></>;

  const canSubmit =
    !props.disabled && formState.isValid && formState.isDirty && !formState.isLoading && !formState.isValidating;

  return <ConfirmButton {...props} disabled={!canSubmit} onConfirm={handleSubmit(onSubmit || console.log)} />;
};
