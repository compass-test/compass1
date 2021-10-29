import { Commit } from '../commit';
import { Analysis, Issue, RenderAudit } from '../types';
import { Diff, DiffKind, shallowDiff } from '../shallow-diff';
import { Render } from '../render';
import { AnalysisIssue } from './issue';
import { Fiber } from 'react-reconciler';

type AddIssue = (message: string) => void;
type ChangeAnalyzer = (change: Diff, issue: AddIssue) => AnalysisIssue | void;
type IsRenderUnnecessary = (render: Render, issues: Set<Issue>) => boolean;

export interface Options {
  changeAnalyzers?: ChangeAnalyzer[];
  isRenderUnnecessary?: IsRenderUnnecessary;
}

const defaultChangeAnalyzers = [
  analyzePossibleInlineFunction,
  analyzeShallowBrokenReference,
];

export function analyze(
  commit: Commit,
  {
    changeAnalyzers = defaultChangeAnalyzers,
    isRenderUnnecessary = isRenderWithIssuesUnnecessary,
  }: Options = {},
): Analysis | null {
  const audits = new Set<RenderAudit>();

  for (const render of commit.renders) {
    if (render.changes) {
      const issues = new Set<Issue>();
      for (const change of render.changes) {
        changeAnalyzers.forEach((fn) => {
          const issue = fn(change, (message) => new AnalysisIssue(message));
          if (issue) {
            issues.add({
              change,
              issue,
            });
          }
        });
      }

      if (issues.size) {
        audits.add({
          unnecessary: isRenderUnnecessary(render, issues),
          render,
          issues,
        });
      }
    }
  }

  return {
    commit,
    audits,
  };
}

function analyzePossibleInlineFunction(
  change: Diff,
  issue: AddIssue,
): AnalysisIssue | void {
  if (
    change &&
    !isPathChildrenProp(change.path) &&
    typeof change.lhs === 'function' &&
    typeof change.rhs === 'function' &&
    change.lhs.toString() === change.rhs.toString()
  ) {
    return issue('Possible inline functions.');
  }
}

function analyzeShallowBrokenReference(
  change: Diff,
  issue: AddIssue,
): AnalysisIssue | void {
  if (
    change &&
    !isPathChildrenProp(change.path) &&
    typeof change.lhs === 'object' &&
    typeof change.rhs === 'object' &&
    change.lhs !== null &&
    change.rhs !== null
  ) {
    if (shallowDiff(change.lhs, change.rhs).size === 0) {
      return issue('Reference changed, however no shallow values changed.');
    }
  }
}

function isPathChildrenProp(path: (string | number)[]): boolean {
  return path[0] === 'props' && path[1] === 'children';
}

function isRenderWithIssuesUnnecessary(
  render: Render,
  issues: Set<Issue>,
): boolean {
  const changes = new Set(render.changes);
  for (const issue of issues) {
    if (isChangePreventable(issue.change, render)) {
      changes.delete(issue.change);
    } else {
      return false;
    }
  }

  return changes.size === 0;
}

function isChangePreventable(change: Diff, render: Render): boolean {
  // styled-components
  if (
    change.kind === DiffKind.Edited &&
    isFiberTypeStyledComponent(render.fiber)
  ) {
    if (isPathState(change.path)) {
      const keys = change.rhs ? Object.keys(change.rhs as object) : [];
      if (
        keys.length === 2 &&
        keys.includes('theme') &&
        keys.includes('generatedClassName')
      ) {
        return false;
      }
    } else if (isPathThemeState(change.path)) {
      return false;
    }
  }

  return true;
}

function isFiberTypeStyledComponent(fiber: Fiber): boolean {
  return (
    fiber.type &&
    (typeof fiber.type === 'object' || typeof fiber.type === 'function') &&
    'styledComponentId' in fiber.type
  );
}

function isPathState(path: (string | number)[]): boolean {
  return path.length === 1 && path[0] === 'state';
}

function isPathThemeState(path: (string | number)[]): boolean {
  return path.length === 2 && path[0] === 'state' && path[1] === 'theme';
}
