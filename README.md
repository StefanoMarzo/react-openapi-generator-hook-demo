# `react-openapi-generator-hook` Guided Example

This project demonstrates how to use the `useApi` hook from `react-openapi-generator-hook` to fetch data from an API in a React application. 
Specifically, this example uses an API to fetch details of pets, allowing users to dynamically retrieve information about a pet by its ID.

### Project Structure

The key files in this project are:

- **App.tsx**: The main entry point for the application.
- **OpenApiConfigProvider.tsx**: The provider that sets up the OpenAPI configuration.
- **PetComponent.tsx**: A component that fetches and displays pet data using the `useApi` hook.

## Explanation of Code

### `OpenApiConfigProvider.tsx`

The `OpenApiConfigProvider` provides the API configuration to the components using `react-openapi-generator-hook`. 
Here, we're defining two configurations for different APIs: `PETS` and `WEATHER`. In this example, we focus on the `PETS` configuration.
A valid configuration to use `useApi` consists in a map where the key is a `string` that identifies the back-end APIs that we need to call, and the value is an object that contains:
- `axiosInstance` an instance of axios configured with all the necessary attributes e.g. header attributes.
- `configuration` an object to define the authentication configuration e.g. an accessToken (Bearer) or an API key.
- `baseUrl` the base URL of the endpoint that we need to call.

Create the configuration
```tsx
const accessToken = '1234567890' // commonly fetched by using an authentication provider
const axiosSingleton = axios.create({
  withCredentials: true, // configuration of the axios instance 
})
const openApiConfigMap: Record<string, OpenApiConfigurationType> = {
  'PETS': {
    axiosInstance: axiosSingleton,
    configuration: new Configuration({ accessToken: accessToken }),
    baseUrl: 'https://petstore3.swagger.io/api/v3'
  },
  'WEATHER': {
    axiosInstance: axiosSingleton,
    configuration: new Configuration({ accessToken: accessToken }),
    baseUrl: 'https://weatherapis.io' 
  }
}
```
Returning the `OpenApiProvider` with the required configuration:
```tsx
<OpenApiProvider
  defaultConfigurationId="PETS"
  openApiConfigurationMap={openApiConfigMap}
>
  {children}
</OpenApiProvider>
```

### `PetComponent.tsx`

The `PetComponent` fetches pet data based on the pet ID provided by the user. It uses the `useApi` hook to fetch the pet data asynchronously.

**useApi Hook**:
   The `useApi` hook is used to fetch the data for a specific pet by its ID. The hook takes an object with the following properties:
    - `apiFactory`: The API factory to use (e.g., `PetApiFactory`).
    - `methodName`: The method to invoke (e.g., `'getPetById'`).
    - `requestParameters`: The parameters to pass to the API method (e.g., the pet ID).

```tsx
import { useApi } from 'react-openapi-generator-hook'
import { PetApiFactory } from '../../generated'
import React, { useEffect, useState } from 'react'

const defaultPetId = 4

export const PetComponent = () => {
  ...
  const [{ data: petData, error: error, loading: isLoading }, getPet] = useApi(
    {
      apiFactory: PetApiFactory,
      methodName: 'getPetById',
      requestParameters: defaultPetId
    }
  )
  ...
  return (
    <>
      ...
      <h3>Automatically Fetched pet:</h3>
      <div>id: {error ? 'NA' : petData?.id}</div>
      <div>category: {error ? 'NA' : petData?.category?.name}</div>
      <div>name: {error ? 'NA' : petData?.name}</div>
      <div>{isLoading ? '⌛ Loading...' : ''}</div>
      <div>{error?.status ?? ''}</div>
      ...
    </>
  )
}
```

### How `useApi` Works

- **Loading**: The `useApi` hook returns a `loading` state, which is `true` while the request is being made and `false` once the data has been fetched.
- **Data**: Once the data is successfully fetched, the `data` property contains the pet information (ID, category, name).
- **Error**: If the API request fails, the `error` property will contain the error information, including the HTTP status code.

### API Configuration

In this example, the `OpenApiConfigProvider` sets the base URL and configuration for the pet API. The `accessToken` is used for authentication, and `axios` is the HTTP client used to make the requests.

## Dependencies

This example uses the following dependencies:

- **react-openapi-generator-hook**: Provides hooks to interact with APIs generated using OpenAPI specifications.
- **axios**: A popular HTTP client for making requests.
- **React**: The JavaScript library for building user interfaces.

### Installation

```bash
npm install react-openapi-generator-hook
```
