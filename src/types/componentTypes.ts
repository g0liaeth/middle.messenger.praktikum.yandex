import Input from '../components/Input/Input';
import Label from '../components/Label/Label';

export type ChangePasswordPropsType = {
  className?: string;
  backgroundColor?: string;
};

export type ChatPropsType = {
  className?: string;
  backgroundColor?: string;
};

export type EditProfilePropsType = {
  className?: string;
  backgroundColor?: string;
};

export type ErrorPropsType = {
  codeClassName: string;
  codeValue: string;
  textClassName: string;
  textValue: string;
  backgroundColor?: string;
};

export type LoginPropsType = {
  className?: string;
  backgroundColor?: string;
};

export type ProfilePropsType = {
  className?: string;
  backgroundColor?: string;
};

export type SigninPropsType = {
  className?: string;
  backgroundColor?: string;
};

export type BadgePropsType = {
  className?: string;
  imgPath: string;
  events?: {
    click: (e: Event) => void;
  };
};

export type ButtonPropsType = {
  className?: string;
  label: string;
  type?: string;
  events?: {
    click: (e: Event) => void;
  };
};

export type DialogPropsType = {
  className?: string;
  lastMessageText?: string;
  lastMessageSender?: boolean;
  lastMessageTime?: string;
  hasNewMessages: boolean;
  newMessagesCount?: number;
  senderUserName?: string;
};

export type FormGroupPropsType = {
  className?: string;
  label: Label;
  input: Input;
};

export type InputPropsType = {
  className?: string;
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
};

export type LabelPropsType = {
  className?: string;
  text: string;
  labelFor: string;
};

export type LinkPropsType = {
  className?: string;
  text: string;
  path: string;
};

export type MessagePropsType = {
  className: string;
  text: string;
  readed: boolean;
  sendTime: string;
  readMarkImg: string;
};

export type NewMessageFormPropsType = {
  className?: string;
  attachBtnImg: string;
};

export type PopupPropsType = {
  className?: string;
  events?: {
    click: (e: Event) => void;
  };
};

export type TextPropsType = {
  className?: string;
  value: string;
};

export type UserAvatarPropsType = {
  className?: string;
  imgPath: string;
};
