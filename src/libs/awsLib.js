import {
    Storage
} from 'aws-amplify';

export async function s3Upload(file) {
    //if your app is being used heavily this might not be the best way to create a unique filename
    const filename = `${Date.now()}-${file.name}`;

    //if we were uploading publicly you can use the Storage.put() method.
    const stored = await Storage.vault.put(filename, file, {
        contentType: file.type
    });

    return stored.key;
}