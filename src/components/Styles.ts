import { styled } from '@mui/material/styles';

export const Styles = {
  root: {
    position: 'relative',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: to dim the background
    zIndex: 9999, // Ensure it overlays everything
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
export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
