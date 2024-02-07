/****************************************************
 Listeners
 ****************************************************/

listeners.defaultWebhookFtp = {
    label: 'Catch FTP skeleton events',
    type: 'service',
    options: {
        service: 'ftp',
        event: 'newFile',
        matching: {
            path: '/ftp',
        }
    },
    callback: function(event) {
        sys.logs.info('Received FTP webhook. Processing and triggering a package event.');
        if(event) {
            sys.logs.info('Valid webhook received. Triggering event.');
            sys.events.triggerEvent('ftp:webhook', {
                event: event
            });
            return "ok";
        }
        else throw new Error("Invalid webhook");
    }
};
