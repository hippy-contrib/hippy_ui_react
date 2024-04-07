const mainColor = "rgb(255, 65, 64)";

module.exports = {
  StyleGuide: {
    sidebar: {
      boxShadow: "1px 0 10px #b6aeae",
      backgroundColor: "#fff"
    }
  },
  Logo: {
    logo: {
      height: 44,
      color: mainColor,
      lineHeight: "44px"
    }
  },
  TableOfContents: {
    search: {
      paddingLeft: 0,
      paddingRight: 0
    },
    input: {
      padding: "4px 11px",
      borderWidth: 0,
      outline: "none"
    }
  },
  ComponentsList: {
    isChild: {
      margin: 0,
      paddingRight: 10
    },
    isSelected: {
      color: `${mainColor} !important`,
      fontWeight: "normal !important",
      borderRight: `3px solid ${mainColor}`
    }
  },
  Link: {
    link: {
      display: "block",
      height: "40px !important",
      lineHeight: "40px !important",
      color: "inherit !important"
    }
  },
  Pathline: {
    pathline: {
      fontSize: 16
    }
  },
  Table: {
    table: {
      border: "1px solid #e8e8e8"
    },
    tableHead: {
      color: "#5c6b77",
      backgroundColor: "rgba(0,0,0,0.02)"
    },
    cellHeading: {
      minWidth: "150px",
      padding: 12
    },
    cell: {
      padding: 12,
      borderTop: "1px solid #e8e8e8"
    }
  }
};
