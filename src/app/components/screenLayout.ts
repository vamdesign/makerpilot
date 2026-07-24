/** Shared top offset for all screen titles (PageTitle + ScreenHeader).
 * Keep in sync with CornerPlaneMark (`top-20`) — title text sits just below the plane. */
export const SCREEN_HEADER_TOP = 'pt-20';

export function screenHeaderClassName(extra = '') {
  return `px-6 pb-3 ${SCREEN_HEADER_TOP}${extra ? ` ${extra}` : ''}`;
}
