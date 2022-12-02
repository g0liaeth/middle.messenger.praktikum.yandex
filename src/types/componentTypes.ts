import Input from '../components/Input/Input';
import Label from '../components/Label/Label';
import UserAvatar from '../components/UserAvatar/UserAvatar';

export interface BasePropsType {
  class?: string;
  data?: Record<string, unknown>;
}

export interface ErrorPropsType extends BasePropsType {
  codeClassName: string;
  codeValue: string;
  textClassName: string;
  textValue: string;
}

export interface BadgePropsType extends BasePropsType {
  onClick?: (event: Event) => void;
}

export interface ButtonPropsType extends BasePropsType {
  type?: string;
  onClick?: (event: Event) => void;
}

export interface DialogPropsType extends BasePropsType {
  id?: string;
  dialogAvatar?: UserAvatar;
  onClick?: (event: Event) => void;
}

export interface FormGroupPropsType extends BasePropsType {
  label?: Label;
  input: Input;
}

export interface FormPropsType extends BasePropsType {
  id?: string;
  formItems?: unknown[];
  onSubmit?: (event: Event) => void;
}

export interface ContainerPropsType extends BasePropsType {
  id?: string;
  items?: unknown[];
}

export interface ListPropsType extends BasePropsType {
  listItems?: unknown[];
}

export interface ListItemPropsType extends BasePropsType {
  id?: number;
  onClick?: (event: Event) => void;
}

export interface InputPropsType extends BasePropsType {
  type: string;
  id: string;
  name: string;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  onBlur?: (event: Event) => void;
  onFocus?: (event: Event) => void;
  onKeyup?: (event: Event) => void;
}

export interface LabelPropsType extends BasePropsType {
  for: string;
}

export interface LinkPropsType extends BasePropsType {
  href: string;
}

export interface MessagePropsType extends BasePropsType {
  data: {
    text: string;
    readed: boolean;
    sendTime: string;
    readMarkImg: string;
  };
}

export interface NewMessageFormPropsType extends BasePropsType {
  attachBtnImg: string;
}

export interface PopupPropsType extends BasePropsType {
  popupItems?: unknown[];
  onClick?: (event: Event) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TextPropsType extends BasePropsType {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserAvatarPropsType extends BasePropsType {}
