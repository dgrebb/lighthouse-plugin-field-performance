const { Audit } = require('lighthouse')
const {
  getLoadingExperience,
  createNotApplicableResult,
  createValueResult,
  createErrorResult,
  isResultsInField,
} = require('../utils/audit-helpers')

module.exports = class FieldFcpOriginAudit extends Audit {
  static get meta() {
    return {
      id: 'field-fcp-origin',
      title: 'First Contentful Paint (FCP)',
      description: '...',
      scoreDisplayMode: 'numeric',
      requiredArtifacts: ['URL', 'settings'],
    }
  }

  /** @param {Object} artifacts @param {Object} context */
  static async audit(artifacts, context) {
    try {
      const ole = await getLoadingExperience(artifacts, context, false)
      if (!isResultsInField(ole)) return createNotApplicableResult(FieldFcpOriginAudit.meta.title)
      return createValueResult(ole.metrics.FIRST_CONTENTFUL_PAINT_MS, 'fcp')
    } catch (err) {
      return createErrorResult(err)
    }
  }
}
