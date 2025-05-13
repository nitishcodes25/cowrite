import {parseAsString,useQueryState} from 'nuqs'

export const useSearchParams = () => {
    return useQueryState(
        "search",
        parseAsString.withDefault("").withOptions({clearOnDefault:true})
    )
}