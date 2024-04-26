/* eslint-disable @typescript-eslint/no-explicit-any */

import { normalizeObj, pickShapeStrict } from '@src/helpers/obj';
import { useCallback, useEffect, useState } from 'react';
import {
  UseFormReturn,
  FieldValues,
  useFormContext,
  UseFormProps,
  useForm,
  SubmitHandler,
  Resolver,
} from 'react-hook-form';

export const useAppForm = <F extends FieldValues>(options: UseAppFormProps<F>) => {
  const [formMode, setFormMode] = useState<FormMode>(options.formMode);

  const form = useForm(options) as UseAppFormReturn<F>;
  const originalHandleSubmit = form.handleSubmit;

  const handleSubmit = useCallback(
    (submitHandler: SubmitHandler<F>) =>
      originalHandleSubmit((data, event) => {
        const newData = pickShapeStrict(options.defaultValues, normalizeObj(data)) as F;
        const { id, ...dataWithoutId } = newData;
        return submitHandler(dataWithoutId as F, event);
      }),
    [originalHandleSubmit, options.defaultValues],
  );

  useEffect(() => {
    setFormMode(options.formMode);
  }, [options.formMode]);

  useEffect(() => {
    if (formMode === 'VIEW') {
      form.reset(pickShapeStrict(options.defaultValues, options.remoteData) as F);
    }
  }, [options.remoteData, form, formMode, options.defaultValues]);

  useEffect(() => {
    if (formMode === 'CREATE') {
      form.reset(options.defaultValues as F);
    }
  }, [formMode, options.defaultValues, form]);

  form.formMode = formMode;
  form.handleSubmit = handleSubmit;
  form.isGettingData = !!options.isGettingData;
  form.isSubmittingData = !!options.isSubmittingData;
  form.remoteData = options.remoteData!;

  return form;
};

export const useAppFormContext = <F extends FieldValues>() => {
  const form = useFormContext();
  return form as UseAppFormReturn<F>;
};

export type UseAppFormProps<F extends FieldValues> = Omit<
  WithRequired<UseFormProps<F>, 'defaultValues'>,
  'resolver'
> & {
  formMode: FormMode;
  remoteData?: DeepNullable<F> | null;
  resolver?: Resolver<any>;
  isGettingData?: boolean;
  isSubmittingData?: boolean;
};

export type FormInput<F extends FieldValues> = Pick<
  UseAppFormProps<F>,
  'formMode' | 'remoteData' | 'isGettingData' | 'isSubmittingData'
>;

export type UseAppFormReturn<F extends FieldValues = FieldValues> = UseFormReturn<F> & {
  formMode: FormMode;
  isGettingData: boolean;
  isSubmittingData: boolean;
  remoteData: DeepNullable<F> | null;
};

export type FormMode = 'CREATE' | 'EDIT' | 'VIEW';
