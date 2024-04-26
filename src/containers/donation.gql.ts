import { gql } from '@src/__generated__';

export const GET_DONATIONS = gql(`
  query GetDonations {
    donations{
      id
      name
      mobile
      amount
      recordedAt
      user {
        id
        name
      }
    }
  }
`);

export const RECORD_DONATION = gql(`
  mutation RecordDonation($donationInput: DonationInput!) {
    recordDonation(donationInput: $donationInput) {
      id  
      name
      mobile
      amount
      user {
        id
        name
      }
      recordedAt
    }
  }
`);

export const DONATION_RECORDED = gql(`
  subscription DonationRecorded {
    donationRecorded {
      id
      name
      mobile
      amount
      recordedAt
      user {
        id
        name
      }
    }
  }
`);

export const TOTAL_DONATIONS = gql(`
  query TotalDonations {
    totalDonations
  }
`);
