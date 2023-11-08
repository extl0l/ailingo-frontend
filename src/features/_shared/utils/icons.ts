import IconBrokenImage from "../../../assets/icons/broken_image_FILL0_wght400_GRAD0_opsz40.svg";

const ICON_MAP: { [key: string]: string } = {};

export const availableIcons = Object.keys(ICON_MAP);

export const getIconPath = (iconName: string): string => {
  const icon = ICON_MAP[iconName];
  return icon ?? IconBrokenImage;
};
