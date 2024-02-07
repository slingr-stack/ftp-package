/****************************************************
 Dependencies
 ****************************************************/

let ftpReference = dependencies.ftp;

let ftpDependency = {
    uploadFile: ftpReference.uploadFile
};

let ftpService = {};

/**
 *
 * Handles a request with retry from the platform side.
 */
function handleRequestWithRetry(requestFn, options, callbackData, callbacks) {
    try {
        return requestFn(options, callbackData, callbacks);
    } catch (error) {
        sys.logs.info("[ftp] Handling request...: "+ JSON.stringify(error));
        throw error;
    }
}

function createWrapperFunction(requestFn) {
    return function(options, callbackData, callbacks) {
        return handleRequestWithRetry(requestFn, options, callbackData, callbacks);
    };
}

for (let key in ftpDependency) {
    if (typeof ftpDependency[key] === 'function') ftpService[key] = createWrapperFunction(ftpDependency[key]);
}

/****************************************************
 Public API - Generic Functions
 ****************************************************/

/**
 * Try to send a fileId from the platform and upload this file to FTP server.
 *
 * @param {string} folder       - The path to folder where is going to upload file.
 * @param {string} fileId       - The id of the field of type file.
 * @return {object}             - The response of the service.
 */
exports.uploadFile = function (folder, fileId) {
    if (!fileId) {
        fileId = folder;
        folder = null;
    }
    if (!fileId) {
        throw 'Empty file id';
    }
    let options = {
        folder: folder,
        fileId: fileId
    };
    checkValue(options, 'fileId');
    return ftpService.uploadFile(Ftp(options));
};

exports.utils = {

    /**
     * Converts a given date to a timestamp.
     *
     * @param {number | string} params      - The date to be converted.
     * @return {object}                     - An object containing the timestamp.
     */
    fromDateToTimestamp: function(params) {
        if (!!params) {
            return {timestamp: new Date(params).getTime()};
        }
        return null;
    },

    /**
     * Converts a timestamp to a date object.
     *
     * @param {number} timestamp            - The timestamp to convert.
     * @return {object}                     - The date object representing the timestamp.
     */
    fromTimestampToDate: function(timestamp) {
        return new Date(timestamp);
    },

    /**
     * Gets a configuration from the properties.
     *
     * @param {string} property             - The name of the property to get.
     *                                          If it is empty, return the entire configuration object.
     * @return {string}                     - The value of the property or the whole object as string.
     */
    getConfiguration: function (property) {
        if (!property) {
            sys.logs.debug('[skeleton] Get configuration');
            return JSON.stringify(config.get());
        }
        sys.logs.debug('[skeleton] Get property: '+property);
        return config.get(property);
    },

    /**
     * Concatenates a path with a param query and its value.
     *
     * @param path                          - The path to concatenate.
     * @param key                           - The name of the param.
     * @param value                         - The value of the param.
     * @returns {string}                    - The concatenated path without coding parameters.
     */
    concatQuery: function (path, key, value) {
        return path + ((!path || path.indexOf('?') < 0) ? '?' : '&') + key + "=" + value;
    },

    /**
     * Merges two JSON objects into a single object.
     *
     * @param {Object} json1 - The first JSON object to be merged.
     * @param {Object} json2 - The second JSON object to be merged.
     * @return {Object} - The merged JSON object.
     */
    mergeJSON: function (json1, json2) {
        const result = {};
        let key;
        for (key in json1) {
            if(json1.hasOwnProperty(key)) result[key] = json1[key];
        }
        for (key in json2) {
            if(json2.hasOwnProperty(key)) result[key] = json2[key];
        }
        return result;
    }
};

/****************************************************
 Private helpers
 ****************************************************/

function checkValue (options, idKey) {
    if (!options[idKey]) {
        // exception if value is not present
        throw 'Empty ' + idKey;
    }
}

/****************************************************
 Configurator
 ****************************************************/

let Ftp = function (options) {
    options = options || {};
    //options.config = config.get();
    return options;
}
