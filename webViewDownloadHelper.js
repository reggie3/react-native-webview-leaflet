import { FileSystem } from 'expo';
const Rollbar = require('rollbar');
import * as secrets from './secrets';

const rollbar = new Rollbar({
  accessToken: secrets.rollbarToken,
  captureUncaught: true,
  captureUnhandledRejections: true
});

export const checkForFiles = async (directory, version, files, callback) => {
  // directory name of the form:
  //    react-native-webview-leaflet/24
  const DIRECTORY_NAME =
    FileSystem.documentDirectory + directory + '/' + version;

  const GOOD_DOWNLOAD_FILE_NAME = 'downloads_completed';
  try {
    let checkIfExists = await FileSystem.getInfoAsync(DIRECTORY_NAME);

    // check to see if the directory exists
    if (checkIfExists.exists) {
      rollbar.log('directory found');
      rollbar.log('checking for good downloads');
      let checkForGoodDownloads = await FileSystem.getInfoAsync(
        DIRECTORY_NAME + '/' + GOOD_DOWNLOAD_FILE_NAME
      );
      rollbar.log(`found ${JSON.stringify(checkForGoodDownloads)}`);
      if (checkForGoodDownloads.exists) {
        rollbar.log('found good downloads');
        return {
            success: true,
            msg: 'found good downloads'
          };;
      } else {
        rollbar.log('downloads bad, deleting directory');
        await FileSystem.deleteAsync(DIRECTORY_NAME);
        rollbar.log('directory deleted');
        rollbar.log('downloading files');
        let downloadResults = await downloadFiles(files, DIRECTORY_NAME);
        debugger;
        rollbar.log(downloadResults);
      }
    } else {
      // directory doesn't exist so create it
      rollbar.log('creating directory');
      await FileSystem.makeDirectoryAsync(DIRECTORY_NAME, {
        intermediates: true
      });
      rollbar.log('directory created');
      rollbar.log('downloading files created');
      // download the files into the newly created directory
      let downloadResults = await downloadFiles(files, DIRECTORY_NAME);
      if (downloadResults.downloadFailures.length > 0) {
        rollbar.log('some files failed to download');
      } else {
        // successfully downloaded all the files so write the file denoting
        // a good download
        rollbar.log('all files downloaded');
        await FileSystem.writeAsStringAsync(
          DIRECTORY_NAME + '/' + GOOD_DOWNLOAD_FILE_NAME,
          version
        );
        rollbar.log('completion file written');
      }
    }
    rollbar.log('reading directory');

    let directoryReadResults = await FileSystem.readDirectoryAsync(
      DIRECTORY_NAME
    );
    rollbar.log(directoryReadResults);

    // return a list of all files in the directory
    return {
      success: true,
      files: directoryReadResults
    };
  } catch (error) {
    rollbar.error(error);
    return {
      success: false,
      error
    };
  }
};

const downloadFiles = async (files, DIRECTORY_NAME) => {
  let downloadPromises = files.map(async file => {
    return await FileSystem.downloadAsync(
      file,
      DIRECTORY_NAME + '/' + file.substring(file.lastIndexOf('/') + 1)
    );
  });

  let downloadSuccess = [];
  let downloadFailures = [];
  let downloadResults = await Promise.all(downloadPromises);
  downloadResults.forEach(downloadResult => {
    if (downloadResult.status === 200) {
      downloadSuccess.push(downloadResult.uri);
      debugger;
    } else {
      downloadFailures.push(downloadResult.uri);
      debugger;
    }
  });

  return {
    downloadFailures
  };
};
