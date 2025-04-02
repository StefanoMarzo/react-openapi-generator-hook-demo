import './App.css'
import { PetComponent } from './components/PetComponent'
import { OpenApiConfigProvider } from './providers/OpenApiConfigProvider'

const App = () => {
  return (
    <OpenApiConfigProvider>
      <PetComponent />
    </OpenApiConfigProvider>
  )
}

export default App
