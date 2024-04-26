import { AppForm, AppFormProps } from '@src/components/AppForm';
import { FormButton, FormButtonProps } from '@src/components/FormButton';
import { InlineFormInput } from '@src/components/InlineFormInput';
import { Card, Row } from 'antd';

type DonationFormProps = {
  handleSubmit?: FormButtonProps['onSubmit'];
} & AppFormProps;

export const DonationForm = (props: DonationFormProps) => {
  const { handleSubmit, ...appFormProps } = props;

  return (
    <AppForm {...appFormProps}>
      <Card>
        <Row gutter={10}>
          <InlineFormInput name="name" label="Name" span={20} />
          <InlineFormInput name="mobile" label="Mobile No." span={20} />
          <InlineFormInput name="amount" label="Amount" type="number" span={20} min={1} step={10} />
        </Row>
        <div style={{ marginTop: 15, display: 'grid', placeItems: 'center' }}>
          <FormButton onSubmit={handleSubmit} title={`Confirm to record donation`}>
            Record Donation
          </FormButton>
        </div>
      </Card>
    </AppForm>
  );
};
