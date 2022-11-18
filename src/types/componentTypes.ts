import Input from '../components/Input/Input';
import Label from '../components/Label/Label';
import UserAvatar from '../components/UserAvatar/UserAvatar';

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
    click: (event: Event) => void;
  };
}

export interface ButtonPropsType extends BasePropsType {
  label?: string;
  type?: string;
  events?: {
    click: (event: Event) => void;
  };
}

export interface DialogPropsType extends BasePropsType {
  id: number;
  lastMessageText?: string;
  lastMessageSender?: boolean;
  lastMessageTime?: string;
  hasNewMessages: boolean;
  newMessagesCount?: number;
  senderUserName?: string;
  dialogAvatar?: UserAvatar;
  events?: {
    click: (event: Event) => void;
  };
}

export interface FormGroupPropsType extends BasePropsType {
  label?: Label;
  input: Input;
}

export interface FormPropsType extends BasePropsType {
  formItems?: unknown[];
  events?: {
    submit: (event: Event) => void;
  };
}

export interface ContainerPropsType extends BasePropsType {
  items?: unknown[];
}

export interface DropdownPropsType extends BasePropsType {
  listItems?: unknown[];
}

export interface ListItemPropsType extends BasePropsType {
  id: number;
  content?: string;
  events?: {
    click: (event: Event) => void;
  };
}

export interface InputPropsType extends BasePropsType {
  inputType: string;
  inputId: string;
  inputName: string;
  disabled?: string;
  inputValue?: string;
  inputPlaceholder?: string;
  events?: {
    blur?: (event: Event) => void;
    focus?: (event: Event) => void;
    keypress?: (event: Event) => void;
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
  uploadImage: (data: any) => void;
  events?: {
    click: (event: Event) => void;
  };
}

export interface TextPropsType extends BasePropsType {
  value: string;
}

export interface PicturePropsType extends BasePropsType {
  src: string;
  alt: string;
}

export interface UserAvatarPropsType extends BasePropsType {
  imgPath: string;
}
