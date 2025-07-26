'use client'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type SurveyField } from '@/app/api/route'

interface SurveyGeneratorProps {
  onSurveyGenerated: (data: (SurveyField & { id: string })[]) => void
}

export function SurveyGenerator({ onSurveyGenerated }: SurveyGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate survey')
      }
      const data: SurveyField[] = await response.json()
      const surveyData = data.map((field) => ({ ...field, id: uuidv4() }))
      onSurveyGenerated(surveyData)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value)
  }

  return (
    <>
      <Input
        name='prompt'
        placeholder='Please input your prompt, e.g., create a survey for post-visit feedback'
        onChange={handlePromptChange}
        value={prompt}
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
    </>
  )
}
