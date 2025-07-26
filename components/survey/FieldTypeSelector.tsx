'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FieldTypeSelectorProps {
  fieldType: number
  onChange: (value: number) => void
}

export function FieldTypeSelector({ fieldType, onChange }: FieldTypeSelectorProps) {
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
