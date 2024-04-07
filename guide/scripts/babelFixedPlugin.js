// 修改PlatformStyle中的fixed定位为absolute定位
module.exports = function({ types: t }) {
  return {
    visitor: {
      NewExpression(path) {
        if (path.node.callee.name === "PlatformStyle") {
          path.traverse({
            ObjectProperty(path) {
              if (path.node.key.name === "position" && path.node.value.value === "fixed") {
                path.node.value.value = "absolute";
              }
            }
          });
        }
      }
    }
  };
};
