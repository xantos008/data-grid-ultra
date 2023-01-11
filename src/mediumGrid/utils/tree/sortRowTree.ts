import { GridRowId, GridRowTreeConfig, GridRowTreeNodeConfig } from '../../../baseGrid';
import { GridSortingModelApplier } from '../../../baseGrid/internals';

interface SortRowTreeParams {
  rowIds: GridRowId[];
  rowTree: GridRowTreeConfig;
  disableChildrenSorting: boolean;
  sortRowList: GridSortingModelApplier | null;
}

export const sortRowTree = (params: SortRowTreeParams) => {
  const { rowIds, rowTree, disableChildrenSorting, sortRowList } = params;
  let sortedRows: GridRowId[] = [];

  // Group the rows by parent
  const groupedByParentRows = new Map<
    GridRowId | null,
    { body: GridRowTreeNodeConfig[]; footer: GridRowTreeNodeConfig | null }
  >([[null, { body: [], footer: null }]]);
  for (let i = 0; i < rowIds.length; i += 1) {
    const rowId = rowIds[i];
    const node = rowTree[rowId];
    let group = groupedByParentRows.get(node.parent);
    if (!group) {
      group = { body: [], footer: null };
      groupedByParentRows.set(node.parent, group);
    }

    if (node.position === 'footer') {
      group.footer = node;
    } else {
      group.body.push(node);
    }
  }

  // Apply the sorting to each list of children
  const sortedGroupedByParentRows = new Map<GridRowId | null, GridRowId[]>();
  groupedByParentRows.forEach((group, parent) => {
    if (group.body.length === 0) {
      sortedGroupedByParentRows.set(parent, []);
    } else {
      let groupSortedRows: GridRowId[];
      const depth = group.body[0].depth;
      if ((depth > 0 && disableChildrenSorting) || !sortRowList) {
        groupSortedRows = group.body.map((row) => row.id);
      } else {
        groupSortedRows = sortRowList(group.body);
      }

      if (group.footer != null) {
        groupSortedRows.push(group.footer.id);
      }

      sortedGroupedByParentRows.set(parent, groupSortedRows);
    }
  });

  // Flatten the sorted lists to have children just after their parent
  const insertRowListIntoSortedRows = (startIndex: number, rowList: GridRowId[]) => {
    sortedRows = [...sortedRows.slice(0, startIndex), ...rowList, ...sortedRows.slice(startIndex)];

    let treeSize = 0;
    rowList.forEach((rowId) => {
      treeSize += 1;
      const children = sortedGroupedByParentRows.get(rowId);
      if (children?.length) {
        const subTreeSize = insertRowListIntoSortedRows(startIndex + treeSize, children);
        treeSize += subTreeSize;
      }
    });

    return treeSize;
  };

  insertRowListIntoSortedRows(0, sortedGroupedByParentRows.get(null)!);

  return sortedRows;
};
