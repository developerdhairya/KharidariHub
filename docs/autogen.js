const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:4800',
  schemes: ['http'],
};

const outputFile = './test.json';
const endpointsFiles = ['./server.js'];
const autogenImpl=swaggerAutogen(outputFile, endpointsFiles, doc);

module.exports={
    autogenImpl
}