// @ts-nocheck

import React, { useContext, useState } from 'react'
import { Select } from 'chakra-react-select'

import {
    FilterContext,
    TableStatusContext,
} from '../globalpartials/GlobalContext'

const DropdownFilter = ({
    column: {
        id,
        columnDef: { header },
    },
    dropOptions,
}) => {
    const [optionValue, setOptionValue] = useState(null)
    const { filterTerm, setFilterTerm } = useContext(FilterContext)
    const { isLoading } = useContext(TableStatusContext)

    const handleChange = (selectedOption) => {
        setOptionValue(selectedOption)
        if (selectedOption && selectedOption.value === '') {
            const getObj = filterTerm.individualSearchTerm
            delete getObj[id]
            setFilterTerm({
                ...filterTerm,
                offset: 1,
                individualSearchTerm: getObj,
            })
        } else {
            setFilterTerm({
                ...filterTerm,
                offset: 1,
                individualSearchTerm: {
                    ...filterTerm.individualSearchTerm,
                    [id]: selectedOption ? selectedOption.value : '',
                },
            })
        }
    }

    const requiredOption = dropOptions.find((drop) => drop.key === id)

    return (
        <Select
            isDisabled={isLoading}
            focusBorderColor="none"
            name="options"
            options={
                (requiredOption && requiredOption.value) || [
                    { value: '', label: 'All' },
                ]
            }
            placeholder={header}
            defaultValue={optionValue}
            onChange={handleChange}
            size="sm"
        />
    )
}

export default DropdownFilter
