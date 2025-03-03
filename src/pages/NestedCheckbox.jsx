import React, { useState, useEffect, useMemo } from 'react';
import { facilityTree } from './stubs/nestedCheckbox.stub';

const MultiNestedCheckbox = ({ data, selectedIds, onSelectionChange }) => {
  // Transform facility tree and build maps
  const { transformedTree, parentMap, childMap } = useMemo(() => {
    const parentMap = new Map();
    const childMap = new Map();

    const transformNode = (node, parentId = null, type = "ORGANIZATION") => {
      const nodeId = `${type.toUpperCase()}_${node.id}`;
      const transformedNode = {
        id: nodeId,
        name: node.name,
        type: type.toLowerCase(),
        state: "unchecked",
        children: [],
      };

      if (parentId) parentMap.set(nodeId, parentId);
      childMap.set(nodeId, []);

      if (type === "ORGANIZATION" && node.campuses) {
        transformedNode.children = node.campuses.map((campus) =>
          transformNode(campus, nodeId, "CAMPUS")
        );
      } else if (type === "CAMPUS" && node.buildings) {
        transformedNode.children = node.buildings.map((building) =>
          transformNode(building, nodeId, "BUILDING")
        );
      } else if (type === "BUILDING" && node.floors) {
        transformedNode.children = node.floors.map((floor) =>
          transformNode(floor, nodeId, "FLOOR")
        );
      }

      // Update child map
      childMap.set(
        nodeId,
        transformedNode.children.map((child) => child.id)
      );

      return transformedNode;
    };

    return { transformedTree: transformNode(data), parentMap, childMap };
  }, [data]);

  // Initialize checkbox state
  const [checkboxState, setCheckboxState] = useState();

  // Update parent indeterminate and checked states
  const updateParents = (nodeId, newState) => {
    const parentId = parentMap.get(nodeId);
    if (!parentId) return;

    const children = childMap.get(parentId) || [];
    const allChecked = children.every((id) => newState.get(id)?.isChecked);
    const someChecked = children.some(
      (id) => newState.get(id)?.isChecked || newState.get(id)?.isIndeterminate
    );

    newState.set(parentId, {
      isChecked: allChecked,
      isIndeterminate: !allChecked && someChecked,
    });

    updateParents(parentId, newState);
  };

  // Update children recursively
  const updateChildren = (nodeId, isChecked, newState) => {
    newState.set(nodeId, { isChecked, isIndeterminate: false });
    (childMap.get(nodeId) || []).forEach((childId) =>
      updateChildren(childId, isChecked, newState)
    );
  };

  // Handle checkbox change
  const handleCheckboxChange = (nodeId, isChecked) => {
    const newState = new Map(checkboxState);
    updateChildren(nodeId, isChecked, newState);
    updateParents(nodeId, newState);
    setCheckboxState(newState);

    const selectedNodes = [...newState.entries()]
      .filter(([_, state]) => state.isChecked)
      .map(([id]) => id);
    onSelectionChange(selectedNodes);
  };

  // Ensure preselected values reflect correctly in parents on load
   // Ensure preselected values reflect correctly in parents on load
   useEffect(() => {
    const newState = new Map();

    const initializeState = (node) => {
        const isChecked = selectedIds.includes(node.id);
        newState.set(node.id, { isChecked, isIndeterminate: false });
        node.children?.forEach(initializeState);
    };

    initializeState(transformedTree);

    // Update parents correctly
    selectedIds.forEach((id) => {
        updateParents(id, newState);
    });

    setCheckboxState(newState);
}, [ selectedIds ]);

  // Recursive render function
  const renderCheckboxes = (node) => (
    <div key={node.id} style={{ marginLeft: "20px" }}>
      <input
        type="checkbox"
        checked={checkboxState?.get(node.id)?.isChecked || false}
        ref={(el) => {
          if (el)
            el.indeterminate =
              checkboxState?.get(node.id)?.isIndeterminate || false;
        }}
        onChange={(e) => handleCheckboxChange(node.id, e.target.checked)}
      />
      <label>{node.name}</label>
      {node.children?.map(renderCheckboxes)}
    </div>
  );

  return <div>{renderCheckboxes(transformedTree)}</div>;
};


// Parent Component
const NestedCheckbox = () => {
  // const facilityTree = { /* Replace with actual tree data */ };
  const preselectedIds = ['FLOOR_3', 'FLOOR_49', 'FLOOR_73'];

  const handleSelectionChange = (selectedNodes) => {
    console.log('Selected Nodes:', selectedNodes);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-emerald-200 via-lime-200 to-amber-200 text-cyan-950">
      <h1 className="text-2xl font-bold mt-6 mb-4">Facility Selection</h1>
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg overflow-y-auto max-h-[80vh]">
        <MultiNestedCheckbox
          data={facilityTree}
          selectedIds={preselectedIds}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  );
};

export default NestedCheckbox;

// Step 1 : Transform the data as per requirements
// Step 2 : Set Child map and Parent map
// Step 3 : Initialize State map using useEffect and useState
// Step 4 : Function to update parents
// Step 5 : Function to update children
// Step 6 : Render checkbox recursively
// Step 7 : Checkbox handler that updates parents and children after a node selection
// Step 8 : Expose the selection to the Parent component

