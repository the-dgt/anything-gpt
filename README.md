# anything-gpt


Creates GPT instance that just works everywhere JavaScript works 🤖

No dependencies. <2KB. Try now.

-----


## Introduction

"anything-gpt" is a minimalist, highly portable JavaScript package designed to integrate OpenAI's GPT models into any JavaScript environment.

From running in a browser's console to executing in AWS Lambda functions, "anything-gpt" stands out for its zero-dependency architecture and lightweight footprint, making it an ideal choice for a wide range of applications.

## Features

- **Universal JavaScript Compatibility**: Works seamlessly in any JS environment (browsers, Node.js, AWS Lambda, Cloudflare Workers, etc.).
- **Zero Dependencies**: No external dependencies, ensuring easy integration and minimal conflicts.
- **Ultra-Lightweight**: Less than 2KB in size, making it incredibly efficient and fast to load.
- **Simple Interface**: Offers a straightforward way to send network requests to OpenAI and handle text or stream responses.
- **Stream & Text Response Handling**: Supports both streaming and traditional text responses, giving you flexibility in how you receive data.
- **Error Handling**: Built-in error handling for robust and reliable performance.

## Installation

```bash
npm install anything-gpt
```
or
```bash
yarn install anything-gpt
```

## Usage

```ts
import { core, useEnvironment, useOptions, chunkify } from "anything-gpt"

const options = {
	gpt: { model: "gpt-4" },
	instance: { api_key: process.env.gpt_api_key_for_toaster },
}

const context = {
	stream: async (response) => chunkify(response, process.stdout),
	error: async (error) => error instanceof Response
		? process.stderr.write(await error.text())
		: process.stderr.write(error),
}

const gpt = core.bind(
	useEnvironment(context),
	useOptions(options),
)

const conversation = await gpt`enter you prompt. you can also pass ${anything} here`
```
