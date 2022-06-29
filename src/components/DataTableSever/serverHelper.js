export const initialState = (page) => {
    return {
        queryPageIndex: 0,
        queryPageSize: page || 10,
        totalCount: 0,
        queryPageFilter: '',
        queryPageSortBy: [],
        queryFieldsFilter: [],
    }
}

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'PAGE_CHANGED':
            return {
                ...state,
                queryPageIndex: payload,
            }
        case 'PAGE_SIZE_CHANGED':
            return {
                ...state,
                queryPageSize: payload,
            }
        case 'PAGE_SORT_CHANGED':
            return {
                ...state,
                queryPageSortBy: payload,
            }
        case 'PAGE_FILTER_CHANGED':
            return {
                ...state,
                queryPageFilter: payload,
            }
        case 'FIELDS_FILTER_CHANGED':
            return {
                ...state,
                queryFieldsFilter: payload,
            }
        case 'TOTAL_COUNT_CHANGED':
            return {
                ...state,
                totalCount: payload,
            }
        default:
            throw new Error(`Unhandled action type: ${type}`)
    }
}

export const fetchData = async (
    url,
    authKey = null,
    page,
    pageSize,
    pageFilter,
    fieldsFilter,
    pageSortBy
) => {
    try {
        let paramStr = ''
        if (pageSortBy.length > 0) {
            const field = []
            const sortyByDir = []
            pageSortBy.forEach((srt) => {
                field.push(srt.id)
                sortyByDir.push(srt.desc ? 'desc' : 'asc')
            })
            paramStr = `&sorting={"field":"${field.join()}","sort":"${sortyByDir.join()}"}`
        }

        if (pageFilter.trim().length > 0) {
            paramStr = `${paramStr}&searching=${encodeURIComponent(pageFilter)}`
        }

        if (fieldsFilter.length > 0) {
            const filterInfo = fieldsFilter.map((field) => {
                const value = field.value.replace('\\', '').replace('"', '')
                return {
                    [field.id]: encodeURIComponent(value),
                }
            })
            paramStr = `${paramStr}&where=${JSON.stringify(
                Object.assign({}, ...filterInfo)
            )}`
        }

        const response = await fetch(
            `${url}?offset=${page * pageSize}&limit=${pageSize}${paramStr}`,
            { headers: { authorization: `Bearer ${authKey}` } }
        )
        const data = await response.json()

        return data
    } catch (e) {
        throw new Error(`API error:${e?.message}`)
    }
}
