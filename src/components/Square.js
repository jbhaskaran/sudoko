import React from 'react';

function Square(props) {
  return (
    <>
      <div className='square'>
         <input id={props.id} type='text' className='number' value={props.value ? props.value : '' } onChange={e => props.onChange(e)} />
      </div>
    </>
  );
}

export default Square;
