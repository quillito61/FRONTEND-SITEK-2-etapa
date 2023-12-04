import { useState, useRef, Fragment } from 'react';
import type { FC } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const options = [
  'Create a merge commit',
  'Squash and merge',
  'Rebase and merge'
];

const options2 = [
  'menu 1',
  'menu 2',
  'menu 3'
];

export const Buttons3: FC = () => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const anchorRef2 = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleMenuItemClick = (index: number): void => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event): void => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    
    setOpen(false);
  };

  const handleClose2 = (event: Event): void => {
    if (anchorRef2.current && anchorRef2.current.contains(event.target as HTMLElement)) {
      return;
    }

    
    setOpen(false);
  };


  return (
    <Fragment>
    <Box
      sx={{
        backgroundColor: 'background.paper',
        p: 3
      }}
    >
      <ButtonGroup
        ref={anchorRef2}
        variant="contained"
      >
        <Button>
          {options2[selectedIndex]}
        </Button>
        <Button
          onClick={handleToggle}
          size="small"
          sx={{ backgroundColor: 'primary.dark' }}
        >
          <ArrowDropDownIcon fontSize="small" />
        </Button>
      </ButtonGroup>
      <Popper
        anchorEl={anchorRef2.current}
        open={open}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom'
                  ? 'center top'
                  : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose2}>
                <MenuList id="split-button-menu2">
                  {options2.map((option, index) => (
                    <MenuItem
                      disabled={index === 2}
                      key={option}
                      onClick={() => handleMenuItemClick(index)}
                      selected={index === selectedIndex}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>

            
          </Grow>
        )}
      </Popper>
    </Box>



<Box
      sx={{
        backgroundColor: 'background.paper',
        p: 3
      }}
    >
      <ButtonGroup
        ref={anchorRef}
        variant="contained"
      >
        <Button>
          {options[selectedIndex]}
        </Button>
        <Button
          onClick={handleToggle}
          size="small"
          sx={{ backgroundColor: 'primary.dark' }}
        >
          <ArrowDropDownIcon fontSize="small" />
        </Button>
      </ButtonGroup>
      <Popper
        anchorEl={anchorRef.current}
        open={open}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom'
                  ? 'center top'
                  : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      disabled={index === 2}
                      key={option}
                      onClick={() => handleMenuItemClick(index)}
                      selected={index === selectedIndex}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>

            
          </Grow>
        )}
      </Popper>
    </Box>

    </Fragment>
  );

  
};
