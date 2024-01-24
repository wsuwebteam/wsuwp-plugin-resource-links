import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";
import Save from "./save";

registerBlockType("wsuwp/resource-link", {
    apiVersion: 2,
    title: "Link",
    icon: "admin-links",
    category: "advanced",
    attributes: {},
    edit: Edit,
    save: Save,
});
