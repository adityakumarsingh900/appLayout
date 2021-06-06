import React, { useRef, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import GridLayout from 'react-grid-layout';
import { Box } from 'grommet';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { CardGripper, GridItem, GripIcon } from './components/elements';

const getPosition = (index, maxInRow, maxWidth) => {
  let x = 0, y = 0;
  y = Math.trunc(index / 3) * 7;
  x = (index%3 * 10);
  return {x,y}
}

const PlayGround = ({ children, gravity, itemsInRow, inilayout }) => {
  const dragEl = useRef(null);
  const [width, setWidth] = useState(1200);
  const [resizingElement, setResizingElement] = useState(null);
  const [draggingElement, setDraggingElement] = useState(null);

  const layout = useMemo(() => {
    if (inilayout) return inilayout;
    if (React.isValidElement(children)) {
      return [{ i: "0", x: 0, y: 0, w: 10, h: 7, minW: 5, minH: 5 }];
    } else if (children?.length) {
      return children.map((c, i) => {
        const { x, y } = getPosition(i, 3, 30);
        return {
          i: i.toString(),
          x,
          y,
          w: 10,
          h: 7,
          minW: 5,
          minH: 5,
        };
      });
    }
  }, [children, inilayout]);

  useEffect(() => {
    const el = dragEl.current;
    setWidth(el.offsetWidth);
  }, []);

  return (
    <Box fill ref={dragEl}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={itemsInRow * 10}
        rowHeight={itemsInRow * 10}
        width={width}
        compactType={gravity}
        onResizeStart={(layout, resizedItem) =>
          setResizingElement(resizedItem.i)
        }
        onResizeStop={() => setResizingElement(null)}
        onDrag={(layout, resizedItem) => setDraggingElement(resizedItem.i)}
        onDragStop={() => setDraggingElement(null)}
        onDrop={() => setDraggingElement(null)}
        onLayoutChange={(layout) => console.log(JSON.stringify(layout))}
        // useCSSTransforms={false}
      >
        {React.isValidElement(children) ? (
          <GridItem key="0" elevation="xsmall">
            <CardGripper>
              <GripIcon />
            </CardGripper>
            {children}
          </GridItem>
        ) : (
          children.map((El, i) => (
            <GridItem key={i.toString()} elevation="xsmall">
              <CardGripper>
                <GripIcon />
              </CardGripper>
              {React.cloneElement(El, {
                resizing: resizingElement === i.toString(),
                dragging: draggingElement === i.toString(),
              })}
            </GridItem>
          ))
        )}
      </GridLayout>
    </Box>
  );
};

PlayGround.defaultProps = {
  gravity: 'vertical',
  itemsInRow: 3,
};

PlayGround.propTypes = {
  children: PropTypes.array,
  gravity: PropTypes.string,
  itemsInRow: PropTypes.number,
  inilayout: PropTypes.array,
};

export default PlayGround;
