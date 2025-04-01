import {useApi} from 'react-openapi-generator-hook'
import {Pet, PetApiFactory} from "../../generated";
import {Suspense, useCallback, useEffect, useState} from "react";

export const MyComponent = () => {

    const [{data: _}, getPet] = useApi(
        {
            apiFactory: PetApiFactory,
            methodName: 'getPetById',
        },
        {
            manual: true,
        }
    )
    const fetchPetById = useCallback(async (id: number) => {
        return await getPet(id)
    }, [getPet])

    const [pet, setPet] = useState<Pet>();
    useEffect(() => {
        fetchPetById(2).then(result => setPet(result.data))
    }, [fetchPetById]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <h3>Fetched pet:</h3>
            <div>id: {pet?.id}</div>
            <div>category: {pet?.category?.name}</div>
            <div>name: {pet?.name}</div>
        </Suspense>
    )
}
