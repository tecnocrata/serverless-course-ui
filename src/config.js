export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-east-1",
      BUCKET: "notes-enrique"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://9jisd2iwyj.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_7RVjoqdPt",
      APP_CLIENT_ID: "88pa0tnd8vc9v12p1bi9flbc8",
      IDENTITY_POOL_ID: "us-east-1:20fd4fe1-185f-442d-9a49-b9037c001d56"
    }
  };