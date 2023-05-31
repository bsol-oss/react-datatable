export const initialState = (page) => {
    return {
        queryPageIndex: 0,
        queryPageSize: page || 10,
        totalCount: 0,
        filterCount: 0,
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
    extraKeyPair,
    BUName
) => {
    let paramStr = ''
    let offset = page * pageSize

    if (pageSortBy?.length) {
        const field = []
        const sortyByDir = []
        pageSortBy.forEach((srt) => {
            field.push(srt.id)
            sortyByDir.push(srt.desc ? 'desc' : 'asc')
        })
        paramStr = `&sorting={"field":"${field.join()}","sort":"${sortyByDir.join()}"}`
    }

    if (pageFilter?.trim?.().length) {
        paramStr = `${paramStr}&searching=${encodeURIComponent(pageFilter)}`
    }

    if (extraKeyPair !== null && typeof extraKeyPair === 'object') {
        paramStr = `${paramStr}&${Object.keys(extraKeyPair)[0]}=${
            Object.values(extraKeyPair)[0]
        }`
    }

    if (fieldsFilter?.length) {
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

    let query
    if (!!authKey) {
        query = fetch(
            `${url}?pagination={"offset":${offset},"rows":${pageSize}}${paramStr}`,
            { headers: { authorization: `Bearer ${authKey}` } }
        )
    } else if (!!BUName) {
        query = fetch(
            `${url}?pagination={"offset":${offset},"rows":${pageSize}}${paramStr}`,
            { headers: { bu: BUName } }
        )
    } else {
        query = fetch(
            `${url}?pagination={"offset":${offset},"rows":${pageSize}}${paramStr}`
        )
    }

    return query
        .then(async (response) => {
            let data = await response?.json?.()
            if (
                !data ||
                typeof data !== 'object' ||
                !Array.isArray(data.results)
            ) {
                data = { results: [] }
            }

            console.log('DataTableServer Results: ', response)
            return {
                ...data,
                response,
                ok: response.ok,
                status: response.status,
            }
        })
        .catch((e) => {
            console.log(
                'DataTableServer Error: ',
                e.status,
                e.req?.status,
                e.res?.status
            )
            return {
                results: [],
                ok: false,
                status: e.status,
                message: e.message,
            }
        })
}
