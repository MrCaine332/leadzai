import { useState } from "react"
import { useEvent } from "@/app/hooks/useEvent"
import { isFunction } from "@/app/utils/isFunction"

function getSearchParam(search: string, param: string) {
  const searchParams = new URLSearchParams(search)
  return searchParams.get(param)
}

function setSearchParam(search: string, param: string, value: string) {
  const searchParams = new URLSearchParams(search)
  searchParams.set(param, value)
  return searchParams.toString()
}

const defaultDeserialize = <Value>(v: string | null) => v as Value
const defaultSerialize = String

interface UseSearchParamsStateOptions<Value> {
  name: string
  serialize?: (value: Value) => string
  deserialize?: (value: string | null) => Value
}

export function useSearchParamsState<Value>({
  name,
  serialize = defaultSerialize,
  deserialize = defaultDeserialize,
}: UseSearchParamsStateOptions<Value>) {
  const [value, setValue] = useState(() => {
    const initialValue = deserialize(
      getSearchParam(window.location.search, name)
    )

    return initialValue
  })

  const updateValue = useEvent((newValue: React.SetStateAction<Value>) => {
    const search = window.location.search
    const actualNewValue = isFunction(newValue) ? newValue(value) : newValue

    setValue(actualNewValue)

    const newSearch = setSearchParam(search, name, serialize(actualNewValue))

    window.history.pushState(null, "", `?${newSearch}`)
  })

  return [value, updateValue] as const
}
