import './App.css'
import { OpenApiProvider } from 'react-openapi-generator-hook'
import axios from "axios";
import {MyComponent} from "./components/MyComponent.tsx";

function App() {

    const axiosInstance = axios.create();

  return (
    <>
        <OpenApiProvider axiosInstance={axiosInstance} baseUrl={'https://petstore3.swagger.io/api/v3'}>
            <MyComponent />
        </OpenApiProvider>
    </>
  )
}

export default App
