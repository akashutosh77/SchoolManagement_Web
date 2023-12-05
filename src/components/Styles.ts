export const Styles = {
  root: {
    position: "relative",
    width: "100%",
    minHeight: 100,
    display: "flex",
    flexDirection: "column",
    alignItem: "stretch",
    "&>*": {
      flexGrow: 1,
    },
  },
  loader: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0px",
    left: "0px",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.7)",
    zIndex: 9999,
    borderRadius: 4,
  },
  confirmationDialog: {
    ".actionContainer": {
      justifyContent: "center",
      button: {
        mx: 1,
      },
    },
    ".titleContainer": {
      color: "text.secondary",
    },
    ".contentContainer": {
      lineHeight: 1.5,
    },
  },
  actionContainer: {
    pb: 6,
    px: 6,
  },
  titleContainer: {
    fontFamily: "InterMed",
    px: 6,
  },
  contentContainer: {
    fontFamily: "InterMed",
    px: 6,
    pb: 5,
    pt: 3,
  },
  closeIcon: {
    cursor: "pointer",
  },
  customButton: {fontFamily: "InterMed"}
};
