const pify = require('util').promisify;
const which = pify(require('which'));
const spawn = require('child_process').spawn;
const ROOT_DIR = process.cwd();

async function runCommand(bin, args, inherit) {
  const fullCommand = [bin].concat(args).join(' ');
  const binPath = await which(bin);
  return await new Promise((resolve, reject) => {
    const job = spawn(binPath, [].concat(args), {
      cwd: ROOT_DIR,
      env: process.env,
      stdio: inherit ? 'inherit' : 'pipe',
    });
    const stdout = [];
    const stderr = [];
    const finished = (code) => {
      if (parseInt(code, 10) !== 0) {
        const error =
          code instanceof Error ? code : new Error(`Run commad failed with none-zero code(${code}): ${fullCommand}`);
        error.message += '\n' + Buffer.concat(stderr).toString();
        reject(error);
      } else {
        resolve(Buffer.concat(stdout).toString());
      }
    };

    if (!inherit) {
      job.stdout.on('data', (data) => stdout.push(data));
      job.stderr.on('data', (data) => stderr.push(data));
    }

    job.on('close', (code) => {
      finished(code);
    });
    job.on('error', (e) => {
      finished(e);
    });
  });
}

async function getStagedFiles() {
  const statusOutput = await runCommand('git', ['status', '-s']);
  return statusOutput
    .split(/\r\n|\n/)
    .map((_item) => {
      let item = _item;
      if (/^[MAR]/.test(item)) {
        item = item.trim();
        if (!item) return null;
        const matched = item.split(/\s+/);
        if (matched) {
          return { type: matched[0], name: matched[matched.length - 1] };
        } else {
          return null;
        }
      } else {
        return null;
      }
    })
    .filter((item) => item && /M|A|R/.test(item.type));
}

module.exports = {
  getStagedFiles,
};
