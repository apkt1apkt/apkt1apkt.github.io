import * as yup from 'yup';

type envType = yup.InferType<typeof envSchema>;

const env = import.meta.env;

export const envService = {
  serverUrl: env.VITE_APP_SERVER_URL,
  googleClientId: env.VITE_APP_GOOGLE_ClIENT_ID,
} as envType;

const envSchema = yup.object().shape({
  serverUrl: yup.string().required(),
  googleClientId: yup.string().required(),
});

envSchema.validateSync(envService);
