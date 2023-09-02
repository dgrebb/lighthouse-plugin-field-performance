import Audit from 'lighthouse'
import {
  getLoadingExperience,
  createNotApplicableResult,
  createValueResult,
  createErrorResult,
  isResultsInField,
} from '../utils/audit-helpers'

class FieldClsOriginAudit extends Audit {
  static get meta() {
    return {
      id: 'field-cls-origin',
      title: 'Cumulative Layout Shift (Origin)',
      description:
        'Cumulative Layout Shift (CLS) measures visual stability, and it helps quantify how often users experience unexpected layout shifts. The value is 75th percentile of the origin traffic. [Learn more about CLS](https://web.dev/cls/)',
      scoreDisplayMode: 'numeric',
      requiredArtifacts: ['URL', 'settings'],
    }
  }

  /** @param {Object} artifacts @param {Object} context */
  static async audit(artifacts, context) {
    try {
      const ole = await getLoadingExperience(artifacts, context, false)
      if (!isResultsInField(ole)) return createNotApplicableResult(FieldClsOriginAudit.meta.title)
      return createValueResult(ole.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE, 'cls')
    } catch (err) {
      return createErrorResult(err)
    }
  }
}

export default FieldClsOriginAudit
