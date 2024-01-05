
const API_URL = 'http://5.78.97.128:8081';

//Function to get all data from server
export const getAllSubarea = async () => {
  try {
    const response = await fetch(`${API_URL}/api/g/subarea/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching subareas');
  }
};

//Function to get data by searchKey from server
export const getSubareaBySearechKey = async (
  searchTerm
) => {
  try {
    const url = `${API_URL}/api/g/subarea/all?searching=${searchTerm}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching subarea by search key');
  }
};

//Function to get filtered data by several filter
export const getFilteredData = async (
  filterTerm = {
        offset: 1,
        rows: 10,
        field: '',
        sort: '',
        searchTerm: '',
        individualSearchTerm: {}
      },
  apiUrl,
  extraSortFilters,
  extraFieldFilters,
  axios
) => {
  let paramStr = '';
  const offset =
    filterTerm?.offset === 0
      ? 0
      : (filterTerm ? filterTerm.offset - 1 : 0) *
        (filterTerm ? filterTerm.rows : 0);

  if (filterTerm?.field?.length || extraSortFilters?.length) {
    const field = filterTerm?.field ? filterTerm.field.split(',') : [];
    const sortyByDir = filterTerm?.sort ? filterTerm.sort.split(',') : [];
    if (extraSortFilters?.length)
      extraSortFilters.forEach((srt) => {
        field.push(srt.id);
        sortyByDir.push(srt.desc ? 'desc' : 'asc');
      });
    paramStr = `&sorting={"field":"${field}","sort":"${sortyByDir}"}`;
  }

  if (filterTerm?.searchTerm?.trim?.().length) {
    paramStr = `${paramStr}&searching=${encodeURIComponent(
      filterTerm.searchTerm
    )}`;
  }

  if (
    Object.keys({ ...filterTerm?.individualSearchTerm, ...extraFieldFilters })
      .length > 0
  ) {
    paramStr = `${paramStr}&where=${JSON.stringify({
      ...filterTerm?.individualSearchTerm,
      ...extraFieldFilters,
    })}`;
  }

  try {
    const url = `${apiUrl}?pagination={"offset":${offset},"rows":${filterTerm?.rows}}${paramStr}`;
    const response = await axios.get(url);
    const data = response.data;
    return {
      ...data,
      data,
      results: data.results,
      ok: true,
      status: response.status,
    };
  } catch (error) {
    console.log(
      'DataTableServer Error: ',
      error?.response?.data,
      error?.response?.status
    );
    return {
      count: 0,
      filterCount: 0,
      dropOptions: [],
      results: [],
      ok: false,
      status: error?.response?.status || error?.message,
      message: error?.response?.data || error?.message,
    };
  }
};
