/**
 * Command to run: node scripts/buildWhitelabels.js --whitelabels=utask,task-master,task-tide
 */
const {argv} = require('node:process');
const {resolve} = require('node:path');
const {readdir, cp} = require('node:fs/promises');

const directoryList = [];
const BLACK_LIST_DIRECTORIES = [
  '.DS_Store',
  '.git',
  '.vscode',
  'README.md',
  'cspell.json',
  'node_modules',
  'scripts',
  'whitelabels',
  'whitelabels-resources',

  'ios',
];

async function readFolders() {
  const directories = await readdir('./');

  for await (const dirName of directories) {
    directoryList.push(dirName);
  }
}

async function copyFolder(source, destination) {
  console.log('source', source);
  console.log('destination', destination);

  await cp(source, destination, {
    recursive: true,
  });
}

console.log('Start build whitelabel...');
(async function () {
  console.log('Reading folders...');
  await readFolders();

  const appDirectories = directoryList.filter(
    item => !BLACK_LIST_DIRECTORIES.includes(item),
  );

  const [whitelabelsArgs] = argv.filter(item => item.includes('--whitelabels'));

  if (!whitelabelsArgs) {
    console.log('Please provide a whitelabel to build');
    return;
  }

  console.log('whitelabelsArgs', whitelabelsArgs);
  const whitelabels = whitelabelsArgs.split('=')[1].split(',');

  console.log('Copying folders...');
  // for (const whitelabelFolder of whitelabels) {
  //   for (const dir of appDirectories) {
  //     const sourcePath = resolve(__dirname, '../', dir);
  //     const destPath = resolve(
  //       __dirname,
  //       `../whitelabels/${whitelabelFolder}`,
  //       dir,
  //     );
  //     await copyFolder(sourcePath, destPath);
  //   }
  // }
})();
console.log('Finish build whitelabel...');
