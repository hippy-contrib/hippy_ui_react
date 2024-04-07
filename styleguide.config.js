const path = require("path");
const package = require("./packages/hippy_ui_react/package.json");
const webpackConfig = require("./guide/scripts/tsdoc.compile.js");
const styles = require("./guide/scripts/styles");
const theme = require("./guide/scripts/theme");

module.exports = {
  title: "Hippy React UI",
  pagePerSection: true,
  styleguideDir: "docs",
  ignore: ["./README.md"],
  serverPort: 8088,
  sections: [
    {
      name: "介绍",
      content: "./README.md"
    },
    {
      name: "开发贡献",
      content: "./CONTRIBUTING.md",
    },
    {
      name: "全局配置",
      content: "./guide/Provider.md",
    },
    {
      name: "色彩",
      content: "./guide/Color.md"
    },
    {
      name: "组件",
      components: ["./packages/hippy_ui_react/src/components/**/index.tsx"],
      sectionDepth: 1
    },
    {
      name: "业务组件",
      components: ["./packages/hippy_ui_react_business/src/components/**/index.tsx"],
      sectionDepth: 1
    },
  ],
  webpackConfig,
  propsParser: require("react-docgen-typescript").parse,
  require: [path.join(__dirname, "./guide/scripts/global.css"), path.join(__dirname, "./guide/scripts/global.ts")],
  usageMode: "expand",
  styleguideComponents: {
    Wrapper: path.join(__dirname, "./guide/styleguidist/Wrapper/index.js")
  },
  getComponentPathLine: function(componentPath) {
    const dirname = path.dirname(componentPath);
    const componentName = path.basename(dirname);
    const package = dirname.match(/packages\/(\S*)\/src/)[1];
    const packageName = `@hippy/${package}`;
    return `import { ${componentName} } from "${packageName}";`;
  },
  version: package.version,
  theme: theme,
  styles: styles,
  ribbon: {
    url: "https://github.com/hippy-contrib/hippy_ui_react.git",
    text: "Git"
  },
  context: {
    View: "@hippy/react-web/dist/lib/view.js",
    Text: "@hippy/react-web/dist/lib/text.js",
    Image: "@hippy/react-web/dist/lib/image.js",
    ScrollView: "@hippy/react-web/dist/lib/scroll-view.js",
  },
};
