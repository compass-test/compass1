"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constructGqlSegmentFromArray_1 = __importDefault(require("../constructGqlSegmentFromArray"));
const generateMutationGql_1 = __importDefault(require("../generateMutationGql"));
const CreateComponentLinkMutation_1 = require("../../graphQL/CreateComponentLinkMutation");
const DeleteComponentLinkMutation_1 = require("../../graphQL/DeleteComponentLinkMutation");
const Url = require('url-parse');
function isLinkEqual(a, b) {
    const aUrl = new Url(a.url);
    const bUrl = new Url(b.url);
    // eslint-disable-next-line eqeqeq
    return a.type === b.type && aUrl.href === bUrl.href && a.name == b.name;
}
function generateLinkKey(link) {
    const url = new Url(link.url);
    const name = link.name === undefined ? null : link.name;
    return `${link.type}${url.href}${name}`;
}
function duplicateLinks(links, filterBy) {
    const dups = [];
    const existingLinkKeys = [];
    links.forEach((link) => {
        const linkKey = generateLinkKey(link);
        if (filterBy.some((key) => key === linkKey)) {
            if (existingLinkKeys.some((key) => key === linkKey)) {
                dups.push({ id: link.id });
            }
            else {
                existingLinkKeys.push(linkKey);
            }
        }
    });
    return dups;
}
function transformIntoCreateLinkInput(item, componentId) {
    return {
        componentId,
        link: item,
    };
}
function transformIntoDeleteLinkInput(item, componentId) {
    return {
        componentId,
        link: item.id,
    };
}
function updateLinksSegment(componentId, oldLinks = [], newLinks) {
    let segmentAcc = {
        mutation: '',
        parameters: [],
        variables: {},
    };
    // if newLinks is null, remove existing links
    if (newLinks === undefined) {
        return segmentAcc;
    }
    newLinks = newLinks || [];
    // Get diff between old and new links
    const linksInBoth = oldLinks.filter((existingLink) => newLinks.some((newLink) => isLinkEqual(newLink, existingLink)));
    const toBeCreated = newLinks.filter((newLink) => !linksInBoth.some((overlapLink) => isLinkEqual(overlapLink, newLink)));
    const toBeRemoved = oldLinks.filter((oldLink) => !linksInBoth.some((overlapLink) => isLinkEqual(overlapLink, oldLink)));
    let dups = [];
    if (linksInBoth) {
        // If there are links in both dedup the ones in Compass
        const distinctLinksInBoth = new Set(linksInBoth.map((link) => generateLinkKey(link)));
        dups = duplicateLinks(oldLinks, Array.from(distinctLinksInBoth));
    }
    // Generate Gql segments
    const createLinkGqlSegment = () => (0, generateMutationGql_1.default)(CreateComponentLinkMutation_1.CreateCompassComponentLink, 'createComponentLink');
    const deleteLinkGqlSegment = () => (0, generateMutationGql_1.default)(DeleteComponentLinkMutation_1.DeleteCompassComponentLink, 'deleteComponentLink');
    if (toBeRemoved.length > 0) {
        segmentAcc = (0, constructGqlSegmentFromArray_1.default)(toBeRemoved, deleteLinkGqlSegment, transformIntoDeleteLinkInput, segmentAcc, componentId);
    }
    if (toBeCreated.length > 0) {
        segmentAcc = (0, constructGqlSegmentFromArray_1.default)(toBeCreated, createLinkGqlSegment, transformIntoCreateLinkInput, segmentAcc, componentId);
    }
    if (dups.length > 0) {
        segmentAcc = (0, constructGqlSegmentFromArray_1.default)(dups, deleteLinkGqlSegment, transformIntoDeleteLinkInput, segmentAcc, componentId);
    }
    return segmentAcc;
}
exports.default = updateLinksSegment;
//# sourceMappingURL=updateLinksSegment.js.map