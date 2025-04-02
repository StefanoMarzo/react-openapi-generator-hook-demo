import { OpenApiConfigurationType, OpenApiProvider } from 'react-openapi-generator-hook'
import axios from 'axios'
import { Configuration } from '../../generated'
import React, { ReactNode } from 'react'

export const OpenApiConfigProvider: React.FC<{ readonly children: ReactNode }> = ({ children }) => {
  const accessToken = '1234567890'
  const axiosSingleton = axios.create()
  const openApiConfigMap: Record<string, OpenApiConfigurationType> = {
    'PETS': {
      axiosInstance: axiosSingleton,
      configuration: new Configuration({ accessToken: accessToken }),
      baseUrl: 'https://petstore3.swagger.io/api/v3'
    },
  }
  return (
    <OpenApiProvider
      defaultConfigurationId="PETS"
      openApiConfigurationMap={openApiConfigMap}
    >
      {children}
    </OpenApiProvider>
  )
}
