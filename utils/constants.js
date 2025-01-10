module.exports = {
  database: {
    options: {
      connectTimeoutMS: 30000,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    },
    checkColliction: [
      "employees",
      "customers",
      "cars",
      "jobcards",
      "claims",
      "quotations",
    ],
    dbName: "claim-ms-prod",
  },
};
