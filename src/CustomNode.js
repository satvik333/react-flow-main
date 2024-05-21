import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function CustomNode({ data }) {
  return (
    <div className="wrapper gradient relative">
      <div className="bg-black inner body shadow-md rounded-md border-2 border-stone-400 relative">
        <div className="flex items-center">
          <div
            style={{ color: '#7B3F00' }}
            className="rounded-full mr-1 flex justify-center items-center"
          >
            {data?.icon}
          </div>
          <div>
            <div style={{ fontSize: '12px' }}>{data?.label}</div>
          </div>
        </div>
        {data.label !== 'Trigger' && (
          <div className="absolute top-0 right-0 p-1">
            <CancelIcon
              fontSize="medium"
              className="pb-3"
              style={{ color: '#f56565', cursor: 'pointer' }}
              data-testid="CancelIcon"
            />
          </div>
        )}
        {(data.label === 'Message node' ||
          data.label === 'Options node' ||
          /^Node dndnode_\d+$/.test(data.label)) && (
          <>
            <hr className="mt-2" />
            <div className="mt-2">
              <div
                className="text-sm flex rounded-md pt-1 justify-center items-center border-2 border-stone-400 p-1"
                style={{ fontSize: '12px' }}
              >
                {data?.message}
              </div>
            </div>
          </>
        )}
        {!data.label.includes('End Of Flow node') && (
          <div className="absolute bottom-0 right-0 pt-3">
            {!data.collapsed && (
              <KeyboardArrowDownIcon
                style={{ cursor: 'pointer' }}
                data-testid="KeyboardArrowDownIcon"
              />
            )}
            {data.collapsed && (
              <KeyboardArrowUpIcon
                style={{ cursor: 'pointer' }}
                data-testid="KeyboardArrowUpIcon"
              />
            )}
          </div>
        )}
      </div>
      {data.direction === 'LR' && !data.label.includes('Trigger') && (
        <Handle
          type="target"
          position={Position.Left}
          className="custom-handle"
        />
      )}
      {data.direction !== 'LR' && !data.label.includes('Trigger') && (
        <Handle
          type="target"
          position={Position.Top}
          className="custom-handle"
          style={{ top: -4, left: '50%', transform: 'translateX(-50%)' }}
        />
      )}
      {data.direction === 'LR' && !data.label.includes('End Of Flow node') && (
        <Handle
          type="source"
          position={Position.Right}
          className="custom-handle"
        />
      )}
      {data.direction !== 'LR' && !data.label.includes('End Of Flow node') && (
        <Handle
          type="source"
          className="custom-handle"
          position={Position.Bottom}
          style={{
            marginBottom: '5px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      )}
    </div>
  );
}

export default memo(CustomNode);
