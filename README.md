# zxh

Create a project using the command line.

## Usage

```bash
$ npm i zxh
$ zxh init
```

## Boilerplates

- `web-vue` - Create a web application project with vue.
- `mobile-vue ` - Create a mobile application project with vue.
- `web-react ` - Create a web application project with react.
- `mobile-react ` - Create a mobile application project with react.

## Usage Example

```bash
$ npm i zxh
$ zxh init

? 请选择项目构建类型(Use arrow keys):
❯ 1) web-vue
  2) mobile-vue
  3) web-react
  4) mobile-react
  Answer: 1

? 请输入项目名称: (web-vue)

  正在下载模板...
```

## FAQ

### 模板下载失败 RequestError: read ECONNRESET

这个问题基本上都是因为 https://api.github.com/repos/zuixinghua/ ping 不通。

## Questions & Suggestions

Please open an issue [here](https://github.com/zuixinghua/zxh/issues).

## LICENSE

MIT
