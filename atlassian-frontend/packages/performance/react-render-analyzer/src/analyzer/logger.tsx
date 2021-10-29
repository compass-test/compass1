import React, { ReactElement } from 'react';
import console from 'react-console';
import { Analysis, Issue, RenderAudit } from '../types';
import { getDisplayNameForFiber } from '../fiber';
import { Component, Emoji, Title } from './components';
import { Fiber } from 'react-reconciler';

export function log(analysis: Analysis): void {
  const { audits, commit } = analysis;
  if (!audits.size) {
    return;
  }

  const unnecessary = new Set<RenderAudit>();
  for (const audit of audits) {
    if (audit.unnecessary) {
      unnecessary.add(audit);
    }
  }

  const rootDisplayName = getDisplayNameForFiber(commit.root.current.child!);
  const errorCount = unnecessary.size;
  const warningCount = audits.size - errorCount;

  groupCollapsed(
    <Title
      displayName={rootDisplayName}
      errors={errorCount}
      warnings={warningCount}
    />,
    () => {
      if (errorCount > 0) {
        groupCollapsed(
          <span style={{ fontWeight: 'normal' }}>
            <Emoji>⛔️</Emoji> <span>Errors ({errorCount})</span>
          </span>,
          () => {
            for (const audit of audits) {
              if (audit.unnecessary) {
                logRenderAudit(audit);
              }
            }
          },
        );
      }

      if (warningCount > 0) {
        groupCollapsed(
          <span style={{ fontWeight: 'normal' }}>
            <Emoji>⚠️</Emoji> <span>Warnings ({warningCount})</span>
          </span>,
          () => {
            for (const audit of audits) {
              if (audit.unnecessary) {
                continue;
              }
              logRenderAudit(audit);
            }
          },
        );
      }

      groupCollapsed(
        <span style={{ fontWeight: 'normal' }}>
          <Emoji>🧮</Emoji> <span>Stats</span>
        </span>,
        () => {
          console.log('Render no.:', commit.count);
          console.log(
            'Duration:',
            clampNumber(commit.profilerTimings.actualDuration),
          );

          group(
            <span style={{ fontWeight: 'normal' }}>
              Changes ({commit.renders.size})
            </span>,
            () => {
              console.log('Updates:', commit.updates);
              console.log('Mounts:', commit.mounts);
              console.log('Unmounts:', commit.unmounts);
            },
          );

          console.log('Issues:', audits.size);
        },
      );

      groupCollapsed(
        <span style={{ fontWeight: 'normal' }}>
          <Emoji>🔎</Emoji> <span>Inspect</span>
        </span>,
        () => {
          console.log('Commit: %o', commit);
          console.log('Audits: %o', audits);
        },
      );

      logFiberSource(commit.root.current.child);
    },
  );
}

function logFiberSource(fiber: Fiber | null) {
  if (!fiber) {
    return;
  }

  groupCollapsed(
    <span style={{ fontWeight: 'normal' }}>
      <Emoji>🧑‍💻</Emoji> <span>Source</span>
    </span>,
    () => {
      if (typeof fiber.type === 'string') {
        console.log(
          <span style={{ fontWeight: 'normal' }}>
            Type: <Component>{fiber.type}</Component>
          </span>,
        );
      } else {
        console.log('Type:', fiber.type);
      }

      if (fiber._debugSource) {
        console.log(
          'Source:',
          `${fiber._debugSource.fileName}:${fiber._debugSource.lineNumber}`,
        );
      }

      if (fiber.type && fiber.type._rraDebug) {
        const debug = fiber.type._rraDebug as {
          uuid: string;
          fileName: string;
          lineNumber: number;
        };
        console.log('Defined:', `${debug.fileName}:${debug.lineNumber}`);
      } else {
        console.log(
          'Defined: Unavailable, try using: @atlassian/react-render-analyzer/babel',
        );
      }
    },
  );
}

function groupCollapsed(label: string | ReactElement, callback: () => void) {
  console.groupCollapsed(label);
  callback();
  console.groupEnd();
}

function group(label: string | ReactElement, callback: () => void) {
  console.group(label);
  callback();
  console.groupEnd();
}

function clampNumber(number: number, decimals: number = 1): number {
  const op = 10 ** decimals;
  return Math.floor(number * op) / op;
}

function logIssues(label: string, issues: Set<Issue>) {
  groupCollapsed(
    <span style={{ fontWeight: 'normal' }}>
      {label} ({issues.size})
    </span>,
    () => {
      for (const { change, issue } of issues) {
        const log = () => {
          console.log(
            <>
              <Emoji>⚠️</Emoji> {issue.message}
            </>,
          );
          group(
            <span style={{ fontWeight: 'normal' }}>
              <Emoji>🔎</Emoji> <span>Inspect</span>
            </span>,
            () => {
              console.log(
                '%cPrevious%c:',
                'text-decoration: line-through;color: var(--error-text-color)',
                '',
                change.lhs,
              );
              console.log('Current:', change.rhs);
            },
          );
        };

        let path = change.path.slice(1).join('.');
        if (path === '') {
          if (issues.size === 1) {
            log();
            return;
          }
          path = '*';
        }

        groupCollapsed(
          <span style={{ fontWeight: 'normal' }}>{path}</span>,
          log,
        );
      }
    },
  );
}

function logRenderAudit(audit: RenderAudit) {
  const { render, issues } = audit;
  groupCollapsed(
    <Title displayName={render.displayName} warnings={issues.size} />,
    () => {
      groupCollapsed(
        <span style={{ fontWeight: 'normal' }}>
          <Emoji>⚠️</Emoji> <span>Warnings ({issues.size})</span>
        </span>,
        () => {
          const props = new Set<Issue>();
          const hooks = new Set<Issue>();
          const state = new Set<Issue>();
          const context = new Set<Issue>();

          // group issues
          for (const issue of issues) {
            const { change } = issue;

            switch (change.path[0]) {
              case 'props':
                props.add(issue);
                break;

              case 'hooks':
                hooks.add(issue);
                break;

              case 'state':
                state.add(issue);
                break;

              case 'context':
                context.add(issue);
            }
          }

          if (props.size) {
            logIssues('Props', props);
          }

          if (hooks.size) {
            logIssues('Hooks', hooks);
          }

          if (state.size) {
            logIssues('State', state);
          }

          if (context.size) {
            logIssues('Context', context);
          }
        },
      );

      groupCollapsed(
        <span style={{ fontWeight: 'normal' }}>
          <Emoji>🔎</Emoji> <span>Inspect</span>
        </span>,
        () => {
          console.log('Render: %o', render);
          console.log('Fiber: %o', render.fiber);
        },
      );

      groupCollapsed(
        <span style={{ fontWeight: 'normal' }}>
          <Emoji>🧮</Emoji> <span>Stats</span>
        </span>,
        () => {
          console.log('Render no.:', render.renderCount);
          console.log('Phase:', render.phase);
          console.log(
            'Duration:',
            clampNumber(render.profilerTimings.actualDuration),
          );
          console.log('Changes:', render.changes ? render.changes.size : 0);
        },
      );

      logFiberSource(render.fiber);
    },
  );
}
