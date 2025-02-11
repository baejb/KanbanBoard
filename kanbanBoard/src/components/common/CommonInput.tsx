import React from 'react';
import styled from 'styled-components';

interface InputProps {
  width?: string;
  height?: string;
  padding?: string;
  fontSize?: string;
  borderRadius?: string;
  borderColor?: string;
  backgroundColor?: string;
  placeholder?: string;
  as?: 'input' | 'textarea';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input = styled.input<InputProps>`
  box-sizing: border-box;
  overflow: hidden;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '1rem'};
  padding: ${(props) => props.padding || '1rem'};
  font-size: ${(props) => props.fontSize || '1rem'};
  border: 1px solid ${(props) => props.borderColor || '#ccc'};
  background-color: ${(props) => props.backgroundColor || 'white'};
  border-radius: ${(props) => props.borderRadius || '5px'};
  outline: none;
  resize: ${(props) =>
    props.as === 'textarea' ? 'vertical' : 'none'}; /* TextArea일 경우만 resize 허용 */

  &:focus {
    border-color: #007bff;
  }
`;

const CommonInput = (props: InputProps) => {
  return <Input as={props.as || 'input'} {...props} />;
};

export default CommonInput;
