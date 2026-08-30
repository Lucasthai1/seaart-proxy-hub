export function requestLogPlugin(app) {
  app.addHook('onResponse', (request, reply, done) => {
    app.log.info(
      { method: request.method, url: request.url, statusCode: reply.statusCode, responseTime: reply.elapsedTime },
      'request completed'
    );
    done();
  });
}
