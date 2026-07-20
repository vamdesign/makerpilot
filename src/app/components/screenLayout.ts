/** Shared top offset for screen titles — aligns with CornerPlaneMark at top-20. */
export const SCREEN_HEADER_TOP = 'pt-24';

export function screenHeaderClassName(extra = '') {
  return `px-6 pb-3 ${SCREEN_HEADER_TOP}${extra ? ` ${extra}` : ''}`;
}
