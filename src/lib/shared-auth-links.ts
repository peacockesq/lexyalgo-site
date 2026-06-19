const ATLAS_LOGIN_URL = 'https://atlas.lexyalgo.com/login'
const DOCASSEMBLE_ORIGIN = 'https://doc.lexyalgo.com'
const QDRO_V2_INTERVIEW_URL = 'https://doc-v2.lexyalgo.com/interview?i=docassemble.LexyAlgoQDROV2:data/questions/qdro_v2_router.yml'

export const docassembleInterviews = {
  divorce: `${DOCASSEMBLE_ORIGIN}/interview?i=docassemble.LexyAlgo:data/questions/ct_divorce.yml`,
  estatePlanning: `${DOCASSEMBLE_ORIGIN}/interview?i=docassemble.LexyAlgo:data/questions/estate_planning.yml`,
  qdro: QDRO_V2_INTERVIEW_URL,
} as const

export function atlasLoginUrl(callbackUrl: string): string {
  const url = new URL(ATLAS_LOGIN_URL)
  url.searchParams.set('callbackUrl', callbackUrl)
  return url.toString()
}

export const sharedAuthLinks = {
  divorceAlpha: atlasLoginUrl('https://app.lexyalgo.com'),
  estatePlanning: atlasLoginUrl(docassembleInterviews.estatePlanning),
  qdro: atlasLoginUrl(docassembleInterviews.qdro),
} as const
