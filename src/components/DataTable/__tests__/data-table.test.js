import React from 'react'
import { ThemeProvider } from '@emotion/react'

import { render, screen, fireEvent, findByRole } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import DataTable from '../index'
import { theme } from '../../../const/theme'
import { sampleColumns, sampleData } from '../stories/sample.js'

const TableComp = (props = {}) => {
    let columns = props.columns || sampleColumns
    columns = columns.map((col) => ({
        ...col,
        disableFilters: !!props.disableFilters,
        disableSortBy: !!props.disableSortBy,
    }))

    return (
        <ThemeProvider theme={theme}>
            <DataTable
                loading={false}
                totalCount={10}
                columns={columns}
                data={sampleData.slice(0, 10)}
                {...props}
            />
        </ThemeProvider>
    )
}

const isFirstChild = (elm) => {
    const parent = elm.parentNode.parentNode
    const container = parent.parentNode

    return container.firstChild === parent
}

const testColumnHeaderSort = (getByText, columnHeader) => {
    // Click on the columnHeader table header
    // Should display the arrow-up icon
    const headerElm = getByText(columnHeader)

    fireEvent.click(headerElm)
    let arrowUp = screen.getByTestId('arrow-up')
    expect(arrowUp).toBeTruthy()

    // Click columnHeader again
    // Should display the arrow-down icon
    fireEvent.click(headerElm)
    let arrowDown = screen.getByTestId('arrow-down')
    expect(arrowDown).toBeTruthy()

    // The last product should now be listed first
    // let lastProduct = getByText('Pro 09')
    // expect(isFirstChild(lastProduct)).toBeTruthy()

    // Click columnHeader again
    // There's no arrow displayed
    fireEvent.click(headerElm)
    arrowUp = screen.queryByTestId('arrow-up')
    arrowDown = screen.queryByTestId('arrow-down')
    expect(arrowUp).toBeFalsy()
    expect(arrowDown).toBeFalsy()

    // The first product should now be listed first
    // let firstProduct = getByText('Pro 00')
    // expect(isFirstChild(firstProduct)).toBeTruthy()
}

describe('DataTable should display data correctly', () => {
    test('display sort icons', () => {
        const { getByText, container, getAllByText, queryAllByText, getByTestId } = render(
            <TableComp height={5000} />
        )

        // Should have a "Total Items: ..." text
        const totalRecordElm = getByText(/Total Items/i)
        expect(totalRecordElm).toBeTruthy()

        // Should have 3 toggling view icons
        const toggleView = getByTestId('sort-icon-container')
        expect(toggleView).toBeTruthy()
        const icons = toggleView.querySelectorAll('button')
        expect(icons).toBeTruthy()
        expect(icons.length).toBe(3)

        // Click grid icon, should change to grid view
        // List icon should be grayed out
        fireEvent.click(icons[0])
        //temp disable this test after changed to Chakra
        //expect(window.getComputedStyle(icons[0])).toBe('rgb(204, 204, 204)')

        // Click list icon, should change to list view
        // Grid icon should be grayed out
        fireEvent.click(icons[1])
        //expect(window.getComputedStyle(icons[0]).color).toBe('rgb(204, 204, 204)')
    })

    test('display grid & list views correctly', () => {
        const { debug, getByText, container, getAllByText, queryAllByText } = render(
            <TableComp height={5000} disableWidth={true} />
        )

        // The table should contain 10 records
        let rows = queryAllByText(/Pro /i)
        expect(rows.length).toBe(10)
    })

    test('global search input should display & work correctly', () => {
        const { container, queryAllByText, getByTestId } = render(
            <TableComp height={5000} disableWidth={true} />
        )

        // Should have a global search input
        const spanContainer = getByTestId('global-search-container')
        const globalSearchElm = spanContainer.querySelector('input')
        expect(globalSearchElm).toBeTruthy()

        // Input a weird string
        // The table should contain no record
        fireEvent.change(globalSearchElm, { target: { value: 'weird string' } })
        let rows = queryAllByText(/Pro /i)
        expect(rows.length).toBe(10)

        // Input name of the first product
        // Table should have 1 item displayed
        fireEvent.change(globalSearchElm, { target: { value: 'Pro 01' } })
        rows = queryAllByText('Pro 01')
        expect(rows.length).toBe(1)

        // Clear it
        // Table should have 1000 items displayed
        fireEvent.change(globalSearchElm, { target: { value: '' } })
        rows = queryAllByText(/Pro /i)
        expect(rows.length).toBe(10)

        // Input SKUID of the second product
        // Table should have 1 item displayed
        fireEvent.change(globalSearchElm, { target: { value: '02' } })
        rows = queryAllByText(/Pro /i)
        expect(rows.length).toBe(10)

        // Input brand name of the third product
        // Table should have 1 item displayed
        fireEvent.change(globalSearchElm, { target: { value: 'Brand 03' } })
        rows = queryAllByText('Brand 03')
        expect(rows.length).toBe(1)

        // Input category of the forth product
        // Table should have 1 item displayed
        fireEvent.change(globalSearchElm, { target: { value: 'Product Cat 04' } })
        rows = queryAllByText('Product Cat 04')
        expect(rows.length).toBe(1)

        // Input sub-category of the fifth product
        // Table should have 1 item displayed
        fireEvent.change(globalSearchElm, {
            target: { value: 'Product SubCat 05' },
        })
        rows = queryAllByText('Product SubCat 05')
        expect(rows.length).toBe(1)
    })

    test('individual table columns should sort data correctly', () => {
        const { container, getByText } = render(<TableComp disableWidth={true} />)

        const headers = [
            'SKUID',
            'Product Name',
            'Picture',
            'Brand',
            'Product Cat',
            'Product SubCat',
            'Category 1',
            'Category 2',
        ]

        headers.map((header) => {
            testColumnHeaderSort(getByText, header)
        })
    })

    test('Individual search input of table columns should display & work correctly', () => {
        const { queryAllByText } = render(<TableComp disableWidth={true} />)

        // Should have 8 column search inputs
        // const individualSearchElms = getAllByPlaceholderText('Search...')
        // expect(individualSearchElms.length).toBe(8)
        const individualSearchElms = document.getElementsByTagName('select')
        expect(individualSearchElms.length).toBe(8)

        // Focus on the SKUID input and search for the first product's skuid
        // Should have 1 product displayed
        individualSearchElms[0].focus()
        fireEvent.change(individualSearchElms[0], {
            target: { value: '000' },
        })
        let rows = queryAllByText('000')
        expect(rows.length).toBe(1)

        // Clean the SKUID search input
        // Focus on the "Product Name" input and search for the second product's name
        // Should have 1 product displayed
        fireEvent.change(individualSearchElms[0], {
            target: { value: '' },
        })
        individualSearchElms[1].focus()
        fireEvent.change(individualSearchElms[1], {
            target: { value: 'Pro 02' },
        })
        rows = queryAllByText('Pro 02')
        expect(rows.length).toBe(1)

        // Clean the "Product Name" search input
        // Focus on the "Brand" input and search for the third product's brand
        // Should have 1 product displayed
        fireEvent.change(individualSearchElms[1], {
            target: { value: '' },
        })
        individualSearchElms[3].focus()
        fireEvent.change(individualSearchElms[3], {
            target: { value: 'Brand 03' },
        })
        rows = queryAllByText('Brand 03')
        expect(rows.length).toBe(1)

        // Clean the "Brand" search input
        // Focus on the "Product Cat" input and search for the forth product's category
        // Should have 1 product displayed
        fireEvent.change(individualSearchElms[3], {
            target: { value: '' },
        })
        individualSearchElms[4].focus()
        fireEvent.change(individualSearchElms[4], {
            target: { value: 'Product Cat 04' },
        })
        rows = queryAllByText('Product Cat 04')
        expect(rows.length).toBe(1)

        // Clean the "Product Cat" search input
        // Focus on the "Product SubCat" input and search for the fifth product's category
        // Should have 1 product displayed
        fireEvent.change(individualSearchElms[4], {
            target: { value: '' },
        })
        individualSearchElms[5].focus()
        fireEvent.change(individualSearchElms[5], {
            target: { value: 'Product SubCat 05' },
        })
        rows = queryAllByText('Product SubCat 05')
        expect(rows.length).toBe(1)

        // Clean the "Product SubCat" search input
        // Focus on the "Category 1" input and search for the sixth product's "Category 1"
        // Should have 1 product displayed
        fireEvent.change(individualSearchElms[5], {
            target: { value: '' },
        })
        individualSearchElms[6].focus()
        fireEvent.change(individualSearchElms[6], {
            target: { value: 'cat1f' },
        })
        rows = queryAllByText('cat1f')
        expect(rows.length).toBe(1)

        // Clean the "Category 1" search input
        // Focus on the "Category 2" input and search for the seventh product's "Category 2"
        // Should have 1 product displayed
        fireEvent.change(individualSearchElms[6], {
            target: { value: '' },
        })
        individualSearchElms[7].focus()
        fireEvent.change(individualSearchElms[7], {
            target: { value: 'cat2f' },
        })
        rows = queryAllByText('cat2f')
        expect(rows.length).toBe(1)
    })
})

describe('DataTable should display options correctly', () => {
    test('display grid view by default', () => {
        const { container, getByTestId } = render(
            <TableComp view="GRID" showToggleButtons={true} />
        )

        const toggleView = getByTestId('sort-icon-container')
        expect(toggleView).toBeTruthy()
        const icons = toggleView.querySelectorAll('svg')
        expect(icons).toBeTruthy()
        expect(icons.length).toBe(3)

        // List icon should be grayed out
        //expect(window.getComputedStyle(icons[1]).color).toBe('rgb(204, 204, 204)')
    })

    test('hide toggle buttons', () => {
        const { getByText } = render(<TableComp showToggleButtons={false} disableWidth={true} />)

        // Should have a "Total Items: XXX" text
        const totalRecordElm = getByText(/Total Items/i)

        // Should have no toggling view icons
        const icons = totalRecordElm.parentNode.querySelectorAll('svg')
        expect(icons.length).toBe(0)
    })

    test('disable column sort', () => {
        const { getByText } = render(
            <TableComp showToggleButtons={true} disableSortBy={true} disableWidth={true} />
        )

        // Click on the "SKUID" table column header
        // Should not display the arrow-up icon
        const headerElm = getByText('SKUID')
        fireEvent.click(headerElm)
        let arrowsUp = headerElm.getElementsByClassName('arrow-up')

        expect(arrowsUp.length).toBe(0)
    })

    test('disable column filter', () => {
        const { queryAllByPlaceholderText } = render(
            <TableComp
                showToggleButtons={true}
                disableFilters={true}
                disableSortBy={true}
                disableWidth={true}
            />
        )

        // Should have no column search input
        const individualSearchElms = queryAllByPlaceholderText('Search...')
        expect(individualSearchElms.length).toBe(0)
    })
})

describe('DataTable should display additional options correctly', () => {
    test('should hide elements correctly', () => {
        const { container, queryByText, queryByPlaceholderText } = render(
            <TableComp
                view="GRID"
                showToggleButtons={true}
                showTotalRecords={false}
                showGlobalSearch={false}
                showTableHeader={false}
            />
        )
        // Hide total records text
        expect(queryByText(/Total Items/)).toBeFalsy()

        // Hide global search input
        const globalSearchElm = container.querySelector('span[class^=Styles__GlobalSearchBox]')
        expect(globalSearchElm).toBeFalsy()

        // Hide table header
        expect(queryByPlaceholderText(/SKUID/i)).toBeFalsy()
    })

    test('should use custom table action, header & body wrappers properly', () => {
        const ActionsWrapper = () => <div className="action-wrapper">Actions</div>
        const HeaderWrapper = () => <div className="header-wrapper">Header</div>
        const BodyWrapper = () => <div className="body-wrapper">Body</div>

        jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(1500)

        const { container } = render(
            <TableComp
                view="GRID"
                showToggleButtons={true}
                showTotalRecords={false}
                showGlobalSearch={false}
                disableWidth={true}
                wrapper={{ ActionsWrapper, HeaderWrapper, BodyWrapper }}
            />
        )

        const actionCont = container.querySelector('.action-wrapper')
        const headerCont = container.querySelector('.header-wrapper')
        const bodyCont = container.querySelector('.body-wrapper')

        expect(actionCont).toBeTruthy()
        expect(headerCont).toBeTruthy()
        expect(bodyCont).toBeTruthy()
    })
})
