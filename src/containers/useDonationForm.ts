import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput, useAppForm } from '@src/hooks/useAppForm';
import { transformMobileNumber } from '@src/helpers/str';

export const useDonationForm = (input: FormInput<typeof defaultValues>) => {
  return useAppForm({
    ...input,
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
};

const defaultValues = {
  id: 0,
  name: 'arnld',
  mobile: '0241121253',
  amount: 103,
};

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  mobile: yup
    .string()
    .required('Mobile number is required')
    .test('is-mobile', 'Invalid mobile number', function (value) {
      const mobile = transformMobileNumber(value);
      return !!mobile;
    }),
  amount: yup.number().positive('Amount cannot be less than 1GH').required().label('Amount'),
});
