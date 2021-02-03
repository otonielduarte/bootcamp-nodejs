import server from '@shared/infra/http/server';

server.listen(process.env.APP_PORT, () => {
  console.log(`Server started, listening on port: ${process.env.APP_PORT}`);
});
