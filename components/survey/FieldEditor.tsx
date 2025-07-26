'use client'
import { useSortable } from '@dnd-kit/sortable'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Switch } from '@/components/ui/switch'
import { Trash, ArrowDownUp } from 'lucide-react'
import { type SurveyField } from '@/app/api/route'
import { FieldTypeSelector } from './FieldTypeSelector'

interface FieldEditorProps {
  data: SurveyField & { id: string }
  onFieldEdit: (field: SurveyField & { id: string }) => void
  onFieldDelete: () => void
  handleToggle: (id: string) => void
}

export function FieldEditor({ data, onFieldEdit, onFieldDelete, handleToggle }: FieldEditorProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: data.id })
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  }

  return (
    <AccordionItem
      ref={setNodeRef}
      style={style}
      className='border-secondary bg-background z-10 rounded-[0.5rem] border'
      value={data.id}
    >
      <AccordionTrigger className='px-4 hover:no-underline' onClick={() => handleToggle(data.id)}>
        <div className='flex items-center gap-2'>
          <div
            className='text-foreground cursor-grab transition-all hover:scale-125'
            {...attributes}
            {...listeners}
          >
            <ArrowDownUp className='size-4 shrink-0' />
          </div>
          <Trash
            className='size-4 shrink-0 cursor-pointer transition-all hover:scale-125 hover:text-red-500'
            onClick={onFieldDelete}
          />
          <span className=''>{data.fieldLabel}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className='p-4'>
        <div className='bg-muted/50 flex flex-col gap-2 rounded-md p-4'>
          <Label className='text-sm font-medium'>Question</Label>
          <Input
            value={data.fieldLabel || ''}
            onChange={(e) => {
              onFieldEdit({
                ...data,
                fieldLabel: e.target.value,
              })
            }}
          />
          <Label className='text-sm font-medium'>Type</Label>
          <FieldTypeSelector
            fieldType={data.fieldType}
            onChange={(value) => {
              onFieldEdit({
                ...data,
                fieldType: value,
              })
            }}
          />
          <Label className='text-sm font-medium'>Description</Label>
          <Input
            className='border-muted border p-2'
            value={data.fieldDescription || ''}
            name='fieldDescription'
            onChange={(e) => {
              onFieldEdit({
                ...data,
                fieldDescription: e.target.value,
              })
            }}
          />
          <Label className='text-sm font-medium'>Required?</Label>
          <Switch
            checked={data.requiredField}
            onCheckedChange={(checked) => {
              onFieldEdit({
                ...data,
                requiredField: checked,
              })
            }}
          />
          {/* short text field need maximum length */}
          {data.fieldType === 0 && (
            <>
              <Label className='text-sm font-medium'>Maximum Length</Label>
              <Input
                className='border-muted border p-2'
                value={data.maximumLength?.toString() || ''}
                name='maximumLength'
                onChange={(e) => {
                  const value = e.target.value
                  onFieldEdit({
                    ...data,
                    maximumLength: Number(value) || undefined,
                  })
                }}
              />
            </>
          )}
          {/* number field need range */}
          {data.fieldType === 2 && (
            <>
              <Label className='text-sm font-medium'>Range</Label>
              <div className='flex items-center gap-2'>
                <Input
                  className='border-muted border p-2'
                  value={data.range?.[0]?.toString() || ''}
                  name='rangeMin'
                  onChange={(e) => {
                    const value = e.target.value
                    onFieldEdit({
                      ...data,
                      range: [Number(value) || 0, data.range?.[1] || 100],
                    })
                  }}
                />
                -
                <Input
                  className='border-muted border p-2'
                  value={data.range?.[1]?.toString() || ''}
                  name='rangeMax'
                  onChange={(e) => {
                    const value = e.target.value
                    onFieldEdit({
                      ...data,
                      range: [data.range?.[0] || 0, Number(value) || 100],
                    })
                  }}
                />
              </div>
            </>
          )}
          {/* multiple choice and dropdown field need options */}
          {(data.fieldType === 4 || data.fieldType === 5) && (
            <>
              <Label className='text-sm font-medium'>Options (comma separated)</Label>
              <Input
                className='border-muted border p-2'
                value={data.options?.join(', ') || ''}
                name='options'
                onChange={(e) => {
                  const options = e.target.value.split(',').map((opt) => opt.trim())
                  onFieldEdit({
                    ...data,
                    options: options.length > 1 ? options : undefined,
                  })
                }}
              />
              {data.fieldType === 4 && (
                <>
                  <Label className='text-sm font-medium'>Allow Multiple Selection</Label>
                  <Switch
                    checked={data.allowMultipleSelection || false}
                    onCheckedChange={(checked) => {
                      onFieldEdit({
                        ...data,
                        allowMultipleSelection: checked,
                      })
                    }}
                  />
                </>
              )}
            </>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
