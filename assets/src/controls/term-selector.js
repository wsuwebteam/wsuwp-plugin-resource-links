import { FormTokenField, Spinner } from "@wordpress/components";
import useFetch from "../hooks/use-fetch";
import { useState } from "@wordpress/element";

const TermSelector = (props) => {
    const {
        label,
        className = "",
        placeholder = "",
        dataSource,
        taxonomy,
        onChange,
        value,
    } = props;

    const [searchInput, setSearchInput] = useState("");
    const apiPath = `/wp-json/wp/v2/${taxonomy}?search=${searchInput}`;
    const requestUrl = new URL(apiPath, dataSource);
    const { data, isLoading, error } = useFetch(requestUrl.href);
    const suggestions =
        data && !isLoading && !error ? data.map((item) => item.name) : [];

    function handleChange(terms) {
        const values = terms.map((value) => {
            if (typeof value === "object") {
                return value;
            }

            const id = data.find((term) => term.name === value).id ?? 0;
            return { id: id, value: value };
        });

        onChange(values);
    }

    function isValidTerm(input) {
        return suggestions.includes(input);
    }

    return (
        <div className={className}>
            {isLoading && <Spinner />}
            <FormTokenField
                label={label}
                placeholder={placeholder}
                onInputChange={setSearchInput}
                suggestions={suggestions}
                value={value}
                onChange={handleChange}
                tokenizeOnSpace={false}
                tokenizeOnBlur={false}
                __experimentalValidateInput={isValidTerm}
            />
        </div>
    );
};

export default TermSelector;
