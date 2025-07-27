# AI Survey Builder

An intelligent survey generation tool that uses Google's Gemini AI to create customized healthcare survey forms based on natural language prompts.

## Features

- 🤖 **AI-Powered Survey Generation**: Generate survey forms using natural language prompts
- 📋 **Multiple Field Types**: Support for various input types including text, numbers, ratings, multiple choice, and more
- ✏️ **Interactive Editor**: Edit and customize generated survey fields with drag-and-drop reordering
- 📱 **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- 🎨 **Modern UI**: Built with shadcn/ui components and Radix UI primitives
- 🔗 **Shareable Surveys**: Generate unique URLs for each survey
- 🧩 **Modular Architecture**: Clean component structure for easy maintenance and customization
- 🔄 **Real-time Preview**: See changes instantly as you edit survey fields

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **AI Integration**: [Google Gemini AI](https://ai.google.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or later)
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Google Gemini API Key** (get one from [Google AI Studio](https://aistudio.google.com/))

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-survey-builder
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm ci

# Using yarn
yarn install --frozen-lockfile

# Using pnpm
pnpm install

# Using bun
bun install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory and add your Google Gemini API key:

```bash
# .env.local
GEMINI_API_KEY=your_gemini_api_key_here
```

**To get your Gemini API key:**

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and paste it in your `.env.local` file

### 4. Run the Development Server

Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using bun
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Creating a Survey

1. **Enter a Prompt**: Type a natural language description of the survey you want to create
   - Example: "Create a survey for post-visit feedback at a dermatology clinic"
   - Example: "Generate a customer satisfaction survey for a restaurant"

2. **AI Generation**: The application will use Google Gemini AI to generate appropriate survey fields

3. **Edit Fields**: Customize the generated fields using the interactive editor:
   - Modify questions and descriptions
   - Change field types (text, number, rating, multiple choice, etc.)
   - Set required/optional status
   - Configure field-specific options (max length, ranges, choices)

4. **Save Survey**: Save your completed survey template locally (for demo purposes, the data is not persisted, you should implement a backend for saving data if needed)

### Loading a Survey

To load a previously created survey, click `Load a template` button and select a survey from the list. The application will populate the editor with the selected survey fields. Then you can edit or customize the fields as needed. (the data is not persisted, for demo purposes, there are two dummy templates initially available)

### Sharing a Survey

To share a survey, click `Load a template` button and click `Share` button next to the survey you want to share. This will copy the URL to your clipboard that you can share with others. They can access the survey using this URL and fill it out.

### Field Types Supported

- **Short Text** (fieldType: 0): Single-line text input with optional max length
- **Long Text** (fieldType: 1): Multi-line textarea
- **Number** (fieldType: 2): Numeric input with optional range validation
- **Yes/No** (fieldType: 3): Boolean radio button selection
- **Multiple Choice** (fieldType: 4): Radio buttons or checkboxes with custom options
- **Dropdown** (fieldType: 5): Select dropdown with custom options
- **Rating** (fieldType: 6): 1-5 star rating slider

## Project Structure

```
demo-survey/
├── app/
│   ├── [uuid]/          # Dynamic route for individual surveys
│   │   └── page.tsx
│   ├── api/             # API routes
│   │   ├── route.ts     # Main API endpoint for AI generation
│   │   └── getGeminiParams.ts
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main page
├── components/
│   ├── survey/          # Survey-related components
│   │   ├── SurveyGenerator.tsx    # AI survey generation component
│   │   ├── TemplateDialog.tsx     # Template selection dialog
│   │   ├── SurveyEditor.tsx       # Survey editing interface
│   │   ├── FieldEditor.tsx        # Individual field editor
│   │   ├── FieldTypeSelector.tsx  # Field type selection dropdown
│   │   ├── SurveyPreview.tsx      # Survey preview component
│   │   ├── SurveyField.tsx        # Individual survey field renderer
│   │   └── index.ts               # Component exports
│   └── ui/              # shadcn/ui components
├── lib/
│   ├── dummy-data.ts    # Sample survey data
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## Component Architecture

The application has been refactored into modular, reusable components for better maintainability:

### Core Components

- **`SurveyGenerator`**: Handles AI-powered survey generation from natural language prompts
- **`TemplateDialog`**: Manages template selection and sharing functionality
- **`SurveyEditor`**: Main editing interface with drag-and-drop field management
- **`FieldEditor`**: Individual field editing with type-specific configuration options
- **`FieldTypeSelector`**: Dropdown for selecting different field types
- **`SurveyPreview`**: Real-time preview of the survey as users would see it
- **`SurveyField`**: Renders individual survey fields based on their type

### Component Relationships

```
Home Page (app/page.tsx)
├── SurveyGenerator
├── TemplateDialog
├── SurveyEditor
│   ├── FieldEditor (multiple instances)
│   │   └── FieldTypeSelector
│   └── Drag & Drop Context
└── SurveyPreview
    └── SurveyField (multiple instances)
```

All survey components are exported from `components/survey/index.ts` for clean imports.

## Development Notes

### Recent Refactoring (v2.0)

The application has been completely refactored from a monolithic structure to a modular component-based architecture:

- **Before**: All functionality was contained in a single 500+ line `page.tsx` file
- **After**: Functionality is split into focused, reusable components in the `components/survey/` directory

### Benefits of the New Structure

- **Maintainability**: Each component has a single responsibility
- **Reusability**: Components can be easily reused across different parts of the application
- **Testing**: Individual components can be tested in isolation
- **Collaboration**: Multiple developers can work on different components simultaneously
- **Code Organization**: Related functionality is grouped together

### Import Structure

```typescript
// Clean imports from the index file
import { SurveyGenerator, TemplateDialog, SurveyEditor, SurveyPreview } from '@/components/survey'
```

## API Endpoints

### POST `/api`

Generates survey fields based on a natural language prompt.

**Request Body:**

```json
{
  "prompt": "Create a survey for post-visit feedback"
}
```

**Response:**

```json
[
  {
    "fieldType": 6,
    "fieldLabel": "How would you rate your overall experience?",
    "fieldDescription": "Please rate your visit from 1 to 5",
    "requiredField": true
  }
]
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## Customization

### Adding New Field Types

1. Update the `SurveyField` interface in `app/api/route.ts`
2. Add the new field type to the `FieldTypeSelector` component (`components/survey/FieldTypeSelector.tsx`)
3. Implement the field rendering in the `SurveyField` component (`components/survey/SurveyField.tsx`)
4. Add field-specific editing options in the `FieldEditor` component (`components/survey/FieldEditor.tsx`)
5. Update the AI prompt schema in `getGeminiParams.ts`

### Modifying Components

The modular component structure makes it easy to customize specific parts:

- **Survey Generation**: Modify `SurveyGenerator.tsx` to change the AI prompt interface
- **Field Editing**: Update `FieldEditor.tsx` to add new field configuration options
- **Preview Display**: Customize `SurveyField.tsx` to change how fields are rendered
- **Template Management**: Modify `TemplateDialog.tsx` to change template selection behavior

### Styling

The project uses Tailwind CSS v4 with shadcn/ui components. Customize the theme by modifying:

- `app/globals.css` for global styles
- `components.json` for shadcn/ui configuration
- Individual component files for component-specific styles

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### Common Issues

1. **API Key Error**: Ensure your `GEMINI_API_KEY` is correctly set in `.env.local`
2. **Build Errors**: Make sure all dependencies are installed with `npm ci`
3. **TypeScript Errors**: Run `npm run lint` to identify and fix type issues

### Getting Help

- Check the [Next.js Documentation](https://nextjs.org/docs)
- Visit [shadcn/ui Documentation](https://ui.shadcn.com/)
- Review [Google Gemini AI Documentation](https://ai.google.dev/docs)
