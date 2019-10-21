import { useState } from "react";

const usePriority = (route, csrf_token, list) => {
  const [priorityIsBeingEdited, setPriorityChangingStatus] = useState(false);
  const [priority, setPriority] = useState(list.map(x => x.id));
  const [tempPriority, setTempPriority] = useState(null);
  const [listLength, setListLength] = useState(list.length);

  if (listLength !== list.length) {
    setPriority(list.map(x => x.id));
    setListLength(list.length);
  }

  const changePriority = () => {
    let data = new FormData();
    data.append("authenticity_token", csrf_token);
    priority.forEach(p => data.append("priority[]", p));
    fetch(route, { method: "POST", body: data })
      .then(response => response.ok && setPriorityChangingStatus(false));
  };

  const startPriorityChanging = () => {
    setTempPriority(priority);
    setPriorityChangingStatus(true);
  };

  const cancelPriorityChanging = () => {
    setPriority(tempPriority);
    setPriorityChangingStatus(false);
  };

  const swap = (i, j) => {
    let newPriority = [...priority];
    newPriority[i] = priority[j];
    newPriority[j] = priority[i];
    setPriority(newPriority);
  };

  const up = id => {
    const index = priority.findIndex(p => p === id);
    if (index === 0)
      return;
    swap(index - 1, index);
  };

  const down = id => {
    const index = priority.findIndex(p => p === id);
    if (index === priority.length - 1)
      return;
    swap(index, index + 1);
  };

  return [
    priority,
    priorityIsBeingEdited,
    startPriorityChanging,
    cancelPriorityChanging,
    up,
    down,
    changePriority
  ];
};

export default usePriority;
