import { Navbar } from '@src/components/Navbar';
import { ListDonations } from '@src/containers/ListDonations';
import { RecordDonation } from '@src/containers/RecordDonation';
import { Card } from 'antd';

export const MainPage = () => {
  return (
    <div>
      <Navbar />
      <div className="content">
        <RecordDonation />

        <Card>
          <ListDonations />
        </Card>
      </div>
    </div>
  );
};
