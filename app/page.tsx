'use client'
import { useState, useMemo } from 'react'
import { type SurveyField } from '@/app/api/route'
import { SurveyGenerator, TemplateDialog, SurveyEditor, SurveyPreview } from '@/components/survey'

export default function Home() {
  const [surveyData, setSurveyData] = useState<(SurveyField & { id: string })[]>([])
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null)
  const surveyFieldIDs = useMemo(() => surveyData.map((field) => field.id), [surveyData])
  const [openAccordions, setOpenAccordions] = useState<string[]>(surveyFieldIDs)

  const handleSurveyGenerated = (newSurveyData: (SurveyField & { id: string })[]) => {
    setSurveyData(newSurveyData)
    setOpenAccordions(newSurveyData.map((field) => field.id))
  }

  const handleTemplateSelected = (
    templateData: (SurveyField & { id: string })[],
    templateId: string
  ) => {
    setSurveyData(templateData)
    setOpenAccordions(templateData.map((field) => field.id))
    setCurrentTemplateId(templateId)
  }

  return (
    <main className='flex h-screen flex-col items-center gap-8 p-8'>
      <section className='flex w-full max-w-7xl flex-col justify-center gap-4 py-8'>
        <h1 className='text-4xl font-bold'>AI Survey Builder</h1>
        <div className='flex gap-4'>
          <SurveyGenerator onSurveyGenerated={handleSurveyGenerated} />
          <TemplateDialog onTemplateSelected={handleTemplateSelected} />
        </div>
      </section>
      <section className='flex w-full flex-1 overflow-hidden'>
        <aside className='flex-1'>
          <SurveyEditor
            surveyData={surveyData}
            setSurveyData={setSurveyData}
            openAccordions={openAccordions}
            setOpenAccordions={setOpenAccordions}
            currentTemplateId={currentTemplateId}
            setCurrentTemplateId={setCurrentTemplateId}
          />
        </aside>
        <aside className='bg-muted flex-1 overflow-y-auto p-8'>
          <h2 className='text-xl font-semibold underline'>Preview</h2>
          <div className='mt-8'>
            <SurveyPreview data={surveyData} />
          </div>
        </aside>
      </section>
    </main>
  )
}
