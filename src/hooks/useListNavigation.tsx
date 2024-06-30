import { useEffect, useRef, useState } from "react";

export const useListNavigation = <T extends HTMLElement>(
  listLength: number
) => {
  const listItemRefs = useRef<Array<T | null>>([]);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(0);

  useEffect(() => {
    if (listItemRefs.current.length > 0) {
      listItemRefs.current[0]?.focus();
    }
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<T>) => {
    event.preventDefault();
    if (event.key === "Enter") {
      event.currentTarget.click();
    } else if (event.key === "ArrowUp") {
      const newIndex =
        focusedItemIndex > 0 ? focusedItemIndex - 1 : listLength - 1;
      setFocusedItemIndex(newIndex);
      listItemRefs.current[newIndex]?.focus();
    } else if (event.key === "ArrowDown") {
      const newIndex =
        focusedItemIndex < listLength - 1 ? focusedItemIndex + 1 : 0;
      setFocusedItemIndex(newIndex);
      listItemRefs.current[newIndex]?.focus();
    }
  };

  return {
    listItemRefs,
    focusedItemIndex,
    handleKeyPress,
    setFocusedItemIndex,
  };
};
