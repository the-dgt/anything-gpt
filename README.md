<br>

![anything-gpt](https://raw.githubusercontent.com/the-dgt/anything-gpt/master/public/logo.svg)

[![npm version](https://badge.fury.io/js/anything-gpt.svg)](https://www.npmjs.com/package/anything-gpt)
[![npm](https://img.shields.io/npm/dt/anything-gpt)](https://www.npmjs.com/package/anything-gpt)
[![size](https://img.shields.io/bundlephobia/min/anything-gpt)](https://www.npmjs.com/package/anything-gpt)

Creates GPT instance that just works everywhere JavaScript works 🤖

No dependencies. <2KB. Try now.

-----

## Introduction

"anything-gpt" is a minimalist, highly portable JavaScript package designed to integrate OpenAI's GPT models into any JavaScript environment.

From running in a browser's console to executing in AWS Lambda functions, "anything-gpt" stands out for its zero-dependency architecture and lightweight footprint, making it an ideal choice for a wide range of applications.

For more information check out the [documentation](https://the-dgt.github.io/anything-gpt/).

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
yarn add anything-gpt
```

## Usage

### 1. Use pre-build GPT instances

The easiest and quickest way to just get the GPT instance and start working with it.

```ts
import instance from "anything-gpt/use/gpt4" // gpt3.5 (free model) is also available

const gpt = instance("YOUR_OPENAI_API_KEY")

await gpt`Enter your prompt. You can pass ${anything} here.`        // 1. Enter the prompt
  .then((stream) => stream((chunk: string) => console.log(chunk)))  // 2. Get GPT response by chunks
  .then((messages: ChatMessage[]) => console.log(messages))         // 3. Get all messages as a result
  .catch((error: Error) => console.error(error))                    // 4. Handle error
```

### 2. Use core package functions

Need more flexibility? Then this way is yours.

```ts
import {core, chunkify, useOptions, useEnvironment, ChatMessage, CreateInstanceOptions, AbstractEnvironmentContext} from "anything-gpt"

// Let's create GPT instance that would work for client-side application.
// Our goal now is to just log the streamed response from ChatGPT's Completions Chat API
// right to the browser's console. 

// Step 1.
// Set OpenAI API Key and Chat Completions API options
const options: CreateInstanceOptions = useOptions({
  gpt: {
    // these fields are set by default, override them if needed.
    // model: "gpt-3.5-turbo",
    // temperature: 0.7,
    // max_tokens: 4000,
    // stream: true,
    model: "gpt-4" 
  }, 
  instance: {
    // you define where the key comes from, depending on JS environment you work with.
    api_key: localStorage.getItem("your_api_key_here")
  }, 
})

// Step 2.
// Set up an environment for GPT:
//  - What is the role of this bot.
//  - How to handle text / stream response.
//  - How to handle errors.
const browser: Partial<AbstractEnvironmentContext> = useEnvironment({
  state: [{
    role: "system",
    content: "What is this bot for? You can add custom instructions here."
  }],
  stream: async (response: Response) => // handle streamed response as is,
    chunkify(response, (chunk: string) => console.log(chunk)), // or use built-in helper for getting message by chunk
  error: async (error: Error) => console.log(error)
})

// Last step is to create "gpt" function.
const gpt = core.bind(
  browser, // create context for anything, say, for "game-engine", "cli-terminal", "cloudfalre-worker", etc.
  options,
)

declare const anything: string | number | object | any[] | Function | Error // and so on

// That's it! Use tagged "gpt" function as you want!
const conversation: ChatMessage[] = await gpt`enter you prompt. you can also pass ${anything} here`
```
