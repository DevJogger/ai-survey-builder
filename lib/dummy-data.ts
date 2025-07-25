import { SurveyField } from '@/app/api/route'

export const DUMMY_DATA: { uuid: string; data: (SurveyField & { id: string })[] }[] = [
  {
    uuid: '49b4fe37-d501-424b-9618-f24ffeb0fd39',
    data: [
      {
        id: '93e79d1e-f1d9-4896-b001-da157d4b1ca9',
        fieldLabel: 'How would you rate your wait time experience?',
        fieldType: 5,
        requiredField: true,
        allowMultipleSelection: false,
        fieldDescription:
          'Please select the option that best describes your waiting period before seeing the provider.',
        options: ['Less than 15 minutes', '15-30 minutes', '30-60 minutes', 'More than 60 minutes'],
      },
      {
        id: '77a3a53b-178a-4ec1-9593-f01719aaf810',
        fieldLabel: "Please rate the clarity and effectiveness of your provider's communication.",
        fieldType: 6,
        requiredField: true,
        fieldDescription:
          'Consider how well your concerns were addressed and information was explained.',
      },
      {
        id: 'ef520ee0-58dc-418a-83ba-37210819878a',
        fieldLabel: 'Overall, how satisfied were you with your dermatology visit today?',
        fieldType: 6,
        requiredField: true,
        fieldDescription: 'Rate your entire experience from check-in to check-out.',
      },
      {
        id: '751a981d-fff0-4774-adea-85bbdcf1c958',
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
        id: '25b35c8a-85e5-47b5-8210-65be374e4a72',
        fieldLabel: 'How would you rate the waiting time for your appointment?',
        fieldType: 6,
        requiredField: true,
        fieldDescription:
          'From your arrival at the clinic to when you were called in to see the provider.',
      },
      {
        id: '5b3f7ca2-f665-4c9b-bbff-a178ee47b355',
        fieldLabel:
          "How would you rate the clarity and helpfulness of your dermatology provider's communication?",
        fieldType: 6,
        requiredField: true,
        fieldDescription:
          'Including explanations of your condition, treatment options, and answering your questions.',
      },
      {
        id: '8a43b8c6-1063-4ee5-9c0f-faa9a0f5a5be',
        fieldLabel: 'Overall, how satisfied were you with your dermatology visit today?',
        fieldType: 6,
        requiredField: true,
      },
      {
        id: 'd5f2a770-95fa-4018-b180-ed86b406440d',
        fieldLabel: 'Do you have any additional comments or suggestions regarding your visit?',
        fieldType: 1,
        requiredField: false,
        fieldDescription:
          'Please feel free to share any feedback about your wait time, provider communication, or overall experience.',
      },
      {
        id: '4b8367da-1cde-4784-aca2-995a7cfd1ee3',
        fieldLabel: 'Would you recommend our dermatology clinic to others?',
        fieldType: 3,
        requiredField: true,
      },
    ],
  },
]
