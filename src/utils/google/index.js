const fs = require('fs');
const config = require('../../../config/default');

const generateCredentialFile = () => {
    if (process.env.NODE_ENV === 'test'){
        return;
    }

    const jsonData = {
        'type': config.gcp.type,
        'project_id': config.gcp.projectId,
        'private_key_id': config.gcp.privateKeyId,
        'private_key': config.gcp.privateKey,
        'client_email': config.gcp.clientEmail,
        'client_id': config.gcp.clientId
    };

    fs.writeFile(config.gcp.credentials, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
            throw new Error('Unable to generate google storage key file : ' + err);
        } else {
            console.log('Successfully generated google storage key file.');
        }
    });
};

module.exports = {generateCredentialFile}