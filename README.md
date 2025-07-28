# ChatGPT Clone

A modern, responsive ChatGPT clone built with React, TypeScript, and Vite. This application allows you to chat with OpenAI's GPT models using your own API key.

## Features

- 🤖 **OpenAI Integration**: Chat with GPT-3.5 Turbo, GPT-4, and other models
- 🔐 **Secure API Key Management**: Store your OpenAI API key securely in localStorage
- 💬 **Real-time Chat Interface**: Modern chat UI similar to ChatGPT
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🌙 **Dark Theme**: Beautiful dark theme similar to ChatGPT
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds
- 🔄 **Message History**: View your conversation history with timestamps
- 🗑️ **Clear Conversations**: Easily clear chat history when needed
- ⚙️ **Settings Panel**: Configure API key and model selection

## Getting Started

### Prerequisites

- Node.js 16+ installed on your machine
- An OpenAI API key (get one from [OpenAI Platform](https://platform.openai.com/))

### Installation

1. Clone this repository or download the files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Configuration

1. Click the **Settings** button (gear icon) in the top-right corner
2. Enter your OpenAI API key in the "OpenAI API Key" field
3. Select your preferred model (GPT-3.5 Turbo, GPT-4, etc.)
4. Click "Close Settings" to save

Your API key is stored securely in your browser's localStorage and is never sent to any server except OpenAI's API.

## Usage

1. **Set up your API key** in the settings panel
2. **Type your message** in the input field at the bottom
3. **Press Enter** or click the Send button to send your message
4. **View the AI response** in the chat interface
5. **Continue the conversation** by sending more messages

### Keyboard Shortcuts

- **Enter**: Send message
- **Shift + Enter**: Add a new line in your message

## Available Models

- **GPT-3.5 Turbo**: Fast and cost-effective for most use cases
- **GPT-4**: More capable but slower and more expensive
- **GPT-4 Turbo**: Latest GPT-4 model with improved performance

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Application styles
├── index.css        # Global styles
├── main.tsx         # Application entry point
└── vite-env.d.ts    # Vite TypeScript definitions
```

## Technologies Used

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and development server
- **OpenAI SDK**: Official OpenAI JavaScript library
- **Lucide React**: Beautiful icons
- **CSS3**: Modern styling with flexbox and animations

## Build for Production

To build the application for production:

```bash
npm run build
```

This will create a `dist` folder with optimized production files.

To preview the production build locally:

```bash
npm run preview
```

## Security Notes

- Your API key is stored locally in your browser and never shared
- All communication goes directly from your browser to OpenAI's servers
- No data is stored on any intermediate servers

## Contributing

Feel free to submit issues and pull requests to improve this ChatGPT clone!

## License

This project is open source and available under the MIT License.
