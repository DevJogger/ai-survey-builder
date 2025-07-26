'use client'
import { useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { Button } from '@/components/ui/button'
import { Accordion } from '@/components/ui/accordion'
import { toast } from 'sonner'
import { type SurveyField } from '@/app/api/route'
import { DUMMY_DATA } from '@/lib/dummy-data'
import { FieldEditor } from './FieldEditor'

interface SurveyEditorProps {
  surveyData: (SurveyField & { id: string })[]
  setSurveyData: (data: (SurveyField & { id: string })[]) => void
  openAccordions: string[]
  setOpenAccordions: React.Dispatch<React.SetStateAction<string[]>>
  currentTemplateId: string | null
  setCurrentTemplateId: (id: string | null) => void
}

export function SurveyEditor({
  surveyData,
  setSurveyData,
  openAccordions,
  setOpenAccordions,
  currentTemplateId,
  setCurrentTemplateId,
}: SurveyEditorProps) {
  const surveyFieldIDs = useMemo(() => surveyData.map((field) => field.id), [surveyData])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      setSurveyData(
        arrayMove(
          surveyData,
          surveyFieldIDs.indexOf(active.id as string),
          surveyFieldIDs.indexOf(over?.id as string)
        )
      )
    }
  }

  const handleFieldEdit = (id: string, field: SurveyField & { id: string }) => {
    const updatedSurveyData = surveyData.map((item) =>
      item.id === id ? { ...item, ...field } : item
    )
    setSurveyData(updatedSurveyData)
  }

  const handleFieldDelete = (id: string) => {
    const updatedSurveyData = surveyData.filter((item) => item.id !== id)
    setSurveyData(updatedSurveyData)
  }

  const handleAddField = () => {
    const id = uuidv4()
    setSurveyData([
      ...surveyData,
      {
        id,
        fieldType: 0, // default to short text
        fieldLabel: '',
        fieldDescription: '',
        requiredField: false,
      },
    ])
    setOpenAccordions((prev: string[]) => [...prev, id])
  }

  const handleSaveTemplate = () => {
    if (currentTemplateId) {
      const templateIndex = DUMMY_DATA.findIndex((t) => t.uuid === currentTemplateId)
      if (templateIndex !== -1) {
        DUMMY_DATA[templateIndex].data = surveyData
        toast('Template updated successfully!')
      }
      return
    }
    const newTemplate = {
      uuid: uuidv4(),
      data: surveyData,
    }
    DUMMY_DATA.push(newTemplate) // TODO: This is just for demo purpose, should save it to database
    setCurrentTemplateId(newTemplate.uuid)
    toast('Template saved successfully!')
  }

  const handleNewTemplate = () => {
    setSurveyData([])
    setCurrentTemplateId(null)
  }

  const handleAccordionToggle = (id: string) => {
    setOpenAccordions((prev: string[]) =>
      prev.includes(id) ? prev.filter((item: string) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className='flex flex-1 flex-col p-8'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold underline'>Survey Editor</h2>
        <div className='flex items-center gap-2'>
          <Button variant='outline' className='cursor-pointer' onClick={handleNewTemplate}>
            New Template
          </Button>
          <Button variant='outline' className='cursor-pointer' onClick={handleAddField}>
            Add New Field
          </Button>
          <Button variant='outline' className='cursor-pointer' onClick={handleSaveTemplate}>
            {currentTemplateId ? 'Update Template' : 'Save Template'}
          </Button>
        </div>
      </div>
      <Accordion
        type='multiple'
        className='mt-4 flex flex-1 flex-col gap-4 overflow-y-auto p-4'
        value={openAccordions}
        onValueChange={(newOpenItems) => setOpenAccordions(newOpenItems)}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={surveyFieldIDs} strategy={verticalListSortingStrategy}>
            {surveyData &&
              surveyData.map((field) => (
                <FieldEditor
                  key={field.id}
                  data={field}
                  onFieldEdit={(field) => {
                    handleFieldEdit(field.id, field)
                  }}
                  onFieldDelete={() => handleFieldDelete(field.id)}
                  handleToggle={handleAccordionToggle}
                />
              ))}
          </SortableContext>
        </DndContext>
      </Accordion>
    </div>
  )
}
