const fsExtra = require('fs-extra');
const {
  branch,
  checkout,
  commit,
  init,
  fetch,
  remote,
} = require('./../../git');

async function createTmpRemoteRepository(spawnOpts /*: Object */ = {}) {
  try {
    // Init git in the temp origin dir.
    await init(spawnOpts);
    // Commit to master for temp origin.
    await commit('Initial commit for master temp origin', spawnOpts);
    // Create develop.
    await branch('develop', spawnOpts);
    // Commit to develop for temp origin.
    await commit('Initial commit for develop temp origin', spawnOpts);
  } catch (err) {
    throw Error(
      `An error happened while creating the temp origin repository: ${err}`,
    );
  }
}

async function createTmpLocalRepository(
  tmpOriginRemotePath /*: string */,
  spawnOpts /*: Object */ = {},
) {
  try {
    // Init git in the local temp dir.
    await init(spawnOpts);
    // Point to the origin temp remote.
    await remote('origin', `${tmpOriginRemotePath}/.git`, spawnOpts);
    // Fetch all the branches.
    await fetch(spawnOpts);
    // Checkout master.
    await checkout('master', spawnOpts);
    // Commit to master for temp origin.
    await commit('Initial commit for master temp origin', spawnOpts);
  } catch (err) {
    throw Error(
      `An error happened while creating the local temp repository: ${err}`,
    );
  }
}

function cleanUp(folderPath /*:string */) {
  fsExtra.remove(folderPath, err => {
    if (err !== null) {
      throw Error(
        `An error happened while deleting the temp repository: ${folderPath} with this error: ${err}`,
      );
    }
  });
}

module.exports = {
  createTmpRemoteRepository,
  createTmpLocalRepository,
  cleanUp,
};
