# AI Survey Builder

An intelligent survey generation tool that uses Google's Gemini AI to create customized healthcare survey forms based on natural language prompts.

## Features

- 🤖 **AI-Powered Survey Generation**: Generate survey forms using natural language prompts
- 📋 **Multiple Field Types**: Support for various input types including text, numbers, ratings, multiple choice, and more
- ✏️ **Interactive Editor**: Edit and customize generated survey fields
- 📱 **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- 🎨 **Modern UI**: Built with shadcn/ui components and Radix UI primitives
- 🔗 **Shareable Surveys**: Generate unique URLs for each survey

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

4. **Save Survey**: Save your completed survey to generate a shareable URL

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
│   └── page.tsx         # Home page with survey builder
├── components/
│   └── ui/              # shadcn/ui components
├── lib/
│   ├── dummy-data.ts    # Sample survey data
│   └── utils.ts         # Utility functions
└── public/              # Static assets
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
2. Add the new field type to the `FieldTypeSelector` component
3. Implement the field rendering in the `SurveyField` component
4. Update the AI prompt schema in `getGeminiParams.ts`

### Styling

The project uses Tailwind CSS v4 with shadcn/ui components. Customize the theme by modifying:
- `app/globals.css` for global styles
- `components.json` for shadcn/ui configuration

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
