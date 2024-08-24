/**
 * Command to run: node scripts/buildWhitelabels.js --whitelabels=utask,task-master,task-tide
 */
const sharp = require('sharp');
const {argv} = require('node:process');
const {resolve} = require('node:path');
const {execSync} = require('node:child_process');
const {readdir, cp} = require('node:fs/promises');

const BLACK_LIST_ROOT_DIRECTORIES = [
  '.DS_Store',
  '.git',
  '.vscode',
  'README.md',
  'cspell.json',
  'node_modules',
  'scripts',
  'vendor',
  'whitelabels',
  'whitelabels-resources',

  // ToDo: Remove to run on ios
  'ios',
];

const androidResolutions = [
  {
    name: 'hdpi',
    resolution: 192,
  },
  {
    name: 'mdpi',
    resolution: 128,
  },
  {
    name: 'xhdpi',
    resolution: 256,
  },
  {
    name: 'xxhdpi',
    resolution: 384,
  },
  {
    name: 'xxxhdpi',
    resolution: 512,
  },
];

async function readFolders(path) {
  const directoryList = [];
  const directories = await readdir(path);

  for await (const dirName of directories) {
    directoryList.push(dirName);
  }

  return directoryList;
}

async function copyFolder(source, destination) {
  await cp(source, destination, {
    recursive: true,
  });
}

async function copyResources(appRootPath, whitelabelName, whitelabelPath) {
  const whitelabelResourcesPath = `${appRootPath}/whitelabels-resources/${whitelabelName}`;
  const whitelabelLogoPath = `${whitelabelResourcesPath}/logo.png`;
  const whitelabelConfigPath = `${whitelabelResourcesPath}/config.json`;

  for (const androidRes of androidResolutions) {
    const resolution = androidRes.resolution;
    await sharp(whitelabelLogoPath)
      .resize(resolution, resolution)
      .toFile(
        `${whitelabelPath}/android/app/src/main/res/mipmap-${androidRes.name}/ic_launcher.png`,
      );

    await sharp(whitelabelLogoPath)
      .resize(resolution, resolution)
      .toFile(
        `${whitelabelPath}/android/app/src/main/res/mipmap-${androidRes.name}/ic_launcher_round.png`,
      );
  }

  const whitelabelsResourcesPath = `${appRootPath}/whitelabels/${whitelabelName}/resources`;

  await cp(whitelabelLogoPath, `${whitelabelsResourcesPath}/logo.png`);
  await cp(whitelabelConfigPath, `${whitelabelsResourcesPath}/config.json`);
}

console.log('Start build whitelabel...');
(async function () {
  console.log('Reading folders...');

  const appRootPath = resolve(__dirname, '../');

  const directoryList = await readFolders(appRootPath);

  const appDirectories = directoryList.filter(
    item => !BLACK_LIST_ROOT_DIRECTORIES.includes(item),
  );

  const [whitelabelsArgs] = argv.filter(item => item.includes('--whitelabels'));

  if (!whitelabelsArgs) {
    console.log('Please provide a whitelabel to build');
    return;
  }

  console.log('whitelabelsArgs', whitelabelsArgs);
  const whitelabels = whitelabelsArgs.split('=')[1].split(',');

  console.log('Start copying folders...');
  for (const whitelabelFolder of whitelabels) {
    console.log(`Start build whitelabel: ${whitelabelFolder}`);

    let whitelabelPath = '';
    for (const dir of appDirectories) {
      let srcPath = `${appRootPath}/${dir}`;
      whitelabelPath = `${appRootPath}/whitelabels/${whitelabelFolder}`;
      let destPath = `${whitelabelPath}/${dir}`;

      if (dir === 'android') {
        const androidFolder = `${appRootPath}/${dir}`;

        const androidDirectories = await readFolders(androidFolder);

        for (const androidDir of androidDirectories) {
          const androidDirSrcPath = `${srcPath}/${androidDir}`;
          const androidDirDestPath = `${destPath}/${androidDir}`;

          if (androidDir === 'app') {
            const androidAppFolder = `${androidFolder}/${androidDir}`;

            const androidAppDirectories = await readFolders(androidAppFolder);

            for (const androidAppDir of androidAppDirectories) {
              if (androidAppDir === 'build') {
                continue;
              }

              const androidAppDirSrcPath = `${androidDirSrcPath}/${androidAppDir}`;
              const androidAppDirDestPath = `${androidDirDestPath}/${androidAppDir}`;

              await copyFolder(androidAppDirSrcPath, androidAppDirDestPath);
            }
          } else {
            if (androidDir === '.gradle') {
              continue;
            }

            await copyFolder(androidDirSrcPath, androidDirDestPath);
          }
        }
      } else {
        await copyFolder(srcPath, destPath);
      }
    }

    await copyResources(appRootPath, whitelabelFolder, whitelabelPath);

    console.log(`Finish build whitelabel: ${whitelabelFolder}`);

    console.log(
      `Start installing dependencies for whitelabel: ${whitelabelFolder}`,
    );

    const bufferData = execSync('yarn', {
      cwd: whitelabelPath,
      stdio: 'pipe',
    });

    console.log(bufferData.toString('utf-8'));

    console.log(
      `Finish installing dependencies for whitelabel: ${whitelabelFolder}`,
    );
  }

  console.log('Finish build whitelabel...');
})();
