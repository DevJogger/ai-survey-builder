import { SurveyPreview } from '@/components/survey'
import { DUMMY_DATA } from '@/lib/dummy-data'

interface Props {
  params: Promise<{
    uuid: string
  }>
}

export default async function Page({ params }: Props) {
  const { uuid } = await params

  const surveyData = DUMMY_DATA.find((item) => item.uuid === uuid)

  if (surveyData) {
    return (
      <main className='flex min-h-screen flex-col items-center justify-center p-4'>
        <SurveyPreview data={surveyData.data} />
      </main>
    )
  }

  // If no survey data is found, go to 404 page
  return (
    <div className='flex h-screen items-center justify-center'>
      <h1 className='text-4xl font-bold'>Survey Not Found</h1>
    </div>
  )
}
