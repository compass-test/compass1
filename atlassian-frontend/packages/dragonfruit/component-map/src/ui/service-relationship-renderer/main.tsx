import React, { CSSProperties } from 'react';

import Cytoscape from 'cytoscape';
// @ts-ignore
import nodeHtmlLabel from 'cytoscape-node-html-label';
import CytoscapeComponent from 'react-cytoscapejs';
import ReactDOMServer from 'react-dom/server';

import Button from '@atlaskit/button';
import Icon from '@atlaskit/icon';
import type { CustomGlyphProps } from '@atlaskit/icon/types';
import * as colors from '@atlaskit/theme/colors';
import { routes } from '@atlassian/dragonfruit-routes';

import {
  CompassRelationship,
  CompassRelationshipComponent,
} from '../../services/get-service-relationships/types';

import GraphNode from './graph-node';
import { Container, ViewportButtonsContainer } from './styled';
import type { ComponentGraphProps } from './types';

const LocationIcon = (props: CustomGlyphProps) => (
  <svg
    {...props}
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11" cy="11" r="7" stroke="#42526E" strokeWidth="2" />
    <circle cx="11" cy="11" r="3" fill="#42526E" />
    <rect x="10" width="2" height="4" rx="1" fill="#42526E" />
    <rect
      x="22"
      y="10"
      width="2"
      height="4"
      rx="1"
      transform="rotate(90 22 10)"
      fill="#42526E"
    />
    <rect
      x="4"
      y="10"
      width="2"
      height="4"
      rx="1"
      transform="rotate(90 4 10)"
      fill="#42526E"
    />
    <rect x="10" y="18" width="2" height="4" rx="1" fill="#42526E" />
  </svg>
);

const graphLayout = {
  name: 'breadthfirst',
  padding: 100,
  directed: true,
  spacingFactor: 1.5,
  // @ts-ignore
  transform: (node, position) => ({ x: position.y, y: position.x }),
};

const graphStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: colors.N20,
};

const graphStylesheet = [
  {
    selector: 'node',
    style: {
      width: '140px',
      height: '60px',
      shape: 'rectangle',
    },
  },
  {
    selector: 'edge',
    style: {
      'line-color': colors.N80,
      'source-arrow-shape': 'triangle',
      'curve-style': 'bezier',
    },
  },
];

const ComponentRelationshipRenderer = ({
  component: root,
}: ComponentGraphProps) => {
  const componentsMap = new Map();

  // use breadth first search to find all components, as the leaf nodes may not have relationships data
  const getComponents = (components: CompassRelationshipComponent[]) => {
    const newComponents = components.filter(
      (component) => !componentsMap.has(component.id),
    );
    newComponents.forEach((component) =>
      componentsMap.set(component.id, component),
    );

    // @ts-ignore: Property 'flatMap' does not exist on type 'CompassRelationship[]'
    const nextComponents = components.flatMap(
      (component: CompassRelationshipComponent) =>
        component.relationships?.nodes
          ? component.relationships.nodes
              .filter(
                (relationship: CompassRelationship) =>
                  relationship && relationship.type === 'DEPENDS_ON',
              )
              // @ts-ignore: Property 'flatMap' does not exist on type 'CompassRelationship[]'
              .flatMap((relationship: CompassRelationship) => [
                relationship.startNode,
                relationship.endNode,
              ])
          : [],
    );

    if (nextComponents.length > 0) {
      getComponents(nextComponents);
    }
  };
  getComponents([root]);

  const relationshipsMap = new Map();
  Array.from(componentsMap.values()).forEach((component) => {
    component.relationships?.nodes &&
      component.relationships.nodes
        .filter(
          (relationship: CompassRelationship) =>
            relationship && relationship.type === 'DEPENDS_ON',
        )
        .forEach((relationship: CompassRelationship) => {
          const isInverse = component.id === relationship.endNode.id;
          if (relationship && !relationshipsMap.has(relationship.id)) {
            relationshipsMap.set(relationship.id, {
              ...relationship,
              isInverse,
            });
          }
        });
  });

  const elements = [
    ...Array.from(componentsMap.values()).map((component) => ({
      data: {
        id: component.id,
        component,
      },
      grabbable: false,
    })),
    ...Array.from(relationshipsMap.values()).map((relationship) => ({
      data: {
        id: relationship.id,
        source: relationship.endNode.id,
        target: relationship.startNode.id,
        label: relationship.type,
      },
    })),
  ];

  // @ts-ignore
  const renderComponentNodeLabel = (data, isCurrent: boolean) => {
    const { component } = data;

    return (
      <GraphNode
        componentId={component.id}
        componentName={component.name}
        isCurrent={isCurrent}
      />
    );
  };

  let viewportReset = () => {};

  return (
    <Container>
      {/* zoom buttons removed for now */}
      <ViewportButtonsContainer>
        <Button
          iconBefore={<Icon glyph={LocationIcon} label="" size="medium" />}
          onClick={() => viewportReset()}
        />
      </ViewportButtonsContainer>
      <CytoscapeComponent
        cy={(cy) => {
          // see https://github.com/cytoscape/cytoscape.js-cxtmenu/issues/62
          if (Object.getPrototypeOf(cy).nodeHtmlLabel == null) {
            nodeHtmlLabel(Cytoscape);
          }
          // @ts-ignore: Property 'nodeHtmlLabel' does not exist on type 'Core'.
          cy.nodeHtmlLabel([
            {
              query: 'node',
              halign: 'center',
              valign: 'center',
              halignBox: 'center',
              valignBox: 'center',
              // @ts-ignore: Parameter 'data' implicitly has an 'any' type
              tpl: (data) => {
                return ReactDOMServer.renderToString(
                  renderComponentNodeLabel(data, data.component.id === root.id),
                );
              },
            },
          ]);
          cy.nodes().on('click', (e) => {
            const data = e.target.data();
            window.open(routes.COMPONENT_DETAILS(data.component.id), '_blank');
          });
          viewportReset = () => cy.fit(undefined, 100);
        }}
        stylesheet={graphStylesheet}
        elements={elements}
        layout={graphLayout}
        style={graphStyle}
        boxSelectionEnabled={false}
        minZoom={0.5}
        maxZoom={1.5}
        autounselectify
      />
    </Container>
  );
};

export default ComponentRelationshipRenderer;
