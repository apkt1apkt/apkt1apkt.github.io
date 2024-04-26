import { Card, Statistic, Table } from 'antd';
import type { TableProps } from 'antd';
import { useLazyQuery, useQuery } from '@apollo/client';
import { DONATION_RECORDED, GET_DONATIONS, TOTAL_DONATIONS } from '@src/containers/donation.gql';
import { Donation } from '@src/__generated__/graphql';
import { TimeAgo } from '@src/components/TimeAgo';
import { useEffect, useMemo } from 'react';
import { uniqBy } from 'lodash';

const columns: TableProps['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Amount GH',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
    render: (text) => <span>{text?.toFixed(2)}</span>,
  },
  {
    title: 'Mobile No.',
    dataIndex: 'mobile',
    key: 'mobile',
    align: 'center',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Recorded By',
    key: 'recordedBy',
    render: (donation: Donation) => {
      return <a>{donation?.user?.name || ''}</a>;
    },
  },
  {
    title: 'Recorded At',
    dataIndex: 'recordedAt',
    key: 'recordedAt',
    render: (text) => <TimeAgo date={text} />,
  },
];

export const ListDonations = () => {
  const { data, loading, subscribeToMore } = useQuery(GET_DONATIONS);
  const [getTotalDonations, { data: totalData, error }] = useLazyQuery(TOTAL_DONATIONS, {
    pollInterval: 1000 * 60 * 10,
  });

  console.log(error);

  useEffect(() => {
    subscribeToMore({
      document: DONATION_RECORDED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newDonation = subscriptionData.data.donationRecorded;
        return {
          ...prev,
          donations: uniqBy([newDonation, ...(prev.donations || [])].slice(0, 100), 'id') as any,
        };
      },
    });
  }, [subscribeToMore]);

  useEffect(() => {
    getTotalDonations();
  }, [data]);

  const donations = useMemo(() => {
    return (data?.donations || []).map((v) => ({ key: v?.id, ...v }));
  }, [data?.donations]);

  return (
    <div>
      <Card bordered={false}>
        <Statistic
          title="Total Donations"
          prefix="GH₵ "
          value={totalData?.totalDonations || 0}
          precision={2}
        />
      </Card>
      <Table columns={columns} dataSource={donations} loading={loading} />
    </div>
  );
};
