'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type SurveyField as SurveyFieldType } from '@/app/api/route'

export function SurveyField(field: SurveyFieldType) {
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
