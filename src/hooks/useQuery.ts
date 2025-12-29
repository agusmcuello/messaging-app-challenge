import { useMutation } from "@tanstack/react-query";

import { BaseError } from "../api/errors/BaseError";

export interface QuerySettings {
  disableGlobalError?: boolean;
}

export interface UseQueryOptions<TData = unknown, TError = any>
  extends QuerySettings {
  onSuccess?: (data: TData) => void;

  onError?: (error: BaseError<TError>) => void;

  onSettled?: () => void;
}

interface UseQueryConfig<TData = unknown, TVariables = unknown> {
  fetchFn: (opts: TVariables) => Promise<TData>;
}

export default function useQuery<
  TData = unknown,
  TError = any,
  TVariables = unknown
>(
  config: UseQueryConfig<TData, TVariables>,
  options?: UseQueryOptions<TData, TError>
) {
  const { fetchFn } = config;

  const { disableGlobalError, ...restOpts } = options ?? {};

  const opts = disableGlobalError
    ? { onError: () => {}, ...(restOpts ?? {}) }
    : restOpts;

  return useMutation({ mutationFn: fetchFn, ...(opts ?? {}) });
}
