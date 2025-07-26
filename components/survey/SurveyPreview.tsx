'use client'
import { type SurveyField as SurveyFieldType } from '@/app/api/route'
import { SurveyField } from './SurveyField'

interface SurveyPreviewProps {
  data: (SurveyFieldType & { id: string })[]
}

export function SurveyPreview({ data }: SurveyPreviewProps) {
  return (
    <div className='flex flex-col gap-4'>
      {data.map((field) => (
        <SurveyField key={field.id} {...field} />
      ))}
    </div>
  )
}
