This is a [LlamaIndex](https://www.llamaindex.ai/) project using [Next.js](https://nextjs.org/) bootstrapped with [`create-llama`](https://github.com/run-llama/LlamaIndexTS/tree/main/packages/create-llama).

## Custom Components from this tutorial
Most of the code generated is started code from `create-llama`.
The custom code for this tutorial can be found in:
- `app/components/integration-ui`: These are frontend modifications that allow users to authenticate and enable integrations
- `app/hooks`: react hook that encapsulates the paragon authentication logic
- `app/api/permissions`: POST endpoint and custom logic for receiving and processing permissions data
- `app/api/*-upload`: POST endpoint to receive ingestion data for upserting to Pinecone
- `app/api/route.ts`: the default chat API will now look for permissions from authenticated users
- `app/api/chat/engine/agents/*agent.ts`: OpenAI Agent implementation with function tools
- `utility/request-utilities.ts`: Functions that send POST requests to Paragon endpoint triggers for Salesforce and Slack


## Getting Started
```
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Using Docker

1. Build an image for the Next.js app:

```
docker build -t <your_app_image_name> .
```

2. Generate embeddings:

Parse the data and generate the vector embeddings if the `./data` folder exists - otherwise, skip this step:

```
docker run \
  --rm \
  -v $(pwd)/.env:/app/.env \ # Use ENV variables and configuration from your file-system
  -v $(pwd)/config:/app/config \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/cache:/app/cache \ # Use your file system to store the vector database
  <your_app_image_name> \
  npm run generate
```

3. Start the app:

```
docker run \
  --rm \
  -v $(pwd)/.env:/app/.env \ # Use ENV variables and configuration from your file-system
  -v $(pwd)/config:/app/config \
  -v $(pwd)/cache:/app/cache \ # Use your file system to store gea vector database
  -p 3000:3000 \
  <your_app_image_name>
```