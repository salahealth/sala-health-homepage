export type HospitalEstimatorInputs = {
  annualGrossRevenue: number
  philHealthShareOfRevenue: number
  averageReimbursement: number
  deniedClaimsRate: number
  returnToHospitalRate: number
  filingTimeDays: number
  annualCostOfCapital: number
}

export type HospitalEstimatorOutputs = {
  estimatedAnnualClaims: number
  monthlyClaimValue: number
  annualClaimValue: number
  recoveredRevenue: number
  returnToHospitalCost: number
  daysAccelerated: number
  cashFlowValueFromFasterFiling: number
  totalAnnualValue: number
}

export const DEFAULT_HOSPITAL_ESTIMATOR_INPUTS: HospitalEstimatorInputs = {
  annualGrossRevenue: 800000000,
  philHealthShareOfRevenue: 25,
  averageReimbursement: 18000,
  deniedClaimsRate: 2,
  returnToHospitalRate: 12,
  filingTimeDays: 45,
  annualCostOfCapital: 8,
}

export const HOSPITAL_ESTIMATOR_ASSUMPTIONS = {
  targetFilingTimeDays: 5,
  monthsPerYear: 12,
  daysPerYear: 365,
  deniedClaimRecoveryRate: 1,
} as const

function nonNegative(value: number) {
  return Number.isFinite(value) ? Math.max(value, 0) : 0
}

export function calculateHospitalEstimator(inputs: HospitalEstimatorInputs): HospitalEstimatorOutputs {
  const annualGrossRevenue = nonNegative(inputs.annualGrossRevenue)
  const philHealthShareOfRevenueDecimal = nonNegative(inputs.philHealthShareOfRevenue) / 100
  const averageReimbursement = nonNegative(inputs.averageReimbursement)
  const deniedClaimsRateDecimal = nonNegative(inputs.deniedClaimsRate) / 100
  const returnToHospitalRateDecimal = nonNegative(inputs.returnToHospitalRate) / 100
  const filingTimeDays = nonNegative(inputs.filingTimeDays)
  const annualCostOfCapitalDecimal = nonNegative(inputs.annualCostOfCapital) / 100

  const {
    daysPerYear,
    deniedClaimRecoveryRate,
    monthsPerYear,
    targetFilingTimeDays,
  } = HOSPITAL_ESTIMATOR_ASSUMPTIONS

  const annualClaimValue = annualGrossRevenue * philHealthShareOfRevenueDecimal
  const monthlyClaimValue = annualClaimValue / monthsPerYear
  const estimatedAnnualClaims = averageReimbursement > 0 ? annualClaimValue / averageReimbursement : 0

  const deniedClaimValue = annualClaimValue * deniedClaimsRateDecimal
  const recoveredRevenue = deniedClaimValue * deniedClaimRecoveryRate

  const daysAccelerated = Math.max(filingTimeDays - targetFilingTimeDays, 0)

  const cashFlowValueFromFasterFiling =
    (monthlyClaimValue * annualCostOfCapitalDecimal * daysAccelerated * monthsPerYear) / daysPerYear

  const returnToHospitalCost =
    (annualClaimValue * returnToHospitalRateDecimal * annualCostOfCapitalDecimal * daysAccelerated) / daysPerYear

  const totalAnnualValue = recoveredRevenue + returnToHospitalCost + cashFlowValueFromFasterFiling

  return {
    estimatedAnnualClaims,
    monthlyClaimValue,
    annualClaimValue,
    recoveredRevenue,
    returnToHospitalCost,
    daysAccelerated,
    cashFlowValueFromFasterFiling,
    totalAnnualValue,
  }
}

export function formatPhpCurrency(value: number) {
  const rounded = Math.round(nonNegative(value))
  return `₱${rounded.toLocaleString('en-PH')}`
}
