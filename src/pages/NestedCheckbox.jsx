import React, { useState, useMemo } from "react";
import { facilityTree } from "./stubs/nestedCheckbox.stub";

const selectedFacilities = new Set([17, 6, 9, 98]);

const transformFacilityTree = (node, type, selectedIds) => {
    let children = [];
  
    if (node.campuses) {
      children = node.campuses.map((campus) =>
        transformFacilityTree(campus, "campus", selectedIds)
      );
    } else if (node.buildings) {
      children = node.buildings.map((building) =>
        transformFacilityTree(building, "building", selectedIds)
      );
    } else if (node.floors) {
      children = node.floors.map((floor) =>
        transformFacilityTree(floor, "floor", selectedIds)
      );
    } else if (node.subFloors || node.areas) {
      children = [
        ...(node.subFloors
          ? node.subFloors.map((subFloor) =>
              transformFacilityTree(subFloor, "subfloor", selectedIds)
            )
          : []),
        ...(node.areas
          ? node.areas.map((area) =>
              transformFacilityTree(area, "area", selectedIds)
            )
          : []),
      ];
    }
  
    // Use `some()` and `every()` for efficient state determination
    let isChecked = selectedIds.has(node.id);
    let allChildrenChecked = children.length > 0 && children.every((child) => child.state === "checked");
    let someChildrenChecked = children.some((child) => child.state !== "unchecked");
  
    let state = "unchecked";
    if (isChecked || allChildrenChecked) {
      state = "checked";
    } else if (someChildrenChecked) {
      state = "indeterminate";
    }
  
    return {
      id: node.id,
      name: node.name,
      type,
      state,
      children,
    };
  };
  
  // ✅ Store precomputed states in a Map for fast lookup
  const buildStateMap = (node, map) => {
    map.set(node.id, node.state);
    node.children.forEach((child) => buildStateMap(child, map));
  };
  
  // ✅ Propagate selection lazily (no full traversal)
  const toggleSelection = (node, selectedIds, newState) => {
    if (newState) {
      selectedIds.add(node.id);
    } else {
      selectedIds.delete(node.id);
    }
    node.children.forEach((child) => toggleSelection(child, selectedIds, newState));
  };
  
  const FacilityCheckbox = ({ node, selectedIds, setSelectedIds, stateMap }) => {
    const state = stateMap.get(node.id);
  
    const handleChange = () => {
      const newSelected = new Set(selectedIds);
      const isCurrentlySelected = state === "checked";
      toggleSelection(node, newSelected, !isCurrentlySelected);
      setSelectedIds(newSelected);
    };
  
    return (
      <div style={{ marginLeft: 20 }}>
        <input
          type="checkbox"
          checked={state === "checked"}
          ref={(el) => el && (el.indeterminate = state === "indeterminate")}
          onChange={handleChange}
        />
        {node.name}
        {node.children.map((child) => (
          <FacilityCheckbox
            key={child.id}
            node={child}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            stateMap={stateMap}
          />
        ))}
      </div>
    );
  };
  
  const NestedCheckbox = () => {
    const [selectedIds, setSelectedIds] = useState(new Set(selectedFacilities));
    const transformedTree = transformFacilityTree(facilityTree, "root", selectedIds);
  
    // ✅ Precompute and store states in a Map for O(1) lookups
    const stateMap = new Map();
    buildStateMap(transformedTree, stateMap);
  
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-200 via-lime-200 to-amber-200 text-cyan-950">
        <h2>Facility Selection</h2>
        <FacilityCheckbox
          node={transformedTree}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          stateMap={stateMap}
        />
      </div>
    );
  };
  
  export default NestedCheckbox;