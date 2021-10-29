import React from 'react';
import { TextMarkup } from '../text';
import { createDefaultExport } from '@atlassian/aux-test-utils';
import { Layout, Container, Grid2, Grid3, SidebarLeft, SidebarRight } from './';

export default createDefaultExport();

function fillers(n: number) {
  return Array.from({ length: n }, (_) => (
    <Container>
      <TextMarkup>
        The spacecraft was on an elliptical orbit around Saturn. When the timing
        was right, the spacecraft fired its engines prograde for 3 minutes; in
        doing so the spacecraft had transferred to a parabolic fly-by orbit of
        the moon Tethys.
      </TextMarkup>
    </Container>
  ));
}

export function Layouts() {
  return (
    <>
      <h4>Grid 2 (1 row)</h4>
      <Layout template="grid-2">{fillers(2)}</Layout>

      <h4>Grid 3 (1 row)</h4>
      <Layout template="grid-3">{fillers(3)}</Layout>

      <h4>Grid 2 (2 rows)</h4>
      <Layout template="grid-2">{fillers(4)}</Layout>

      <h4>Grid 3 (2 rows)</h4>
      <Layout template="grid-3">{fillers(6)}</Layout>

      <h4>Sidebar Left</h4>
      <Layout template="sidebar-left">{fillers(2)}</Layout>

      <h4>Sidebar Right</h4>
      <Layout template="sidebar-right">{fillers(2)}</Layout>
    </>
  );
}

export function LayoutsDirectImport() {
  return (
    <>
      <h4>Grid 2 (1 row)</h4>
      <Grid2>{fillers(2)}</Grid2>

      <h4>Grid 3 (1 row)</h4>
      <Grid3>{fillers(3)}</Grid3>

      <h4>Grid 2 (2 rows)</h4>
      <Grid2>{fillers(4)}</Grid2>

      <h4>Grid 3 (2 rows)</h4>
      <Grid3>{fillers(6)}</Grid3>

      <h4>Sidebar Left</h4>
      <SidebarLeft>{fillers(2)}</SidebarLeft>

      <h4>Sidebar Right</h4>
      <SidebarRight>{fillers(2)}</SidebarRight>
    </>
  );
}
