import { RichText, InnerBlocks } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";
import { useSelect, useDispatch } from "@wordpress/data";
import { useEffect } from "@wordpress/element";

import "./styles.scss";

const CSSNAMESPACE = "wsu-gutenberg-resource-link";

export default function Edit(props) {
    const { setTemplateValidity } = useDispatch("core/editor");

    const postTitle = useSelect((select) => {
        return select("core/editor").getEditedPostAttribute("title");
    });
    const postMeta = useSelect((select) => {
        return select("core/editor").getEditedPostAttribute("meta");
    });
    const { editPost } = useDispatch("core/editor");

    useEffect(() => {
        setTemplateValidity(true);
    }, []);

    function updateMetaField(key, value) {
        editPost({
            meta: {
                ...postMeta,
                [key]: value,
            },
        });
    }

    return (
        <>
            <div className={CSSNAMESPACE}>
                <div className={`${CSSNAMESPACE}__preview`}>
                    <h1 className={`${CSSNAMESPACE}__post-title`}>
                        <RichText
                            placeholder="Link Title"
                            multiline={false} // prevent linebreaks
                            onReplace={() => {}} // prevent linebreaks
                            onSplit={() => {}} // prevent linebreaks
                            allowedFormats={[]}
                            onChange={(title) => editPost({ title: title })}
                            value={postTitle ? postTitle : ""}
                        />
                    </h1>
                </div>

                <div className={`${CSSNAMESPACE}__editor`}>
                    <div className={`${CSSNAMESPACE}__edit-field`}>
                        <TextControl
                            label="Link URL"
                            className={`${CSSNAMESPACE}__text-control`}
                            placeholder="https://example.wsu.edu"
                            onChange={(value) =>
                                updateMetaField(
                                    "_wsuwp_resource_link_url",
                                    value,
                                )
                            }
                            value={postMeta._wsuwp_resource_link_url}
                        />
                    </div>
                    <div className={`${CSSNAMESPACE}__edit-field`}>
                        <TextControl
                            label="Source"
                            className={`${CSSNAMESPACE}__text-control`}
                            placeholder="John Smith"
                            onChange={(value) =>
                                updateMetaField(
                                    "_wsuwp_resource_link_source",
                                    value,
                                )
                            }
                            value={postMeta._wsuwp_resource_link_source}
                        />
                    </div>
                    <div className={`${CSSNAMESPACE}__edit-field`}>
                        <div className={`${CSSNAMESPACE}__field-label`}>
                            Summary
                        </div>
                        <InnerBlocks
                            template={[
                                [
                                    "core/paragraph",
                                    {
                                        placeholder: "Enter summary content.",
                                    },
                                ],
                            ]}
                            allowedBlocks={["core/paragraph", "core/list"]}
                            templateLock={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
