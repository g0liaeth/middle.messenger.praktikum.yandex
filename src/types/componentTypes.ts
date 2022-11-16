import Input from '../components/Input/Input';
import Label from '../components/Label/Label';

export interface BasePropsType {
  className?: string;
  backgroundColor?: string;
}

export interface ErrorPropsType extends BasePropsType {
  codeClassName: string;
  codeValue: string;
  textClassName: string;
  textValue: string;
}

export interface BadgePropsType extends BasePropsType {
  imgPath: string;
  events?: {
    click: (e: Event) => void;
  };
}

export interface ButtonPropsType extends BasePropsType {
  label: string;
  type?: string;
  events?: {
    click: (e: Event) => void;
  };
}

export interface DialogPropsType extends BasePropsType {
  lastMessageText?: string;
  lastMessageSender?: boolean;
  lastMessageTime?: string;
  hasNewMessages: boolean;
  newMessagesCount?: number;
  senderUserName?: string;
}

export interface FormGroupPropsType extends BasePropsType {
  label: Label;
  input: Input;
}

export interface InputPropsType extends BasePropsType {
  inputType: string;
  inputId: string;
  inputName: string;
  disabled?: string;
  inputValue?: string;
  inputPlaceholder?: string;
  events?: {
    blur?: () => void;
    focus?: () => void;
  };
}

export interface LabelPropsType extends BasePropsType {
  text: string;
  labelFor: string;
}

export interface LinkPropsType extends BasePropsType {
  text: string;
  path: string;
}

export interface MessagePropsType extends BasePropsType {
  text: string;
  readed: boolean;
  sendTime: string;
  readMarkImg: string;
}

export interface NewMessageFormPropsType extends BasePropsType {
  attachBtnImg: string;
}

export interface PopupPropsType extends BasePropsType {
  aaa: (data: any) => void;
  events?: {
    click: (e: Event) => void;
  };
}

export interface TextPropsType extends BasePropsType {
  value: string;
}

export interface UserAvatarPropsType extends BasePropsType {
  imgPath: string;
}
