import { useApi } from 'react-openapi-generator-hook'
import { PetApiFactory } from '../../generated'
import React, { useEffect, useState } from 'react'

const defaultPetId = 4

export const PetComponent = () => {
  const [selectedPetId, setSelectedPetId] = useState<string | number>(defaultPetId)
  const [inputError, setInputError] = useState('')
  const [{ data: petData, error: error, loading: isLoading }, getPet] = useApi(
    {
      apiFactory: PetApiFactory,
      methodName: 'getPetById',
      requestParameters: defaultPetId
    }
  )
  const handlePetIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim()
    if (Number.isInteger(Number(value))) {
      setInputError('')
    } else {
      setInputError(`${value} is not a valid integer ID`)
    }
    setSelectedPetId(value)
  }
  useEffect(() => {
    if (selectedPetId !== '' && Number.isInteger(Number(selectedPetId))) {
      getPet(Number(selectedPetId))
    }
  }, [getPet, selectedPetId])
  return (
    <>
      <h3>Automatically Fetched pet:</h3>
      <div>id: {error ? 'NA' : petData?.id}</div>
      <div>category: {error ? 'NA' : petData?.category?.name}</div>
      <div>name: {error ? 'NA' : petData?.name}</div>
      <div>
        <input
          id="petId"
          min="1"
          onChange={handlePetIdChange}
          placeholder="Pet ID"
          value={selectedPetId}
        />
      </div>
      <div>{isLoading ? '⌛ Loading...' : ''}</div>
      <div>{error?.status ?? ''}</div>
      <div>{inputError}</div>
    </>
  )
}
