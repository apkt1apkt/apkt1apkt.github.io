import { useAppFormContext } from '@src/hooks/useAppForm';
import { Col, ColProps, Input, InputProps } from 'antd';
import { Controller } from 'react-hook-form';

type FormInputProps = {
  label: string;
  name: string;
  span: ColProps['span'];
} & Omit<InputProps, 'onBlur' | 'onChange' | 'name' | 'value'>;

export const InlineFormInput = ({
  name,
  label,
  span,
  disabled,
  readOnly,
  ...inputProps
}: FormInputProps) => {
  const { control, formMode } = useAppFormContext();

  const isReadonly = readOnly || formMode === 'VIEW';

  const input = (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <>
            <Input
              style={{ marginBottom: 5 }}
              {...inputProps}
              addonBefore={label}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              name={field.name}
              disabled={disabled}
              readOnly={isReadonly}
            />
            <div style={{ color: 'red', marginLeft: 10 }}>{fieldState.error?.message || ''}</div>
          </>
        );
      }}
    />
  );

  if (span) return <Col span={span}>{input}</Col>;

  return input;
};
