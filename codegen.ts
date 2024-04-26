import { CodegenConfig } from '@graphql-codegen/cli';
import { configDotenv } from 'dotenv';

configDotenv();

const config: CodegenConfig = {
  schema: `${process.env.VITE_APP_SERVER_URL}/graphql`,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
