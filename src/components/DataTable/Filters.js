import React from 'react'
import { useTranslation } from 'react-i18next'
import {
    Input,
    useTheme,
    Slider as ChakraSlider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    HStack,
    Box,
    IconButton,
    Grid,
    Flex,
    Select,
} from '@chakra-ui/react'
import { RiFilterOffLine } from 'react-icons/ri'

// Define a default UI for filtering

//const func=()=>
function Search({ column: { filterValue, setFilter } }) {
    const theme = useTheme()
    const { t } = useTranslation()
    const header =
        theme.components &&
        theme.components.DataTable &&
        theme.components.DataTable.Header
    const headerSearch = header ? header.Search : null

    const bgColor = headerSearch ? headerSearch.bgColor : null

    const size = headerSearch
        ? headerSearch.size
        : header
        ? header.widgetSize
        : theme.components && theme.components.DataTable
        ? theme.components.DataTable.widgetSize
        : 'sm'
    return (
        <Input
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={t(`DataTable_Column_Search`)}
            size={size}
            bgColor={bgColor}
            variant={headerSearch ? headerSearch.variant : 'filled'}
        />
    )
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function Slider({ column: { filterValue, setFilter, preFilteredRows, id } }) {
    const theme = useTheme()
    const header =
        theme.components &&
        theme.components.DataTable &&
        theme.components.DataTable.Header

    const buttonTShirtSize =
        header && header.Slider
            ? header.Slider.size
            : header && header.widgetSize
            ? header.widgetSize
            : theme.components && theme.components.DataTable
            ? theme.components.DataTable.widgetSize
            : 'sm'
    const buttonSize = {
        xs: 12,
        sm: 16,
        md: 20,
        lg: 24,
    }[buttonTShirtSize]

    // Calculate the min and max
    // using the preFilteredRows
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach((row) => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
        })
        return [min, max]
    }, [id, preFilteredRows])

    return (
        <>
            <ChakraSlider
                aria-label={`${id} filter`}
                min={min}
                max={max}
                value={filterValue || min}
                onChange={(v) => setFilter(v)}
                focusThumbOnChange={false}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </ChakraSlider>
            {filterValue && (
                <HStack justify="center">
                    <Box>{filterValue}</Box>
                    <IconButton
                        aria-label="Remove Filter"
                        variant="ghost"
                        icon={
                            <RiFilterOffLine
                                onClick={() => setFilter(undefined)}
                                size={buttonSize}
                            />
                        }
                        size={buttonTShirtSize}
                    />
                </HStack>
            )}
        </>
    )
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function Range({
    column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
    const theme = useTheme()
    const header =
        theme.components &&
        theme.components.DataTable &&
        theme.components.DataTable.Header
    const bgColor = header && header.Range ? header.Range.bgColor : null
    const size =
        header && header.Range
            ? header.Range.size
            : header && header.widgetSize
            ? header.widgetSize
            : theme.components && theme.components.DataTable
            ? theme.components.DataTable.widgetSize
            : 'sm'

    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach((row) => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
        })
        return [min, max]
    }, [id, preFilteredRows])

    return (
        <Grid templateColumns="1fr 1rem 1fr" alignContent="center">
            <Input
                value={filterValue[0] || ''}
                type="number"
                onChange={(e) => {
                    const val = e.target.value
                    setFilter((old = []) => [
                        val ? parseInt(val, 10) : undefined,
                        old[1],
                    ])
                }}
                placeholder={min}
                bgColor={bgColor}
                size={size}
            />
            <Flex justifyContent="center" flexDirection="column">
                -
            </Flex>
            <Input
                value={filterValue[1] || ''}
                type="number"
                onChange={(e) => {
                    const val = e.target.value
                    setFilter((old = []) => [
                        old[0],
                        val ? parseInt(val, 10) : undefined,
                    ])
                }}
                placeholder={max}
                bgColor={bgColor}
                size={size}
            />
        </Grid>
    )
}

// This is a custom filter UI for selecting
// a unique option from a list
function Dropdown({ column: { filterValue, setFilter, preFilteredRows, id } }) {
    const { t } = useTranslation()
    const theme = useTheme()
    const header =
        theme.components &&
        theme.components.DataTable &&
        theme.components.DataTable.Header
    const bgColor = header && header.Dropdown ? header.Dropdown.bgColor : null
    const size =
        header && header.Dropdown
            ? header.Dropdown.size
            : header && header.widgetSize
            ? header.widgetSize
            : theme.components && theme.components.DataTable
            ? theme.components.DataTable.widgetSize
            : 'sm'

    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach((row) => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <Select
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined)
            }}
            size={size}
            bgColor={bgColor}
        >
            <option value="">{t('All')}</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {t(option)}
                </option>
            ))}
        </Select>
    )
}

// This is a custom filter UI for selecting in JCD project only
// a unique option from a list
function StatusDropdown({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    const { t } = useTranslation()
    const theme = useTheme()
    const header =
        theme.components &&
        theme.components.DataTable &&
        theme.components.DataTable.Header
    const bgColor = header && header.Dropdown ? header.Dropdown.bgColor : null
    const size =
        header && header.Dropdown
            ? header.Dropdown.size
            : header && header.widgetSize
            ? header.widgetSize
            : theme.components && theme.components.DataTable
            ? theme.components.DataTable.widgetSize
            : 'sm'

    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach((row) => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <Select
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined)
            }}
            size={size}
            bgColor={bgColor}
        >
            <option value="">{t('All')}</option>
            <option value={true}>{t('ACTIVE')}</option>
            <option value={true}>{t('INACTIVE')}</option>
        </Select>
    )
}

// Define a default UI for filtering

export { Search, Slider, Range, Dropdown, StatusDropdown }
