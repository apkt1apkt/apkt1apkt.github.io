import { useMutation } from '@apollo/client';
import { RECORD_DONATION } from '@src/containers/donation.gql';
import { DonationForm } from '@src/containers/DonationForm';
import { useDonationForm } from '@src/containers/useDonationForm';
import { useAppNotification } from '@src/hooks/useAppNotification';

export const RecordDonation = () => {
  const showNotification = useAppNotification();

  const [recordDonation, { loading }] = useMutation(RECORD_DONATION, {
    onCompleted: () => {
      form.reset();
      showNotification({
        type: 'success',
        message: `Donation recorded`,
      });
    },
    onError: (e) => {
      showNotification({
        type: 'error',
        message: 'Failed to record donation',
        description: e?.message,
      });
    },
  });

  const handleSubmit = (values: Obj) => {
    recordDonation({
      variables: {
        donationInput: { amount: +values.amount, mobile: values.mobile, name: values.name },
      },
    });
  };

  const form = useDonationForm({
    formMode: 'CREATE',
    isSubmittingData: loading,
  });

  return <DonationForm form={form} handleSubmit={handleSubmit} />;
};
