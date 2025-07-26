'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { DUMMY_DATA } from '@/lib/dummy-data'
import { type SurveyField } from '@/app/api/route'

interface TemplateDialogProps {
  onTemplateSelected: (data: (SurveyField & { id: string })[], templateId: string) => void
}

export function TemplateDialog({ onTemplateSelected }: TemplateDialogProps) {
  return (
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
              <DialogClose asChild>
                <Button
                  className='flex-1 cursor-pointer'
                  variant='outline'
                  onClick={() => {
                    onTemplateSelected(template.data, template.uuid)
                  }}
                >
                  {template.uuid}
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  className='cursor-pointer'
                  onClick={() => {
                    const url = `${window.location.origin}/${template.uuid}`
                    // copy the template uuid to clipboard
                    navigator.clipboard.writeText(url).then(() => {
                      toast('Template URL copied to clipboard!')
                    })
                  }}
                >
                  Share
                </Button>
              </DialogClose>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
