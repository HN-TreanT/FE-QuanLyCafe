import { Store } from "react-notifications-component";

interface Props {
  message: string;
  title: string;
  position: any;
  type: any;
}
export const notification = (props: Props) => {
  Store.addNotification({
    title: props.title,
    message: props.message,
    type: props.type,
    insert: "bottom",
    container: props.position,
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: false,
    },
  });
};
