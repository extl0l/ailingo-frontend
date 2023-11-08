import IconBrokenImage from "../../../assets/icons/broken_image_FILL0_wght400_GRAD0_opsz40.svg";

const ICON_MAP: { [key: string]: string } = {
  chess: "/icons/chess_FILL0_wght400_GRAD0_opsz40.svg",
  "take-off": "/icons/flight_takeoff_FILL0_wght400_GRAD0_opsz40.svg",
  luggage: "/icons/luggage_FILL0_wght400_GRAD0_opsz40.svg",
  clock: "/icons/schedule_FILL0_wght400_GRAD0_opsz40.svg",
  "game-controller": "/icons/sports_esports_FILL0_wght400_GRAD0_opsz40.svg",
  volleyball: "/icons/sports_volleyball_FILL0_wght400_GRAD0_opsz40.svg",
  tactic: "/icons/tactic_FILL0_wght400_GRAD0_opsz40.svg",
  "beach-accessories": "/icons/beach_access_FILL0_wght400_GRAD0_opsz40.svg",
  forest: "/icons/forest_FILL0_wght400_GRAD0_opsz40.svg",
  raven: "/icons/raven_FILL0_wght400_GRAD0_opsz40.svg",
  dog: "/icons/sound_detection_dog_barking_FILL0_wght400_GRAD0_opsz40.svg",
  sun: "/icons/sunny_FILL0_wght400_GRAD0_opsz40.svg",
  water: "/icons/water_drop_FILL0_wght400_GRAD0_opsz40.svg",
};

export const availableIcons = Object.keys(ICON_MAP);

export const getIconPath = (iconName: string): string => {
  const icon = ICON_MAP[iconName];
  return icon ?? IconBrokenImage;
};
