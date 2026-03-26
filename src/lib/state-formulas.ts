// LexyAlgo Child Support Calculator — 50 States + DC
// Simplified models based on each state's actual methodology
// Last updated: 2026-03-26

export type ModelType = 'income-shares' | 'percentage-of-income' | 'melson-formula';

export interface IncomeSharesTable {
  /** Combined monthly income thresholds and percentage of income allocated to children */
  brackets: { maxIncome: number; percentages: number[] }[];
}

export interface PercentageOfIncomeRates {
  /** Flat percentage of non-custodial parent's net income by number of children */
  rates: number[];
}

export interface MelsonFormulaParams {
  selfSupportReserve: number;
  primaryNeedsPerChild: number;
  standardOfLivingFactor: number;
}

export interface StateFormula {
  name: string;
  abbreviation: string;
  slug: string;
  emoji: string;
  modelType: ModelType;
  modelLabel: string;
  /** Simplified income shares lookup */
  incomeSharesTable?: IncomeSharesTable;
  /** Percentage of income rates (by # children, index 0 = 1 child) */
  percentageRates?: PercentageOfIncomeRates;
  /** Melson formula parameters */
  melsonParams?: MelsonFormulaParams;
  /** Minimum combined monthly income for guidelines to apply */
  minIncome: number;
  /** Maximum combined monthly income cap (0 = no cap) */
  maxIncomeCap: number;
  /** Custody time adjustment: deviation percentage per overnight shifted */
  overnightAdjustmentRate: number;
  /** Unique notes about this state's formula */
  notes: string[];
  /** Plain English explanation of how the state calculates support */
  howItWorks: string;
  /** Unique deductions or factors */
  uniqueFactors: string[];
}

// ── Income Shares Default Table (used by most states with state-specific adjustments) ──
// Percentages by number of children (1-6) at various combined income levels
// These are SIMPLIFIED approximations of actual guideline tables

function makeIncomeSharesState(
  overrides: Partial<StateFormula> & Pick<StateFormula, 'name' | 'abbreviation' | 'slug' | 'emoji' | 'howItWorks'>
): StateFormula {
  return {
    modelType: 'income-shares',
    modelLabel: 'Income Shares Model',
    incomeSharesTable: defaultIncomeSharesTable,
    minIncome: 1100,
    maxIncomeCap: 30000,
    overnightAdjustmentRate: 0.0003,
    notes: [],
    uniqueFactors: [],
    ...overrides,
  };
}

function makePercentageState(
  overrides: Partial<StateFormula> & Pick<StateFormula, 'name' | 'abbreviation' | 'slug' | 'emoji' | 'howItWorks' | 'percentageRates'>
): StateFormula {
  return {
    modelType: 'percentage-of-income',
    modelLabel: 'Percentage of Income Model',
    minIncome: 1100,
    maxIncomeCap: 0,
    overnightAdjustmentRate: 0.0003,
    notes: [],
    uniqueFactors: [],
    ...overrides,
  };
}

function makeMelsonState(
  overrides: Partial<StateFormula> & Pick<StateFormula, 'name' | 'abbreviation' | 'slug' | 'emoji' | 'howItWorks' | 'melsonParams'>
): StateFormula {
  return {
    modelType: 'melson-formula',
    modelLabel: 'Melson Formula',
    minIncome: 1100,
    maxIncomeCap: 0,
    overnightAdjustmentRate: 0.0003,
    notes: [],
    uniqueFactors: [],
    ...overrides,
  };
}

const defaultIncomeSharesTable: IncomeSharesTable = {
  brackets: [
    { maxIncome: 2000,  percentages: [0.20, 0.28, 0.33, 0.37, 0.40, 0.43] },
    { maxIncome: 4000,  percentages: [0.19, 0.27, 0.32, 0.36, 0.39, 0.42] },
    { maxIncome: 6000,  percentages: [0.18, 0.26, 0.31, 0.35, 0.38, 0.41] },
    { maxIncome: 8000,  percentages: [0.17, 0.25, 0.30, 0.34, 0.37, 0.40] },
    { maxIncome: 10000, percentages: [0.16, 0.24, 0.29, 0.33, 0.36, 0.39] },
    { maxIncome: 15000, percentages: [0.15, 0.23, 0.28, 0.32, 0.35, 0.38] },
    { maxIncome: 20000, percentages: [0.14, 0.22, 0.27, 0.31, 0.34, 0.37] },
    { maxIncome: 30000, percentages: [0.13, 0.21, 0.26, 0.30, 0.33, 0.36] },
  ],
};

// ── All 50 States + DC ──

export const STATE_FORMULAS: Record<string, StateFormula> = {
  alabama: makeIncomeSharesState({
    name: 'Alabama', abbreviation: 'AL', slug: 'alabama', emoji: '🏈',
    howItWorks: 'Alabama uses the Income Shares model. Both parents\' gross incomes are combined, then a table determines what percentage should go toward supporting the children. Each parent pays their proportional share of that amount based on their percentage of the combined income. Custody time and childcare/insurance costs are factored in.',
    notes: ['Uses Rule 32 guidelines', 'Health insurance added as additional expense'],
    uniqueFactors: ['Pre-existing child support obligations deducted', 'Self-employment income includes gross receipts minus ordinary expenses'],
  }),

  alaska: makeIncomeSharesState({
    name: 'Alaska', abbreviation: 'AK', slug: 'alaska', emoji: '🏔️',
    howItWorks: 'Alaska uses the Income Shares model with Civil Rule 90.3. Both parents\' adjusted incomes are combined. Alaska applies percentages based on the non-custodial parent\'s income: 20% for one child, 27% for two, 33% for three. Shared custody adjustments apply when the non-custodial parent has 30%+ overnights.',
    notes: ['Civil Rule 90.3', 'Permanent Fund Dividend is counted as income'],
    uniqueFactors: ['PFD dividends count as income', 'Cost of living adjustments for remote areas'],
    maxIncomeCap: 0,
  }),

  arizona: makeIncomeSharesState({
    name: 'Arizona', abbreviation: 'AZ', slug: 'arizona', emoji: '🌵',
    howItWorks: 'Arizona uses the Income Shares model. Both parents\' gross incomes are combined and run through a schedule to determine the basic child support obligation. Each parent pays their pro-rata share. Parenting time adjustments kick in when the non-custodial parent has more than 93 overnights per year.',
    notes: ['Updated guidelines effective 2022', 'Parenting time adjustment above 93 overnights/year'],
    uniqueFactors: ['Education expenses can be added', 'Extraordinary child expenses considered'],
  }),

  arkansas: makeIncomeSharesState({
    name: 'Arkansas', abbreviation: 'AR', slug: 'arkansas', emoji: '💎',
    howItWorks: 'Arkansas uses the Income Shares model based on the Revised Family Support Chart. Both parents\' net incomes are combined to determine total support obligation, then divided proportionally. Arkansas considers after-tax income rather than gross.',
    notes: ['Uses Family Support Chart', 'Based on net (after-tax) income'],
    uniqueFactors: ['Net income used instead of gross', 'Existing support obligations deducted first'],
  }),

  california: makeIncomeSharesState({
    name: 'California', abbreviation: 'CA', slug: 'california', emoji: '☀️',
    howItWorks: 'California uses a complex algebraic Income Shares formula (CA Family Code §4055). It factors in both parents\' net disposable incomes, the time each parent spends with the children, and the tax filing status. The formula is: CS = K[HN − (H%)(TN)] where K accounts for time share and combined income allocation.',
    notes: ['Uses algebraic formula (§4055)', 'DissoMaster is the standard software', 'Statewide uniform guideline'],
    uniqueFactors: ['Tax filing status matters', 'New spouse income generally excluded', 'Hardship deductions available'],
    maxIncomeCap: 0,
  }),

  colorado: makeIncomeSharesState({
    name: 'Colorado', abbreviation: 'CO', slug: 'colorado', emoji: '⛰️',
    howItWorks: 'Colorado uses the Income Shares model with an adjusted gross income approach. Combined adjusted gross income determines the basic obligation from a schedule. Each parent\'s share is proportional to their income. A parenting time adjustment applies based on overnights.',
    notes: ['Updated schedule effective 2022', '10% low-income adjustment available'],
    uniqueFactors: ['Maintenance (alimony) affects income calculation', 'Extraordinary medical expenses shared proportionally'],
  }),

  connecticut: makeIncomeSharesState({
    name: 'Connecticut', abbreviation: 'CT', slug: 'connecticut', emoji: '🦞',
    howItWorks: 'Connecticut uses the Income Shares model with the Child Support and Arrearage Guidelines. Both parents\' net weekly incomes are combined and matched to a schedule. The basic obligation is split proportionally. Connecticut uses net (after-tax) income and provides shared custody deviations.',
    notes: ['Uses net weekly income', 'Guidelines updated 2023', 'Deviation criteria in §46b-215a-3'],
    uniqueFactors: ['Net income (after taxes, union dues, mandatory retirement)', 'Shared physical custody deviation available', 'Prior child support orders deducted'],
    maxIncomeCap: 20000,
  }),

  delaware: makeMelsonState({
    name: 'Delaware', abbreviation: 'DE', slug: 'delaware', emoji: '🏛️',
    howItWorks: 'Delaware uses the Melson Formula — one of only three states using this model. It first ensures each parent retains a self-support reserve (basic living needs). Then it calculates children\'s primary needs. If income remains after both, a Standard of Living Adjustment (SOLA) allocates additional support based on remaining income.',
    melsonParams: { selfSupportReserve: 1350, primaryNeedsPerChild: 560, standardOfLivingFactor: 0.12 },
    notes: ['One of three Melson Formula states', 'Three-step calculation: self-support → primary needs → SOLA'],
    uniqueFactors: ['Self-support reserve ensures parent can meet basic needs', 'SOLA gives children share of higher standard of living', 'Child care and health insurance added separately'],
  }),

  dc: makeIncomeSharesState({
    name: 'District of Columbia', abbreviation: 'DC', slug: 'dc', emoji: '🏛️',
    howItWorks: 'DC uses the Income Shares model. Both parents\' gross incomes are combined to determine the basic support obligation from a schedule. Each parent pays their proportional share. Work-related childcare and health insurance premiums are added to the basic obligation.',
    notes: ['Guideline schedule covers income up to $30,000/month combined'],
    uniqueFactors: ['Imputed income for voluntarily unemployed parents', 'Government employee benefits counted'],
  }),

  florida: makeIncomeSharesState({
    name: 'Florida', abbreviation: 'FL', slug: 'florida', emoji: '🌴',
    howItWorks: 'Florida uses the Income Shares model under §61.30. Both parents\' net incomes are combined to find the basic obligation. Each parent\'s share is proportional. Florida provides significant adjustments for substantial timesharing (over 73 overnights), reducing the obligation by up to 50%.',
    notes: ['Net income used', 'Substantial timesharing adjustment at 73+ overnights', '§61.30 guidelines'],
    uniqueFactors: ['Timesharing significantly reduces obligation', 'Public benefits excluded from income', 'Business income includes draws and distributions'],
  }),

  georgia: makeIncomeSharesState({
    name: 'Georgia', abbreviation: 'GA', slug: 'georgia', emoji: '🍑',
    howItWorks: 'Georgia uses the Income Shares model with an extensive Basic Child Support Obligation table. Combined adjusted gross income determines the base obligation. Deviations are available for travel expenses, parenting time over 20%, and high/low income situations.',
    notes: ['Detailed BCSO table', 'Deviation available for high-income parents above $30,000/month'],
    uniqueFactors: ['Nonspecific deviations for parenting time over standard', 'Health insurance premiums added separately', 'Extraordinary educational expenses considered'],
  }),

  hawaii: makeMelsonState({
    name: 'Hawaii', abbreviation: 'HI', slug: 'hawaii', emoji: '🌺',
    howItWorks: 'Hawaii uses the Melson Formula. Like Delaware, it first ensures each parent has enough for their own basic needs (self-support reserve). Then children\'s primary support needs are calculated. Finally, a Standard of Living Adjustment shares remaining income to give children the benefit of higher parental income.',
    melsonParams: { selfSupportReserve: 1500, primaryNeedsPerChild: 620, standardOfLivingFactor: 0.15 },
    notes: ['Melson Formula state', 'Higher cost of living reflected in reserves', 'Updated 2023'],
    uniqueFactors: ['Military housing allowances counted as income', 'Higher self-support reserve than mainland Melson states'],
  }),

  idaho: makeIncomeSharesState({
    name: 'Idaho', abbreviation: 'ID', slug: 'idaho', emoji: '🥔',
    howItWorks: 'Idaho uses the Income Shares model. Both parents\' gross incomes are combined to determine the basic support obligation. The obligation is split proportionally. Idaho provides credit for extended time (over 25% overnights) and adds childcare and insurance as separate line items.',
    notes: ['Guidelines in Idaho Rules of Civil Procedure Rule 126'],
    uniqueFactors: ['Extended time credit at 25%+ overnights', 'Tax exemption allocation considered'],
  }),

  illinois: makeIncomeSharesState({
    name: 'Illinois', abbreviation: 'IL', slug: 'illinois', emoji: '🏙️',
    howItWorks: 'Illinois switched to the Income Shares model in 2017. Both parents\' net incomes are combined using standardized tax tables. The combined obligation from the schedule is split proportionally. Shared parenting time (146+ overnights) triggers a different calculation with a 1.5× multiplier.',
    notes: ['Switched from Percentage to Income Shares in 2017', 'Shared parenting at 146+ overnights uses 1.5× multiplier'],
    uniqueFactors: ['Standardized net income using statutory tax tables', 'Maintenance (alimony) deducted from payor, added to recipient'],
  }),

  indiana: makeIncomeSharesState({
    name: 'Indiana', abbreviation: 'IN', slug: 'indiana', emoji: '🏎️',
    howItWorks: 'Indiana uses the Income Shares model under Rule 31. Both parents\' weekly gross incomes are combined. The Indiana Child Support Schedule determines the basic obligation. Each parent pays their proportional share. Parenting time credit applies when the non-custodial parent has 52+ overnights annually.',
    notes: ['Rule 31 guidelines', 'Uses weekly income calculations', 'Parenting time credit at 52+ overnights'],
    uniqueFactors: ['Controlled expenses concept for parenting time credit', 'Child\'s extraordinary expenses shared proportionally'],
  }),

  iowa: makeIncomeSharesState({
    name: 'Iowa', abbreviation: 'IA', slug: 'iowa', emoji: '🌽',
    howItWorks: 'Iowa uses the Income Shares model. Both parents\' net monthly incomes are combined and matched to the Iowa Schedule of Basic Support. The obligation is divided proportionally. Iowa provides a credit for health insurance premiums and work-related childcare paid by either parent.',
    notes: ['Net income after taxes', 'Updated schedule in 2023'],
    uniqueFactors: ['Qualified additional dependents may reduce income', 'Health insurance premium credit for the paying parent'],
  }),

  kansas: makeIncomeSharesState({
    name: 'Kansas', abbreviation: 'KS', slug: 'kansas', emoji: '🌻',
    howItWorks: 'Kansas uses the Income Shares model under Kansas Supreme Court Administrative Order 128. Both parents\' gross incomes (with adjustments) are combined. The Child Support Schedule sets the basic obligation. A parenting time adjustment of 10% applies when the non-custodial parent has 35%+ time.',
    notes: ['Administrative Order 128', 'Domestic gross income concept'],
    uniqueFactors: ['Domestic gross income includes most sources', 'Extended parenting time adjustment at 35%+'],
  }),

  kentucky: makeIncomeSharesState({
    name: 'Kentucky', abbreviation: 'KY', slug: 'kentucky', emoji: '🐎',
    howItWorks: 'Kentucky uses the Income Shares model. Both parents\' combined adjusted gross monthly incomes determine the basic obligation from a schedule. Each parent is responsible for their proportional share. Childcare, health insurance, and extraordinary medical expenses are added as extra items.',
    notes: ['KRS 403.212 guidelines'],
    uniqueFactors: ['Self-employment tax deducted from gross', 'Split custody handled with separate calculations for each child'],
  }),

  louisiana: makeIncomeSharesState({
    name: 'Louisiana', abbreviation: 'LA', slug: 'louisiana', emoji: '⚜️',
    howItWorks: 'Louisiana uses the Income Shares model. Both parents\' adjusted gross incomes are combined, and the schedule provides the total obligation. Extraordinary expenses (medical, educational) and childcare are added. Each parent pays proportionally. Shared custody adjustments apply at 73+ days per year.',
    notes: ['Based on net income after certain deductions', 'Shared custody at 73+ days/year'],
    uniqueFactors: ['Extraordinary community expenses considered', 'Insurance premium sharing is separate'],
  }),

  maine: makeIncomeSharesState({
    name: 'Maine', abbreviation: 'ME', slug: 'maine', emoji: '🦞',
    howItWorks: 'Maine uses the Income Shares model under 19-A M.R.S. §2006. Both parents\' gross incomes minus certain deductions give adjusted gross income. The combined amount determines the basic obligation. Shared parenting adjustments apply when each parent has at least 30% of overnights.',
    notes: ['19-A M.R.S. §2006', 'Shared parenting threshold at 30% overnights'],
    uniqueFactors: ['Self-support reserve ensures minimum retained income', 'Cost of transportation for visitation may be considered'],
  }),

  maryland: makeIncomeSharesState({
    name: 'Maryland', abbreviation: 'MD', slug: 'maryland', emoji: '🦀',
    howItWorks: 'Maryland uses the Income Shares model. Both parents\' actual monthly incomes are combined to find the basic obligation from the guidelines schedule. Each parent pays proportionally. Maryland adds work-related childcare and extraordinary medical expenses. A shared physical custody adjustment applies at 128+ overnights.',
    notes: ['FL §12-204 guidelines', 'Shared custody adjustment at 128+ overnights (35%)'],
    uniqueFactors: ['Actual income used (not imputed unless appropriate)', 'Alimony adjusts income before calculation'],
  }),

  massachusetts: makeIncomeSharesState({
    name: 'Massachusetts', abbreviation: 'MA', slug: 'massachusetts', emoji: '🎓',
    howItWorks: 'Massachusetts uses the Income Shares model based on 2021 updated guidelines. Both parents\' gross incomes minus certain deductions yield available income. The combined amount is matched to a support table. Parenting time adjustments apply when the payor has one-third or more overnight responsibility.',
    notes: ['2021 updated guidelines', 'Minimum and maximum support floors'],
    uniqueFactors: ['Child over 18 in college may still receive support', 'Minimum $25/week support order'],
  }),

  michigan: makeIncomeSharesState({
    name: 'Michigan', abbreviation: 'MI', slug: 'michigan', emoji: '🚗',
    howItWorks: 'Michigan uses the Income Shares model with the Michigan Child Support Formula. Both parents\' net incomes are used. The formula calculates base support, then adjusts for overnights using a complex parenting time offset. Medical, childcare, and educational expenses are added separately.',
    notes: ['Michigan Child Support Formula (MCSF)', 'Net income after taxes'],
    uniqueFactors: ['Detailed parenting time offset formula', 'Health care obligation separate from base support'],
  }),

  minnesota: makeIncomeSharesState({
    name: 'Minnesota', abbreviation: 'MN', slug: 'minnesota', emoji: '🏒',
    howItWorks: 'Minnesota uses the Income Shares model under Minn. Stat. §518A. Both parents\' gross incomes minus certain deductions determine Parental Income for Determining Child Support (PICS). The guidelines table sets the basic obligation. A parenting expense adjustment applies based on the percentage of parenting time.',
    notes: ['PICS (Parental Income for Child Support) concept', 'Parenting expense adjustment is continuous, not threshold-based'],
    uniqueFactors: ['Social Security benefits received by child credited', 'Nonjoint children adjustment available'],
  }),

  mississippi: makePercentageState({
    name: 'Mississippi', abbreviation: 'MS', slug: 'mississippi', emoji: '🎸',
    howItWorks: 'Mississippi uses the Percentage of Income model (recently adopted Income Shares effective 2024, but simplified percentage still commonly applied). Support is calculated as a flat percentage of the non-custodial parent\'s adjusted gross income: 14% for one child, 20% for two, 22% for three, up to 26% for five or more.',
    percentageRates: { rates: [0.14, 0.20, 0.22, 0.24, 0.26, 0.26] },
    notes: ['Transitioning to Income Shares model', 'Historical percentage model still widely applied'],
    uniqueFactors: ['Adjusted gross income basis', 'Court may deviate for special circumstances'],
  }),

  missouri: makeIncomeSharesState({
    name: 'Missouri', abbreviation: 'MO', slug: 'missouri', emoji: '🌉',
    howItWorks: 'Missouri uses the Income Shares model under Supreme Court Rule 88.01. Both parents\' gross monthly incomes are adjusted and combined. The Schedule of Basic Child Support Obligations determines the total amount. A Line 11 adjustment provides credit for overnight custody time exceeding 36% (132 overnights).',
    notes: ['Rule 88.01 Form 14', 'Line 11 custody adjustment at 132+ overnights'],
    uniqueFactors: ['Line 11 parenting time adjustment is unique to Missouri', 'Prior-born child obligations deducted'],
  }),

  montana: makeMelsonState({
    name: 'Montana', abbreviation: 'MT', slug: 'montana', emoji: '🦌',
    howItWorks: 'Montana uses a modified Melson Formula. First, each parent\'s income is reduced by a self-support allowance to ensure basic needs are met. Then, children\'s primary needs are calculated based on the number and ages of children. Finally, any remaining income is shared via a Standard of Living Adjustment.',
    melsonParams: { selfSupportReserve: 1250, primaryNeedsPerChild: 500, standardOfLivingFactor: 0.10 },
    notes: ['Modified Melson Formula', 'ARM 37.62.106 guidelines'],
    uniqueFactors: ['Age of children affects primary needs calculation', 'Self-support amount adjusted periodically'],
  }),

  nebraska: makeIncomeSharesState({
    name: 'Nebraska', abbreviation: 'NE', slug: 'nebraska', emoji: '🌾',
    howItWorks: 'Nebraska uses the Income Shares model. Both parents\' monthly gross incomes are combined to find the total child support obligation from the Nebraska Child Support Guidelines schedule. Each parent pays their proportional share. A joint physical custody worksheet applies when each parent has at least 142 overnights.',
    notes: ['Joint physical custody at 142+ overnights each', 'Separate worksheets for sole vs joint custody'],
    uniqueFactors: ['Separate calculation worksheets for different custody arrangements', 'Retirement contributions may be deducted'],
  }),

  nevada: makeIncomeSharesState({
    name: 'Nevada', abbreviation: 'NV', slug: 'nevada', emoji: '🎰',
    howItWorks: 'Nevada uses a hybrid approach often classified as Percentage of Income but with Income Shares characteristics. The non-custodial parent pays a percentage of gross monthly income: 18% for one child, 25% for two, 29% for three, 31% for four, with a statutory cap and minimum.',
    notes: ['Hybrid model with percentage-based structure', 'Statutory minimum of $100/month', 'Cap at $1,339/month per child unless deviation'],
    uniqueFactors: ['Monthly cap on support per child', 'Statutory minimum support amount'],
    incomeSharesTable: {
      brackets: [
        { maxIncome: 4000,  percentages: [0.18, 0.25, 0.29, 0.31, 0.33, 0.35] },
        { maxIncome: 8000,  percentages: [0.18, 0.25, 0.29, 0.31, 0.33, 0.35] },
        { maxIncome: 15000, percentages: [0.18, 0.25, 0.29, 0.31, 0.33, 0.35] },
        { maxIncome: 30000, percentages: [0.16, 0.23, 0.27, 0.29, 0.31, 0.33] },
      ],
    },
  }),

  'new-hampshire': makeIncomeSharesState({
    name: 'New Hampshire', abbreviation: 'NH', slug: 'new-hampshire', emoji: '🏔️',
    howItWorks: 'New Hampshire uses the Income Shares model under RSA 458-C. Both parents\' adjusted gross incomes are combined to determine the support obligation from the percentage formula. A self-support reserve ensures the obligor retains enough for basic needs. Shared custody adjustments apply at 50%+ time.',
    notes: ['RSA 458-C', 'Formula-based rather than table-based', 'Self-support reserve of 115% of poverty'],
    uniqueFactors: ['Formula uses percentage of combined income (not table lookup)', 'Self-support reserve at 115% of federal poverty level'],
  }),

  'new-jersey': makeIncomeSharesState({
    name: 'New Jersey', abbreviation: 'NJ', slug: 'new-jersey', emoji: '🏖️',
    howItWorks: 'New Jersey uses the Income Shares model with detailed Appendix IX guidelines. Both parents\' net incomes (after taxes and mandatory deductions) are combined. The NJ Sole/Shared Parenting Worksheet calculates the obligation. Shared parenting adjustments apply when each parent has at least 28% of overnights (at least 104 overnights).',
    notes: ['Appendix IX guidelines', 'Net income basis', 'Shared parenting at 104+ overnights (28%)'],
    uniqueFactors: ['Government benefits for child may offset obligation', 'Detailed transportation expense sharing'],
  }),

  'new-mexico': makeIncomeSharesState({
    name: 'New Mexico', abbreviation: 'NM', slug: 'new-mexico', emoji: '🌶️',
    howItWorks: 'New Mexico uses the Income Shares model. Both parents\' gross monthly incomes are combined to determine the basic obligation from the Schedule of Basic Support Obligations. Shared responsibility adjustments apply when the non-custodial parent has 35%+ time (128+ overnights).',
    notes: ['NMSA §40-4-11.1', '35% shared responsibility threshold'],
    uniqueFactors: ['Shared responsibility adjustment at 35%+ time', 'Extraordinary uninsured medical expenses shared'],
  }),

  'new-york': makeIncomeSharesState({
    name: 'New York', abbreviation: 'NY', slug: 'new-york', emoji: '🗽',
    howItWorks: 'New York uses the Income Shares model under the Child Support Standards Act (CSSA). Both parents\' combined income up to the statutory cap (currently $163,000/year) is multiplied by a flat percentage: 17% for one child, 25% for two, 29% for three, 31% for four, 35% for five+. Each parent pays their proportional share. Above the cap, the court has discretion.',
    notes: ['CSSA (Child Support Standards Act)', 'Income cap of $163,000/year combined (updated periodically)', 'Flat percentage × combined income up to cap'],
    uniqueFactors: ['Statutory income cap — court discretion above cap', 'FICA and NYC/Yonkers taxes deducted from gross', 'Low-income exemptions available'],
    maxIncomeCap: 13584, // $163,000/year ÷ 12
    incomeSharesTable: {
      brackets: [
        { maxIncome: 13584, percentages: [0.17, 0.25, 0.29, 0.31, 0.35, 0.35] },
        { maxIncome: 30000, percentages: [0.17, 0.25, 0.29, 0.31, 0.35, 0.35] },
      ],
    },
  }),

  'north-carolina': makeIncomeSharesState({
    name: 'North Carolina', abbreviation: 'NC', slug: 'north-carolina', emoji: '🌲',
    howItWorks: 'North Carolina uses the Income Shares model. Both parents\' adjusted gross monthly incomes are combined and matched to a guidelines schedule. The basic obligation is shared proportionally. NC provides three worksheets: A (sole custody), B (joint custody at 123+ overnights), and C (split custody).',
    notes: ['Three separate worksheets for different custody arrangements', 'Joint custody threshold at 123 overnights (33.7%)'],
    uniqueFactors: ['Worksheet A/B/C system', 'Pre-existing support obligations deducted', 'Extraordinary expenses (medical, school) shared proportionally'],
  }),

  'north-dakota': makeIncomeSharesState({
    name: 'North Dakota', abbreviation: 'ND', slug: 'north-dakota', emoji: '🦬',
    howItWorks: 'North Dakota uses the Income Shares model under NDCC §14-09-09.7. Both parents\' net incomes are combined. The child support guidelines schedule determines the total obligation, which is split proportionally. Extended time adjustments apply when the obligor has more than 10% of the time.',
    notes: ['NDCC §14-09-09.7', 'Net income basis'],
    uniqueFactors: ['Net income after taxes and mandatory deductions', 'Extended time credit based on proportion of overnights'],
  }),

  ohio: makeIncomeSharesState({
    name: 'Ohio', abbreviation: 'OH', slug: 'ohio', emoji: '🏈',
    howItWorks: 'Ohio uses the Income Shares model under ORC §3119. Both parents\' gross annual incomes are combined and matched to a Basic Child Support Schedule. The obligation is shared proportionally. A 10% adjustment applies for extended parenting time (90+ overnights). Cash medical support is added separately.',
    notes: ['ORC §3119', 'Uses annual income schedule', 'Extended parenting time credit at 90+ overnights'],
    uniqueFactors: ['Annual income basis (converted to monthly)', 'Cash medical support obligation added', 'Self-employment income adjusted for actual expenses'],
  }),

  oklahoma: makeIncomeSharesState({
    name: 'Oklahoma', abbreviation: 'OK', slug: 'oklahoma', emoji: '🌪️',
    howItWorks: 'Oklahoma uses the Income Shares model under 43 O.S. §119. Both parents\' gross monthly incomes are combined to determine the basic obligation from the Child Support Guideline Schedule. Shared parenting adjustments apply when the non-custodial parent has at least 121 overnights per year.',
    notes: ['43 O.S. §119', 'Shared parenting at 121+ overnights'],
    uniqueFactors: ['Fringe benefits counted as income', 'Shared parenting threshold at 121 overnights'],
  }),

  oregon: makeIncomeSharesState({
    name: 'Oregon', abbreviation: 'OR', slug: 'oregon', emoji: '🌲',
    howItWorks: 'Oregon uses the Income Shares model with OAR 137-050 guidelines. Both parents\' gross cash incomes are combined. The basic obligation from the guidelines is split proportionally. A parenting time credit applies when the non-custodial parent has 25%+ of overnights (92+ overnights per year).',
    notes: ['OAR 137-050 guidelines', 'Parenting time credit at 25%+ overnights'],
    uniqueFactors: ['Cash income concept — non-cash benefits generally excluded', 'Spousal support adjusts income'],
  }),

  pennsylvania: makeIncomeSharesState({
    name: 'Pennsylvania', abbreviation: 'PA', slug: 'pennsylvania', emoji: '🔔',
    howItWorks: 'Pennsylvania uses the Income Shares model under Pa.R.C.P. 1910. Both parents\' monthly net incomes are combined. The basic obligation comes from the guidelines schedule. Each parent pays proportionally. A substantial custody reduction applies when a parent has 40%+ of overnights.',
    notes: ['Pa.R.C.P. 1910', 'Net income after taxes', 'Substantial custody at 40%+ overnights'],
    uniqueFactors: ['Net income basis', 'Mortgage deduction from income in some cases', 'Earning capacity may be imputed'],
  }),

  'rhode-island': makeIncomeSharesState({
    name: 'Rhode Island', abbreviation: 'RI', slug: 'rhode-island', emoji: '⛵',
    howItWorks: 'Rhode Island uses the Income Shares model under the Family Court Administrative Order. Both parents\' gross incomes are combined. The child support guidelines schedule determines the obligation, split proportionally. Shared placement adjustments apply for 30%+ parenting time.',
    notes: ['Family Court Administrative Order guidelines', 'Shared placement at 30%+ parenting time'],
    uniqueFactors: ['Gross income basis with limited deductions', 'Court retains broad discretion for deviation'],
  }),

  'south-carolina': makeIncomeSharesState({
    name: 'South Carolina', abbreviation: 'SC', slug: 'south-carolina', emoji: '🌙',
    howItWorks: 'South Carolina uses the Income Shares model under the SC Child Support Guidelines. Both parents\' monthly gross incomes are combined to determine the basic obligation. Each parent pays their proportional share. A shared custody adjustment applies when each parent has the child at least 109 overnights.',
    notes: ['SC Child Support Guidelines (2014, updated)', 'Shared custody at 109+ overnights each'],
    uniqueFactors: ['Self-support reserve of $875/month', 'Prior-born children obligations deducted'],
  }),

  'south-dakota': makeIncomeSharesState({
    name: 'South Dakota', abbreviation: 'SD', slug: 'south-dakota', emoji: '🗻',
    howItWorks: 'South Dakota uses the Income Shares model. Both parents\' net monthly incomes are combined. The obligation is determined from the guidelines schedule and split proportionally. A credit for extended visitation applies when the non-custodial parent has the child for 10+ consecutive days.',
    notes: ['SDCL §25-7-6.2', 'Net income after taxes'],
    uniqueFactors: ['Net income basis', 'Extended visitation credit for 10+ consecutive days'],
  }),

  tennessee: makeIncomeSharesState({
    name: 'Tennessee', abbreviation: 'TN', slug: 'tennessee', emoji: '🎵',
    howItWorks: 'Tennessee uses the Income Shares model under the Tennessee Child Support Guidelines. Both parents\' adjusted gross incomes are combined. The basic obligation comes from a schedule and is split proportionally. A variable standard of living adjustment (VASLA) applies in certain cases. Parenting time adjustments apply at 92+ days.',
    notes: ['Tennessee Child Support Guidelines', 'VASLA (Variable Standard of Living Adjustment)'],
    uniqueFactors: ['VASLA adjusts for disparate income', 'Parenting time adjustment at 92+ days/year'],
  }),

  texas: makePercentageState({
    name: 'Texas', abbreviation: 'TX', slug: 'texas', emoji: '🤠',
    howItWorks: 'Texas uses the Percentage of Income model — one of the simplest in the nation. Support is calculated as a flat percentage of the non-custodial parent\'s net monthly resources: 20% for one child, 25% for two, 30% for three, 35% for four, 40% for five, not less than the percentage for five children for six or more. A statutory cap applies to the first $9,200/month of net resources.',
    percentageRates: { rates: [0.20, 0.25, 0.30, 0.35, 0.40, 0.40] },
    notes: ['TX Family Code §154.125-126', 'Cap at $9,200/month net resources (updated biennially)', 'One of the simplest models'],
    uniqueFactors: ['Net resources cap (updated every 6 years)', 'Only non-custodial parent\'s income used', 'Multiple family adjustment reduces percentages'],
    maxIncomeCap: 9200,
  }),

  utah: makeIncomeSharesState({
    name: 'Utah', abbreviation: 'UT', slug: 'utah', emoji: '🏜️',
    howItWorks: 'Utah uses the Income Shares model under UCA §78B-12. Both parents\' adjusted gross monthly incomes are combined. Utah\'s guidelines table provides the basic obligation. Each parent pays proportionally. A credit applies for 110+ overnights per year of parenting time.',
    notes: ['UCA §78B-12', 'Base combined support table', 'Credit at 110+ overnights'],
    uniqueFactors: ['Split custody handled with separate calculations', 'Joint physical custody adjustment at 110+ overnights'],
  }),

  vermont: makeIncomeSharesState({
    name: 'Vermont', abbreviation: 'VT', slug: 'vermont', emoji: '🍁',
    howItWorks: 'Vermont uses the Income Shares model under 15 V.S.A. §656. Both parents\' available incomes (gross minus taxes and certain deductions) are combined. The guidelines percentage determines the basic obligation, split proportionally. Shared physical responsibility adjustments apply when each parent has at least 30% of overnights.',
    notes: ['15 V.S.A. §656', 'Available income (after-tax) basis', 'Shared responsibility at 30%+ overnights'],
    uniqueFactors: ['Available income = gross minus taxes', 'Self-support reserve at federal poverty level'],
  }),

  virginia: makeIncomeSharesState({
    name: 'Virginia', abbreviation: 'VA', slug: 'virginia', emoji: '🏛️',
    howItWorks: 'Virginia uses the Income Shares model under VA Code §20-108.2. Both parents\' gross monthly incomes are combined. The guidelines schedule determines the basic obligation, split proportionally. Shared custody adjustments apply when each parent has the child for at least 91 days per year.',
    notes: ['VA Code §20-108.2', 'Shared custody at 91+ days each per year'],
    uniqueFactors: ['Imputed income for voluntarily unemployed', 'Spousal support received counted as income'],
  }),

  washington: makeIncomeSharesState({
    name: 'Washington', abbreviation: 'WA', slug: 'washington', emoji: '🌧️',
    howItWorks: 'Washington uses the Income Shares model under RCW 26.19. Both parents\' combined net monthly incomes determine the basic obligation from the Economic Table. Each parent pays their proportional share. A residential schedule credit applies based on the percentage of time the child spends with each parent.',
    notes: ['RCW 26.19', 'Economic Table approach', 'Net income after taxes'],
    uniqueFactors: ['Economic Table covers incomes up to $12,000/month combined', 'Whole family formula for multiple families'],
  }),

  'west-virginia': makeIncomeSharesState({
    name: 'West Virginia', abbreviation: 'WV', slug: 'west-virginia', emoji: '⛏️',
    howItWorks: 'West Virginia uses the Income Shares model under W. Va. Code §48-13. Both parents\' adjusted gross incomes are combined. The child support schedule determines the total obligation, split proportionally. A shared custody formula applies when each parent has at least 35% of time (128 overnights).',
    notes: ['W. Va. Code §48-13', 'Shared custody at 35%+ time'],
    uniqueFactors: ['Income from all sources included', 'Shared custody threshold at 128 overnights'],
  }),

  wisconsin: makePercentageState({
    name: 'Wisconsin', abbreviation: 'WI', slug: 'wisconsin', emoji: '🧀',
    howItWorks: 'Wisconsin uses the Percentage of Income model. Support is calculated as a flat percentage of the non-custodial parent\'s gross income: 17% for one child, 25% for two, 29% for three, 31% for four, 34% for five or more. Shared placement (25%+ overnights) uses a more complex formula considering both parents\' incomes.',
    percentageRates: { rates: [0.17, 0.25, 0.29, 0.31, 0.34, 0.34] },
    notes: ['DCF 150 guidelines', 'Shared placement at 25%+ overnights changes formula significantly', 'Gross income basis'],
    uniqueFactors: ['Shared placement (25%+) uses both parents\' incomes', 'Serial family adjustment for multiple families', 'Low-income payer adjustment available'],
  }),

  wyoming: makeIncomeSharesState({
    name: 'Wyoming', abbreviation: 'WY', slug: 'wyoming', emoji: '🤠',
    howItWorks: 'Wyoming uses the Income Shares model. Both parents\' net monthly incomes are combined. The presumptive child support obligation from the guidelines table is split proportionally. A credit for extended time may apply. Wyoming\'s guidelines are relatively straightforward compared to many states.',
    notes: ['Net income basis', 'Relatively straightforward guidelines'],
    uniqueFactors: ['Net income after taxes', 'Court discretion for deviation based on best interests'],
  }),
};

// ── Utility Functions ──

export function getAllStates(): StateFormula[] {
  return Object.values(STATE_FORMULAS).sort((a, b) => a.name.localeCompare(b.name));
}

export function getStateBySlug(slug: string): StateFormula | undefined {
  return STATE_FORMULAS[slug];
}

export function getStatesByModel(model: ModelType): StateFormula[] {
  return getAllStates().filter(s => s.modelType === model);
}

export function getModelTypeLabel(model: ModelType): string {
  switch (model) {
    case 'income-shares': return 'Income Shares';
    case 'percentage-of-income': return 'Percentage of Income';
    case 'melson-formula': return 'Melson Formula';
  }
}

export function getModelTypeDescription(model: ModelType): string {
  switch (model) {
    case 'income-shares':
      return 'Both parents\' incomes are combined to determine total child support needs, then divided proportionally based on each parent\'s share of the combined income.';
    case 'percentage-of-income':
      return 'A flat percentage of the non-custodial parent\'s income is applied based on the number of children. Simpler but considers only one parent\'s income.';
    case 'melson-formula':
      return 'A three-step formula that first ensures each parent can meet their own basic needs, then calculates children\'s primary needs, then shares remaining income for the children\'s standard of living.';
  }
}

// ── Calculation Engine ──

export interface CalculationInput {
  parent1Income: number;
  parent2Income: number;
  numberOfChildren: number;
  healthInsurance: number;
  childcare: number;
  parentingTimePct: number; // percentage of time parent1 has custody (0-100)
}

export interface SupportBreakdown {
  basicObligation: number;
  parent1Share: number;
  parent2Share: number;
  healthInsuranceShare: number;
  childcareShare: number;
  parentingTimeAdjustment: number;
  estimatedMonthlySupport: number;
  payingParent: 1 | 2;
  /** Breakdown of where support goes */
  allocationBreakdown: {
    housing: number;
    food: number;
    childcare: number;
    healthInsurance: number;
    clothing: number;
    education: number;
    transportation: number;
    other: number;
  };
}

export function calculateSupport(state: StateFormula, input: CalculationInput): SupportBreakdown {
  const { parent1Income, parent2Income, numberOfChildren, healthInsurance, childcare, parentingTimePct } = input;
  const combinedIncome = parent1Income + parent2Income;
  const childIndex = Math.min(numberOfChildren, 6) - 1;

  if (combinedIncome <= 0 || numberOfChildren <= 0) {
    return emptyBreakdown();
  }

  const parent1Pct = combinedIncome > 0 ? parent1Income / combinedIncome : 0.5;
  const parent2Pct = 1 - parent1Pct;

  let basicObligation = 0;

  if (state.modelType === 'income-shares' && state.incomeSharesTable) {
    const table = state.incomeSharesTable;
    let applicablePercentage = table.brackets[table.brackets.length - 1].percentages[childIndex];
    for (const bracket of table.brackets) {
      if (combinedIncome <= bracket.maxIncome) {
        applicablePercentage = bracket.percentages[childIndex];
        break;
      }
    }
    basicObligation = combinedIncome * applicablePercentage;
  } else if (state.modelType === 'percentage-of-income' && state.percentageRates) {
    // Use non-custodial parent's income (parent with less custody time)
    const nonCustodialIncome = parentingTimePct >= 50 ? parent2Income : parent1Income;
    basicObligation = nonCustodialIncome * state.percentageRates.rates[childIndex];
  } else if (state.modelType === 'melson-formula' && state.melsonParams) {
    const params = state.melsonParams;
    // Step 1: Self-support reserve
    const p1Available = Math.max(0, parent1Income - params.selfSupportReserve);
    const p2Available = Math.max(0, parent2Income - params.selfSupportReserve);
    const totalAvailable = p1Available + p2Available;
    // Step 2: Primary needs
    const primaryNeeds = params.primaryNeedsPerChild * numberOfChildren;
    // Step 3: SOLA (Standard of Living Adjustment)
    const afterPrimary = Math.max(0, totalAvailable - primaryNeeds);
    const sola = afterPrimary * params.standardOfLivingFactor;
    basicObligation = primaryNeeds + sola;
  }

  // Apply income cap if applicable
  if (state.maxIncomeCap > 0 && state.modelType === 'percentage-of-income') {
    const nonCustodialIncome = parentingTimePct >= 50 ? parent2Income : parent1Income;
    if (nonCustodialIncome > state.maxIncomeCap) {
      basicObligation = state.maxIncomeCap * (state.percentageRates?.rates[childIndex] ?? 0.20);
    }
  }

  // Add childcare and health insurance
  const totalObligation = basicObligation + healthInsurance + childcare;

  // Proportional shares
  const parent1ShareRaw = totalObligation * parent1Pct;
  const parent2ShareRaw = totalObligation * parent2Pct;

  // Parenting time adjustment
  const custodyDeviation = parentingTimePct >= 50
    ? (parentingTimePct - 50) / 100
    : (50 - parentingTimePct) / 100;
  const parentingAdjustmentFactor = 1 - (custodyDeviation * state.overnightAdjustmentRate * 365);

  // Determine paying parent and final amount
  let estimatedSupport: number;
  let payingParent: 1 | 2;

  if (parentingTimePct >= 50) {
    // Parent 1 has more time, Parent 2 pays
    payingParent = 2;
    estimatedSupport = parent2ShareRaw * Math.max(0.5, parentingAdjustmentFactor);
  } else {
    // Parent 2 has more time, Parent 1 pays
    payingParent = 1;
    estimatedSupport = parent1ShareRaw * Math.max(0.5, parentingAdjustmentFactor);
  }

  // Generate allocation breakdown
  const allocationBreakdown = generateAllocationBreakdown(estimatedSupport, childcare, healthInsurance);

  return {
    basicObligation: Math.round(basicObligation),
    parent1Share: Math.round(parent1ShareRaw),
    parent2Share: Math.round(parent2ShareRaw),
    healthInsuranceShare: Math.round(healthInsurance),
    childcareShare: Math.round(childcare),
    parentingTimeAdjustment: Math.round(estimatedSupport - (payingParent === 1 ? parent1ShareRaw : parent2ShareRaw)),
    estimatedMonthlySupport: Math.round(estimatedSupport),
    payingParent,
    allocationBreakdown,
  };
}

function generateAllocationBreakdown(totalSupport: number, childcare: number, healthInsurance: number): SupportBreakdown['allocationBreakdown'] {
  const afterDirectCosts = totalSupport - childcare - healthInsurance;
  return {
    housing: Math.round(afterDirectCosts * 0.33),
    food: Math.round(afterDirectCosts * 0.20),
    childcare: Math.round(childcare),
    healthInsurance: Math.round(healthInsurance),
    clothing: Math.round(afterDirectCosts * 0.08),
    education: Math.round(afterDirectCosts * 0.10),
    transportation: Math.round(afterDirectCosts * 0.15),
    other: Math.round(afterDirectCosts * 0.14),
  };
}

function emptyBreakdown(): SupportBreakdown {
  return {
    basicObligation: 0, parent1Share: 0, parent2Share: 0,
    healthInsuranceShare: 0, childcareShare: 0, parentingTimeAdjustment: 0,
    estimatedMonthlySupport: 0, payingParent: 1,
    allocationBreakdown: { housing: 0, food: 0, childcare: 0, healthInsurance: 0, clothing: 0, education: 0, transportation: 0, other: 0 },
  };
}
