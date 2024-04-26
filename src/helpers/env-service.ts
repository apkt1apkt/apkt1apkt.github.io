import * as yup from "yup";

export const envService = {
  serverUrl: "http://localhost:9006/api",
  googleClientId: "742142303917-aob02ke2a6qja9o8hjcmqhb5kek8aaft.apps.googleusercontent.com",
};

const envSchema = yup.object().shape({
  serverUrl: yup.string().required(),
  googleClientId: yup.string().required(),
});

envSchema.validateSync(envService);
