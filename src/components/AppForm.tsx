/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseAppFormReturn } from '@src/hooks/useAppForm';
import { Empty, Spin } from 'antd';
import { ReactNode } from 'react';
import { FieldValues, FormProvider } from 'react-hook-form';

export type AppFormProps<F extends FieldValues = any> = {
  form: UseAppFormReturn<F>;
  notFoundDescription?: string;
};

export const AppForm = <F extends FieldValues = FieldValues>(props: AppFormProps<F> & { children: ReactNode }) => {
  const { form, notFoundDescription } = props;

  if (form.formMode === 'VIEW' && !form.isGettingData && !form.remoteData)
    return <Empty description={notFoundDescription || 'No Data'} />;

  return (
    <FormProvider {...form}>
      <Spin spinning={form.isGettingData}>{props.children}</Spin>
    </FormProvider>
  );
};
