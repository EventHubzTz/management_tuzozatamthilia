import { useCallback, useState } from 'react';

export function usePopover() {
  const [anchorRef, setAnchorRef] = useState(null);
  const open = Boolean(anchorRef)
  const id = open ? 'id' : undefined

  const handleOpen = useCallback((event) => {
    setAnchorRef(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorRef(null);
  }, []);

  const handleToggle = useCallback(() => {
    setAnchorRef((prevState) => !prevState);
  }, []);

  return {
    anchorRef,
    handleClose,
    handleOpen,
    handleToggle,
    open,
    id
  };
}
