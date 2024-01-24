import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import {
    PanelBody,
    Spinner,
    ToggleControl,
    RangeControl,
    TextControl,
} from "@wordpress/components";
import HostControl from "../../controls/host-control";
import TermSelector from "../../controls/term-selector";
import useFetch from "../../hooks/use-fetch";

import "./styles.scss";

const CSSNAMESPACE = "wsu-gutenberg-resource-links";

export default function Edit(props) {
    const { attributes, setAttributes } = props;
    const blockProps = useBlockProps({
        className: CSSNAMESPACE,
    });

    const dataSource = attributes.dataSource
        ? attributes.dataSource
        : WSUWP_RESOURCE_LINKS_DATA.siteUrl;

    const requestUrl = buildRequestUrl();

    function buildRequestUrl() {
        const apiPath = `/wp-json/wsu-resource-links/v1/get-links`;
        const url = new URL(dataSource);
        url.pathname =
            url.pathname
                .split("/")
                .filter((s) => s !== "")
                .join("/") + apiPath;

        if (attributes.categories?.length > 0) {
            url.searchParams.append(
                "categories",
                attributes.categories.map((c) => c.id).join(","),
            );
        }

        if (attributes.tags?.length > 0) {
            url.searchParams.append(
                "tags",
                attributes.tags.map((c) => c.id).join(","),
            );
        }

        if (attributes.useAndLogic) {
            url.searchParams.append("relation", "AND");
        }

        if (attributes.count > 0) {
            url.searchParams.append("count", attributes.count);
        }

        if (attributes.offset > 0) {
            url.searchParams.append("offset", attributes.offset);
        }

        return url.href;
    }

    const { data: links, isLoading, error } = useFetch(requestUrl);

    return (
        <>
            <InspectorControls>
                <PanelBody title="Display Options" initialOpen={false}>
                    <RangeControl
                        label="Number of Columns"
                        help="Number of columns to display per row."
                        value={attributes.columns}
                        onChange={(columns) => setAttributes({ columns })}
                        min={1}
                        max={4}
                    />
                    <ToggleControl
                        label="Show Source"
                        checked={attributes.showSource}
                        onChange={(showSource) => setAttributes({ showSource })}
                    />
                    <ToggleControl
                        label="Show ModifiedDate"
                        checked={attributes.showModifiedDate}
                        onChange={(showModifiedDate) =>
                            setAttributes({ showModifiedDate })
                        }
                    />
                    <ToggleControl
                        label="Show Summary"
                        checked={attributes.showSummary}
                        onChange={(showSummary) =>
                            setAttributes({ showSummary })
                        }
                    />
                    <ToggleControl
                        label="Show Categories"
                        checked={attributes.showCategories}
                        onChange={(showCategories) =>
                            setAttributes({ showCategories })
                        }
                    />
                    <ToggleControl
                        label="Show Tags"
                        checked={attributes.showTags}
                        onChange={(showTags) => setAttributes({ showTags })}
                    />
                </PanelBody>
                <PanelBody title="Feed Options" initialOpen={false}>
                    <TermSelector
                        label="Categories"
                        className={`${CSSNAMESPACE}__term-selector`}
                        placeholder="Categories"
                        dataSource={dataSource}
                        taxonomy="categories"
                        value={attributes.categories}
                        onChange={(value) =>
                            setAttributes({ categories: value })
                        }
                    />
                    <TermSelector
                        label="Tags"
                        className={`${CSSNAMESPACE}__term-selector`}
                        placeholder="Tags"
                        dataSource={dataSource}
                        taxonomy="tags"
                        value={attributes.tags}
                        onChange={(value) => setAttributes({ tags: value })}
                    />
                </PanelBody>
                <PanelBody title="Advanced Feed Options" initialOpen={false}>
                    <TextControl
                        label="Count"
                        placeholder="10"
                        help="Number of results to return. Returns all results if empty."
                        value={attributes.count}
                        onChange={(count) => setAttributes({ count })}
                    />
                    <TextControl
                        label="Offset"
                        placeholder="0"
                        help="Offset skips a given number of items before starting results."
                        value={attributes.offset}
                        onChange={(offset) => setAttributes({ offset })}
                    />
                    <ToggleControl
                        label="Use AND logic for terms"
                        checked={attributes.useAndLogic}
                        help="AND Logic limits results to only those that have ALL terms."
                        onChange={(useAndLogic) => {
                            setAttributes({ useAndLogic });
                        }}
                    />
                    <HostControl
                        label="Data Source (Optional)"
                        placeholder={WSUWP_RESOURCE_LINKS_DATA.siteUrl}
                        value={dataSource}
                        onChange={(dataSource) => setAttributes({ dataSource })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {isLoading && (
                    <Spinner className={`${CSSNAMESPACE}__spinner`} />
                )}
                {!isLoading && error && <div>Error: {error}</div>}
                {!isLoading && links && (
                    <ul
                        className={`wsu-content-list wsu-list--style-arrow wsu-list--columns-${attributes.columns}`}
                    >
                        {links.map((link) => {
                            return (
                                <ResourceLink
                                    key={link.id}
                                    attributes={attributes}
                                    link={link}
                                />
                            );
                        })}
                    </ul>
                )}
            </div>
        </>
    );
}

function ResourceLink({ attributes, link }) {
    return (
        <li className="wsu-content-list__item">
            <a href={link.linkUrl} className="wsu-content-list__item-title">
                {link.title}
            </a>
            <div className="wsu-content-list__item-details">
                {attributes.showSource && link.source && (
                    <span>
                        <strong>Source:</strong> {link.source}
                    </span>
                )}
                {attributes.showModifiedDate && (
                    <span>
                        <strong>Updated on:</strong> {link.modifiedDate}
                    </span>
                )}
            </div>
            {attributes.showSummary && link.summary && (
                <p dangerouslySetInnerHTML={{ __html: link.summary }}></p>
            )}
            {(attributes.showCategories || attributes.showTags) && (
                <div className="wsu-content-list__item-taxonomies">
                    {attributes.showCategories && link.categories && (
                        <span>
                            <strong>Categories:</strong>{" "}
                            {link.categories
                                .map((category) => category.name)
                                .join(", ")}
                        </span>
                    )}
                    {attributes.showTags && link.tags && (
                        <span>
                            <strong>Tags:</strong>{" "}
                            {link.tags.map((tag) => tag.name).join(", ")}
                        </span>
                    )}
                </div>
            )}
        </li>
    );
}
