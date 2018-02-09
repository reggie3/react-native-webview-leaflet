import { FileSystem } from 'expo';

export const checkForFiles = async (directory, version, files, callback) => {
  // directory name of the form:
  //    react-native-webview-leaflet/24
  const CURRENT_VERSION_DIRECTORY_NAME =
    FileSystem.documentDirectory + directory + '/' + version;
  const PARENT_DIRECTORY = FileSystem.documentDirectory + directory;
  const GOOD_DOWNLOAD_FILE_NAME = 'downloads_completed';

  try {
    // get list of versions currently in the directory so that they can be deleted if needed
    console.log('reading parent directory');
    let parentDirectoryContents = await getParentDirectoryContents(PARENT_DIRECTORY);
    console.log(`parent contents: ${parentDirectoryContents}`);

    // check to see if this version's download directory already exists
    let checkIfExists = await FileSystem.getInfoAsync(
      CURRENT_VERSION_DIRECTORY_NAME
    );
    if (checkIfExists.exists) {
      console.log('directory found');
      console.log('checking for good downloads');
      let checkForGoodDownloads = await FileSystem.getInfoAsync(
        CURRENT_VERSION_DIRECTORY_NAME + '/' + GOOD_DOWNLOAD_FILE_NAME
      );
      console.log(`found good downloads`);
      if (checkForGoodDownloads.exists) {
        console.log('found good downloads');
        return {
          success: true,
          msg: 'found good downloads'
        };
      } else {
        console.log('downloads bad, deleting directory');
        await FileSystem.deleteAsync(CURRENT_VERSION_DIRECTORY_NAME);
        console.log('directory deleted');
        console.log('downloading files');
        let downloadResults = await downloadFiles(
          files,
          CURRENT_VERSION_DIRECTORY_NAME
        );
        console.log(downloadResults);
      }
    } else {
      // directory doesn't exist so create it
      console.log('creating directory');
      await FileSystem.makeDirectoryAsync(CURRENT_VERSION_DIRECTORY_NAME, {
        intermediates: true
      });
      console.log('directory created');
      console.log('downloading files created');
      // download the files into the newly created directory
      let downloadResults = await downloadFiles(
        files,
        CURRENT_VERSION_DIRECTORY_NAME
      );
      if (downloadResults.downloadFailures.length > 0) {
        console.log('some files failed to download');
      } else {
        // successfully downloaded all the files so write the file denoting
        // a good download
        console.log('all files downloaded');
        await FileSystem.writeAsStringAsync(
          CURRENT_VERSION_DIRECTORY_NAME + '/' + GOOD_DOWNLOAD_FILE_NAME,
          version
        );
        console.log('completion file written');
      }
    }

    // delete previous versions
    parentDirectoryContents.forEach(directoryName => {
      console.log(`deleting version ${directoryName}`);
      FileSystem.deleteAsync(PARENT_DIRECTORY + '/' + directoryName);
    });

    // read and return a list of all files in the directory
    console.log('reading directory');
    let directoryReadResults = await FileSystem.readDirectoryAsync(
      CURRENT_VERSION_DIRECTORY_NAME
    );
    console.log(directoryReadResults);
    return {
      success: true,
      files: directoryReadResults
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error
    };
  }
};

const getParentDirectoryContents = async PARENT_DIRECTORY => {
  let parentDirectoryInfoResults = await FileSystem.getInfoAsync(
    PARENT_DIRECTORY
  );
  if (parentDirectoryInfoResults.exists) {
    let parentDirectoryContents = await FileSystem.readDirectoryAsync(
      PARENT_DIRECTORY
    );
    return parentDirectoryContents;
  }
  return [];
};

const downloadFiles = async (files, CURRENT_VERSION_DIRECTORY_NAME) => {
  let downloadPromises = files.map(async file => {
    return await FileSystem.downloadAsync(
      file,
      CURRENT_VERSION_DIRECTORY_NAME +
        '/' +
        file.substring(file.lastIndexOf('/') + 1)
    );
  });

  let downloadSuccess = [];
  let downloadFailures = [];
  let downloadResults = await Promise.all(downloadPromises);
  downloadResults.forEach(downloadResult => {
    if (downloadResult.status === 200) {
      downloadSuccess.push(downloadResult.uri);
    } else {
      downloadFailures.push(downloadResult.uri);
    }
  });

  return {
    downloadFailures
  };
};
