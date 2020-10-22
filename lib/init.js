const chalk = require('chalk');
const inquirer = require('inquirer');
const os = require('os');
const fs = require('fs');
const ora = require('ora');
const got = require('got');
const shell = require('shelljs');
const dgr = require('download-git-repo');

class Init {
  constructor({ type, project_name }) {
    this.type = 'rebafront';
    this.root_path = project_name;
    this.SYS_TYPE = os.type();
  }

  static log(msg, type = 'cyan') {
    process.stdout.write(chalk[type](msg + ' \n'));
  }

  async getFile(root, info) {
    let target = `${root}/${info.path.replace(this.type, '')}`;
    if (fs.existsSync(target)) {
      return;
    }
    const spinner = ora(`正在下载: ${path}`);
    spinner.start();
    let { body } = await got(info.download_url);
    spinner.succeed();
    // 这里可进行一些文件内容的改写操作 如 if(info.path = 'xxx') body = body.replace(/$[^$]+$/, root)
    fs.writeFileSync(target, body);
  }

  async getContents(conUrl, path) {
    let url = conUrl + path;
    console.log(chalk.blue(this.root_path));
    try {
      const spinner = ora(`正在下载: ${path}`);
      spinner.start();
      let list = await got(url);
      spinner.succeed();
      let targetDir = this.root_path + path.replace(this.type, '');
      // 判断是否存在当前目录，不存在就新建
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
      }
      for (let obj of JSON.parse(list.body)) {
        if (obj.type === 'file') {
          this.getFile(this.root_path, obj);
        } else if (obj.type === 'dir') {
          this.getContents(conUrl, '/' + obj.path);
        }
      }
    } catch (error) {
      console.log(chalk.red(error));
    }
  }

  async download() {}

  // 请求远程模板
  fetchTemp() {
    const baseUrl = 'https://api.github.com';
    const owner = 'zuixinghua';
    const repo = 'rebapro'; // templates
    const conUrl = `${baseUrl}/repos/${owner}/${repo}/contents`;
    this.getContents(conUrl, '/' + this.type);
  }

  // 安装依赖等...
  afterward() {
    if (this.SYS_TYPE && this.SYS_TYPE.toLowerCase().indexOf('window') > 0) {
      // windows
    } else {
      Init.log('开始安装依赖...');
      // shell.exec('npm i --registry=https://registry.npmjs.org/');
    }
  }

  start() {
    try {
      this.fetchTemp();
      // this.afterward();
    } catch (e) {
      Init.log('构建失败.', 'red');
    }
  }
}

module.exports = async function begin() {
  console.log(chalk.yellow('开始构建项目:'));
  const { type } = await inquirer.prompt([
    {
      name: 'type',
      type: 'rawlist',
      message: '请选择项目构建类型(Use arrow keys): ',
      choices: ['web-vue', 'mobile-vue', 'web-react', 'mobile-react'],
    },
  ]);
  const { project_name } = await inquirer.prompt([
    {
      name: 'project_name',
      type: 'input',
      message: '请输入项目名称: ',
      default: type,
    },
  ]);
  const init = new Init({ type, project_name });
  init.start();
};
