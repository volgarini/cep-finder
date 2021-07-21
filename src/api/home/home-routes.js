module.exports = server => {
    server.route(
        {
            method: 'GET',
            path: '/',
            options: {
                auth: false,
                handler: (request, reply) => {
                    return reply.redirect('/documentation');
                }
            }
        }
    )
}