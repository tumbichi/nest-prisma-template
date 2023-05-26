module.exports = {
  apps: [
    {
      name: 'nest-prisma-template-backend',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
    },
  ],
};
