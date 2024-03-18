const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "localhost:8000/api",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./api/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
