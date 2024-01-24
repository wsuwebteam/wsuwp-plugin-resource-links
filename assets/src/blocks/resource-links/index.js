import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";

registerBlockType("wsuwp/resource-links", {
    apiVersion: 2,
    title: "Resource Links",
    icon: "index-card",
    category: "advanced",
    attributes: {
        columns: {
            type: "integer",
            default: 3,
        },
        count: {
            type: "string",
        },
        showSource: {
            type: "boolean",
            default: true,
        },
        showModifiedDate: {
            type: "boolean",
            default: true,
        },
        showSummary: {
            type: "boolean",
            default: true,
        },
        showCategories: {
            type: "boolean",
            default: true,
        },
        showTags: {
            type: "boolean",
            default: true,
        },
        categories: {
            type: "array",
        },
        tags: {
            type: "array",
        },
        useAndLogic: {
            type: "boolean",
            default: false,
        },
        offset: {
            type: "string",
        },
        dataSource: {
            type: "string",
        },
    },
    edit: Edit,
    save: function () {
        return null;
    },
});
