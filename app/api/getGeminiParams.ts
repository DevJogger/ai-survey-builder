import { GenerateContentParameters, Type } from '@google/genai'

export default function getGeminiParams(prompt: string): GenerateContentParameters {
  return {
    model: 'gemini-2.5-flash',
    contents: `Take the prompt and return a survey form with 3 to 5 fields in structured format. Here is the prompt: ${prompt}`,
    config: {
      systemInstruction:
        'You are a helpful assistant that generates surveys for healthcare providers.',
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        description:
          'An array of fields in the survey form. At least three types of fields are required. At least has one rating field.',
        nullable: false,
        items: {
          type: Type.OBJECT,
          properties: {
            fieldType: {
              type: Type.NUMBER,
              description:
                'The field type of the survey, 0 for short text, 1 for long text, 2 for number, 3 for yes/no, 4 for multiple choice, 5 for dropdown, 6 for rating. Rating field has a range of 1 to 5.',
            },
            fieldLabel: {
              type: Type.STRING,
              description: 'The label of the survey field.',
            },
            fieldDescription: {
              type: Type.STRING,
              description: 'The description of the survey field.',
            },
            requiredField: {
              type: Type.BOOLEAN,
              description: 'Whether the field is required or not.',
              default: false,
            },
            maximumLength: {
              type: Type.NUMBER,
              description:
                'The maximum length of the field, required if the field type is short text.',
            },
            range: {
              type: Type.ARRAY,
              description:
                'The 2 length array to define the number range, first element is the minimum value, second element is the maximum value, required if the field type is number.',
              items: {
                type: Type.NUMBER,
              },
            },
            options: {
              type: Type.ARRAY,
              description:
                'The options for the multiple choice or dropdown field, minimum 2 options are required, required if the field type is multiple choice or dropdown.',
              items: {
                type: Type.STRING,
              },
            },
            allowMultipleSelection: {
              type: Type.BOOLEAN,
              description:
                'Whether the multiple choice field allows multiple selection, required if the field type is multiple choice or dropdown.',
              default: false,
            },
          },
          required: ['fieldType', 'fieldLabel', 'requiredField'],
        },
      },
    },
  }
}
