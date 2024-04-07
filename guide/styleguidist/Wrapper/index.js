import React, { Component } from "react";
import Provider from "../../../packages/hippy_ui_react/src/provider/Provider";
import Switch from "../../../packages/hippy_ui_react/src/components/Switch/index";
import "./style.css";

export default class Wrapper extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      theme: "light"
    };
  }

  handleThemeChange(isChecked) {
    this.setState({
      theme: isChecked ? "dark" : "light"
    });
  }

  renderPhoneMode() {
    const { theme } = this.state;
    const {children} = this.props;
    let noGlobalView = true;
    if(children._owner && children._owner.pendingProps.code &&
      children._owner.pendingProps.code.indexOf("// providerGlobalView") > -1){
      noGlobalView = false
    }
    return (
      <div className="wrapper">
        <div className={"phone-head"} />
        <div className={"contenter"}>
          <Provider theme={theme} noGlobalView={noGlobalView}>
            <div className={"content"}>
              {children}
            </div>
          </Provider>
        </div>
        <div className={"phone-foot"} />
      </div>
    );
  }
  render() {
    if(this.props.children._owner && this.props.children._owner.pendingProps.code){
      if(this.props.children._owner.pendingProps.code.indexOf("// noExample") > -1){
        return this.props.children;
      } else if(this.props.children._owner.pendingProps.code.indexOf("// preview") > -1){
        return <div>{this.renderPhoneMode()}</div>;
      }
    }
    return (
      <div>
        <div className="header">
          <div className="header-left">
            <Switch
              onChange={isChecked => {
                this.handleThemeChange(isChecked);
              }}
            />
            <div className="mode">切换深色主题</div>
          </div>
        </div>
        {this.renderPhoneMode()}
      </div>
    );
  }
}
