# Bold Clone

This project is a backend application that integrates with the Google Gemini API to generate AI-powered content. It uses Express.js for handling HTTP requests and streams AI-generated responses in real-time.

## Features

- **Google Gemini API Integration**: Uses the `@google/genai` library to interact with the Gemini API.
- **Streaming AI Responses**: Streams AI-generated content chunk by chunk.
- **Environment Configuration**: Uses `dotenv` for managing environment variables.
- **Express.js Server**: Provides an endpoint to generate content dynamically.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- A valid Google Gemini API key

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/username/bold-clone.git
   cd bold-clone/be
