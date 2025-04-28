
import {describe, it} from 'vitest'
import {render} from '@testing-library/react'
import DrinkCard from './DrinkCard'

const drink = {
    idDrink: "string",
    strDrink: "string",
    strDrinkThumb: "string"
}

describe('<DrinkCard />', () => {
    it('Debería renderizar la Card', () => {
        render(<DrinkCard drink={drink} />)
    })
})