import { useState } from "react";
import ReactiveButton from "reactive-button";

const Button = () => {
    const [state, setState] = useState('idle');

  const onClickHandler = () => {
    setState('loading');
    setTimeout(() => {
      setState('success');
    }, 2000);
  };

  return (
    <ReactiveButton
      buttonState={state}
      onClick={onClickHandler}
      color={'primary'}
      idleText={'Click Me'}
      
     
      type={'button'}
      className={'class1 class2'}
      style={{
        borderRadius: '5px',
      }}
      outline={false}
      shadow={false}
      rounded={false}
      size={'normal'}
      block={false}
      messageDuration={2000}
      disabled={false}
      buttonRef={null}
      width={null}
      height={null}
      animation={true}
    />
  );
}
  

export default Button;