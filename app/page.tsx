'use client'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Trash } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type SurveyField } from '@/app/api/route'
import { DUMMY_DATA } from '@/lib/dummy-data'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [surveyData, setSurveyData] = useState<SurveyField[] | []>([])

  const handleSubmit = async () => {
    if (isLoading || !prompt) return
    setIsLoading(true)
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
      const data = await response.json()
      setSurveyData(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value)
  }

  const handleFieldEdit = (index: number, field: SurveyField) => {
    const updatedSurveyData = [...surveyData]
    updatedSurveyData[index] = field
    setSurveyData(updatedSurveyData)
  }

  const handleFieldDelete = (index: number) => {
    const updatedSurveyData = surveyData.filter((_, i) => i !== index)
    setSurveyData(updatedSurveyData)
  }

  const handleAddField = () => {
    setSurveyData([
      ...surveyData,
      {
        fieldType: 0, // default to short text
        fieldLabel: '',
        fieldDescription: '',
        requiredField: false,
      },
    ])
  }

  const handleSaveTemplate = () => {
    const newTemplate = {
      uuid: uuidv4(),
      data: surveyData,
    }
    DUMMY_DATA.push(newTemplate) // TODO: This is just for demo purpose, should save it to database instead.
    setSurveyData([])
  }

  return (
    <main className='flex h-screen flex-col items-center gap-8 p-8'>
      <section className='flex w-full max-w-7xl flex-col justify-center gap-4 py-8'>
        <h1 className='text-4xl font-bold'>AI Survey Builder</h1>
        <div className='flex gap-4'>
          <Input
            name='prompt'
            placeholder='Please input your prompt, e.g., create a survey for post-visit feedback'
            onChange={handlePromptChange}
          />
          <Button
            className={cn('w-24', isLoading ? 'cursor-not-allowed' : 'cursor-pointer')}
            variant='default'
            onClick={handleSubmit}
          >
            {isLoading ? (
              <div className='grid w-4 place-items-center'>
                <div className='size-4 animate-spin rounded-full border-2 border-purple-300 border-t-purple-600'></div>
              </div>
            ) : (
              <span>Generate</span>
            )}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='cursor-pointer'>Load a template</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select a template from the list below</DialogTitle>
                <DialogDescription>(data for demo only, not saved to database)</DialogDescription>
              </DialogHeader>
              <div className='mt-4 flex flex-col gap-2'>
                {DUMMY_DATA.map((template) => (
                  <div className='flex items-center gap-2' key={template.uuid}>
                    <Button
                      className='flex-1 cursor-pointer'
                      variant='outline'
                      onClick={() => {
                        setSurveyData(template.data)
                      }}
                    >
                      {template.uuid}
                    </Button>
                    <Button
                      className='cursor-pointer'
                      onClick={() => {
                        const url = `${window.location.origin}/${template.uuid}`
                        // copy the template uuid to clipboard
                        navigator.clipboard.writeText(url).then(() => {
                          alert('Template URL copied to clipboard!')
                        })
                      }}
                    >
                      Share
                    </Button>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
      <section className='flex w-full flex-1 overflow-hidden'>
        <aside className='flex flex-1 flex-col p-8'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold underline'>Survey Editor</h2>
            <div className='flex items-center gap-2'>
              <Button variant='outline' className='cursor-pointer' onClick={handleAddField}>
                Add New Field
              </Button>
              <Button variant='outline' className='cursor-pointer' onClick={handleSaveTemplate}>
                Save Template
              </Button>
            </div>
          </div>
          <div className='mt-8 flex flex-1 flex-col gap-8 overflow-y-auto p-4'>
            {surveyData &&
              surveyData.map((field, index) => (
                <FieldEditor
                  key={index}
                  onFieldEdit={(field: SurveyField) => {
                    handleFieldEdit(index, field)
                  }}
                  onFieldDelete={() => handleFieldDelete(index)}
                  data={field}
                />
              ))}
          </div>
        </aside>
        <aside className='bg-muted flex-1 overflow-y-auto p-8'>
          <h2 className='text-xl font-semibold underline'>Preview</h2>
          <div className='mt-8'>
            <Survey data={surveyData} />
          </div>
        </aside>
      </section>
    </main>
  )
}

interface FieldEditorProps {
  data: SurveyField
  onFieldEdit: (field: SurveyField) => void
  onFieldDelete: () => void
}
function FieldEditor({ data, onFieldEdit, onFieldDelete }: FieldEditorProps) {
  return (
    <div className='border-foreground/50 relative flex flex-col gap-2 rounded-md border p-4'>
      <Trash
        className='absolute top-4 right-4 size-4 cursor-pointer transition-colors hover:text-red-500'
        onClick={onFieldDelete}
      />
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
  )
}

interface FieldTypeSelectorProps {
  fieldType: number
  onChange: (value: number) => void
}
function FieldTypeSelector({ fieldType, onChange }: FieldTypeSelectorProps) {
  return (
    <Select value={fieldType.toString()} onValueChange={(value) => onChange(Number(value))}>
      <SelectTrigger className='w-48'>
        <SelectValue placeholder='Field type' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='0'>Short Text</SelectItem>
        <SelectItem value='1'>Long Text</SelectItem>
        <SelectItem value='2'>Number</SelectItem>
        <SelectItem value='3'>Yes/No</SelectItem>
        <SelectItem value='4'>Multiple Choice</SelectItem>
        <SelectItem value='5'>Dropdown</SelectItem>
        <SelectItem value='6'>Rating</SelectItem>
      </SelectContent>
    </Select>
  )
}

interface SurveyProps {
  data: SurveyField[]
}

export function Survey({ data }: SurveyProps) {
  return (
    <div className='flex flex-col gap-4'>
      {data.map((field, index) => (
        <SurveyField key={index} {...field} />
      ))}
    </div>
  )
}

function SurveyField(field: SurveyField) {
  return (
    <div className='border-foreground/50 rounded-md border p-4'>
      <Label className='text-sm font-medium'>
        <p>
          {field.requiredField && <span className='mr-1 text-red-500'>*</span>}
          {field.fieldLabel}
        </p>
      </Label>
      {field.fieldDescription && (
        <p className='text-muted-foreground text-xs'>{field.fieldDescription}</p>
      )}
      {field.fieldType === 0 && (
        <Input
          className='border-muted mt-2 border p-2'
          placeholder='Enter your answer'
          maxLength={field.maximumLength}
        />
      )}
      {field.fieldType === 1 && (
        <Textarea
          className='border-muted mt-2 border p-2'
          placeholder='Enter your answer'
          maxLength={field.maximumLength}
          rows={4}
        />
      )}
      {field.fieldType === 2 && (
        <Input
          className='border-muted mt-2 border p-2'
          type='number'
          placeholder={`Enter a number${field.range ? ` (${field.range[0]}-${field.range[1]})` : ''}`}
        />
      )}
      {field.fieldType === 3 && (
        <RadioGroup defaultValue='yes' className='flex flex-row'>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='yes' id='yes' />
            <Label htmlFor='yes'>Yes</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='no' id='no' />
            <Label htmlFor='no'>No</Label>
          </div>
        </RadioGroup>
      )}
      {field.fieldType === 4 && (
        <div className='mt-2 flex flex-col gap-2'>
          {field.allowMultipleSelection &&
            field.options?.map((option, index) => (
              <Label key={index} className='flex items-center space-x-2'>
                <Checkbox id={`field-${field.fieldLabel}-${index}`} />
                <span>{option}</span>
              </Label>
            ))}
          {!field.allowMultipleSelection && field.options?.length !== 0 && (
            <RadioGroup className='mt-2 flex flex-col gap-2'>
              {field.options?.map((option, index) => (
                <div key={index} className='flex items-center space-x-2'>
                  <RadioGroupItem value={option} id={`field-${field.fieldLabel}-${index}`} />
                  <Label htmlFor={`field-${field.fieldLabel}-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>
      )}
      {field.fieldType === 5 && (
        <Select>
          <SelectTrigger className='mt-2 w-full'>
            <SelectValue placeholder='Select an option' />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {field.fieldType === 6 && (
        <div className='mt-2 flex items-center gap-8'>
          <Label className='text-sm font-medium'>Rating</Label>
          <Slider defaultValue={[3]} max={5} min={1} step={1} />
        </div>
      )}
    </div>
  )
}
