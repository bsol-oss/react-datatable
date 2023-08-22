export const initialState = (page, extraFieldFilters) => {
    return {
        queryPageIndex: 0,
        queryPageSize: page || 10,
        totalCount: 0,
        filterCount: 0,
        queryPageFilter: '',
        queryPageSortBy: [],
        queryFieldsFilter: extraFieldFilters ?? [],
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
        case 'FILTER_COUNT_CHANGED':
            return {
                ...state,
                filterCount: payload,
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
    pageSortBy,
    extraSortFilters = null,
    axios
) => {
    let paramStr = ''
    let offset = page * pageSize

    if (pageSortBy?.length || !!extraSortFilters) {
        const field = []
        const sortyByDir = []
        if (pageSortBy.length)
            pageSortBy.forEach((srt) => {
                field.push(srt.id)
                sortyByDir.push(srt.desc ? 'desc' : 'asc')
            })
        if (extraSortFilters.length)
            extraSortFilters.forEach((srt) => {
                field.push(srt.id)
                sortyByDir.push(srt.desc ? 'desc' : 'asc')
            })
        paramStr = `&sorting={"field":"${field.join()}","sort":"${sortyByDir.join()}"}`
    }

    if (pageFilter?.trim?.().length) {
        paramStr = `${paramStr}&searching=${encodeURIComponent(pageFilter)}`
    }

    if (fieldsFilter?.length) {
        const filterInfo = fieldsFilter.map((field) => {
            const value =
                typeof field.value === 'string'
                    ? field.value.replace('\\', '').replace('"', '')
                    : field.value
            return {
                [field.id]: encodeURIComponent(value),
            }
        })
        paramStr = `${paramStr}&where=${JSON.stringify(
            Object.assign({}, ...filterInfo)
        )}`
    }

    try {
        let items
        if (!!authKey) {
            items = await axios.get(
                `${url}?pagination={"offset":${offset},"rows":${pageSize}}${paramStr}`,
                { headers: { authorization: `Bearer ${authKey}` } }
            )
        } else {
            items = await axios.get(
                `${url}?pagination={"offset":${offset},"rows":${pageSize}}${paramStr}`
            )
        }
        if (
            !items ||
            typeof items !== 'object' ||
            !Array.isArray(items.data.results)
        ) {
            items = { data: { results: [] } }
        }
        const data = items.data
        return {
            ...data,
            data,
            ok: true,
            status: items.status,
        }
    } catch (e) {
        console.log(
            'DataTableServer Error: ',
            e.status,
            e.req?.status,
            e.res?.status
        )

        return {
            results: [],
            ok: false,
            status: e.status || e.response?.status || e.request?.status,
            message: e.message,
        }
    }
}
