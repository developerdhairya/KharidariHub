const MONGO_CONFIG={
    pageSize:10
}

const SWAGGER_CONFIG={
  info: {
    version: '1.0.0',
    title: 'Albums store',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat:'JWT'
    },
  },
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: ['../route/*','../model/*'],
};

module.exports={
    MONGO_CONFIG,
    SWAGGER_CONFIG
}