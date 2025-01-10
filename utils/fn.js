exports.getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;
  return { limit, offset };
};

exports.getPaginationData = (data, page, limit, count) => {
  const { docs } = data;
  const totalItems = count;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1 && page <= totalPages;
  return {
    data: docs,
    ...(limit
      ? {
          pagination: {
            totalItems,
            totalPages,
            currentPage,
            pageSize: limit,
            hasNextPage,
            hasPreviousPage,
          },
        }
      : {}),
  };
};
