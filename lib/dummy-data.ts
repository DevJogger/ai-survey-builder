import { SurveyField } from '@/app/api/route'

export const DUMMY_DATA: { uuid: string; data: SurveyField[] }[] = [
  {
    uuid: '49b4fe37-d501-424b-9618-f24ffeb0fd39',
    data: [
      {
        fieldLabel: 'How would you rate your wait time experience?',
        fieldType: 5,
        requiredField: true,
        allowMultipleSelection: false,
        fieldDescription:
          'Please select the option that best describes your waiting period before seeing the provider.',
        options: ['Less than 15 minutes', '15-30 minutes', '30-60 minutes', 'More than 60 minutes'],
      },
      {
        fieldLabel: "Please rate the clarity and effectiveness of your provider's communication.",
        fieldType: 6,
        requiredField: true,
        fieldDescription:
          'Consider how well your concerns were addressed and information was explained.',
      },
      {
        fieldLabel: 'Overall, how satisfied were you with your dermatology visit today?',
        fieldType: 6,
        requiredField: true,
        fieldDescription: 'Rate your entire experience from check-in to check-out.',
      },
      {
        fieldLabel: 'Do you have any additional comments or suggestions for us?',
        fieldType: 1,
        requiredField: false,
        fieldDescription: 'Please share any further feedback that could help us improve.',
      },
    ],
  },
  {
    uuid: '71a26fdb-d04b-4de3-b33e-742f0374d8f2',
    data: [
      {
        fieldLabel: 'How would you rate the waiting time for your appointment?',
        fieldType: 6,
        requiredField: true,
        fieldDescription:
          'From your arrival at the clinic to when you were called in to see the provider.',
      },
      {
        fieldLabel:
          "How would you rate the clarity and helpfulness of your dermatology provider's communication?",
        fieldType: 6,
        requiredField: true,
        fieldDescription:
          'Including explanations of your condition, treatment options, and answering your questions.',
      },
      {
        fieldLabel: 'Overall, how satisfied were you with your dermatology visit today?',
        fieldType: 6,
        requiredField: true,
      },
      {
        fieldLabel: 'Do you have any additional comments or suggestions regarding your visit?',
        fieldType: 1,
        requiredField: false,
        fieldDescription:
          'Please feel free to share any feedback about your wait time, provider communication, or overall experience.',
      },
      {
        fieldLabel: 'Would you recommend our dermatology clinic to others?',
        fieldType: 3,
        requiredField: true,
      },
    ],
  },
]
