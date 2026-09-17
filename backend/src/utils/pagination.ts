export interface PaginationParams {
  page: number
  limit: number
  offset: number
}

export function getPagination(query: { page?: string | number; limit?: string | number }): PaginationParams {
  const page = Math.max(1, parseInt(String(query.page || 1), 10))
  const limit = Math.min(100, Math.max(1, parseInt(String(query.limit || 20), 10)))
  const offset = (page - 1) * limit
  return { page, limit, offset }
}

export function buildPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
) {
  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}
