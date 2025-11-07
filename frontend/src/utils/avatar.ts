import { DEFAULT_AVATAR } from "../constants";

/**
 * Get avatar URL with fallback to default avatar
 */
export const getAvatarUrl = (avatar?: string | null): string => {
    return avatar && avatar.trim() !== "" ? avatar : DEFAULT_AVATAR;
};
