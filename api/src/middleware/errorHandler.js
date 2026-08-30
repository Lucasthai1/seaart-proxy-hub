export function registerErrorHandler(app) {
  app.setErrorHandler((error, request, reply) => {
    request.log.error({ err: error }, 'unhandled error');
    const statusCode = error.statusCode || 500;
    reply.code(statusCode).send({
      ok: false,
      error: statusCode === 500 ? 'internal_server_error' : error.message
    });
  });

  app.setNotFoundHandler((request, reply) => {
    reply.code(404).send({ ok: false, error: 'route_not_found', path: request.url });
  });
}
