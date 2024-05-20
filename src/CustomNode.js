import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import CancelIcon from '@mui/icons-material/Cancel';

function CustomNode({ data }) {
  // console.log(data,'11111111')
  return (
    <div className="relative">
      <div className="px-3 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 relative">
        <div className="flex items-center">
          <div style={{ color: "#7B3F00" }} className="rounded-full mr-1 flex justify-center items-center">
            {data?.icon}
          </div>
          <div>
            <div style={{ fontSize: '12px' }}>
              {data?.label}
              {data.label !== "Trigger" && <CancelIcon fontSize="medium" className='pb-3' style={{ color: 'red' }} />}
            </div>
          </div>
        </div>
        {(data.label === 'Send Message node' || data.label === 'Select Options node' || /^Node dndnode_\d+$/.test(data.label)) &&
          <>
            <hr className='mt-1' />
            <div className="ml-1 mt-1">
              <div className="text-sm" style={{ backgroundColor: '#f4f4f4', fontSize: '12px' }}>{data?.message}</div>
            </div>
          </>
        }
      </div>
      {data.direction === 'LR' && !data.label.includes('Trigger') && (
        <Handle type="target" style={{width: '10px', height: '20px'}} position={Position.Left} className="bg-purple-600" />
      )}
      {data.direction !== 'LR' && !data.label.includes('Trigger') && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ top: -4, left: `50%`, transform: `translateX(-50%)` }}
        />
      )}
      {data.direction === 'LR' && !data.label.includes('End Of Flow node') && (
        <Handle type="source" position={Position.Right} style={{width: '10px', height: '20px'}} className="bg-purple-600" />
      )}
      {data.direction !== 'LR' && !data.label.includes('End Of Flow node') && (
        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="bg-purple-600" 
          style={{ marginBottom: "5px", left: `50%`, transform: `translateX(-50%)` }} 
        />
      )}
      {/* {data.direction !== 'LR' && data.label.includes('Select Options') && (
        [...Array(data.noOfNodes)].map((_, index) => (
          <Handle
            key={index}
            type="source"
            className='bg-purple-600'
            position={Position.Bottom}
            id={`source-${index}`}
            style={{
              marginBottom: "7px",
              width: '10px', 
              height: '10px',
              left: `${10 + (index * 20)}%`, 
              cursor: 'grab',
            }}
          />
        ))
      )} */}
    </div>
  );
}

export default memo(CustomNode);
