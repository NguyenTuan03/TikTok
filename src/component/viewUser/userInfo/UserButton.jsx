/* eslint-disable react/prop-types */
import Button from "../../button/Button";

export default function UserButton({ isFollow,btn,children }) {
    return (
        <Button
            primary={btn?.isFollow ? false : btn?.isPrimary}
            width={btn?.width}
            minwidth={btn?.minwidth}
            height={btn?.height}
            onClick={(!isFollow ? btn?.follow : btn?.unFollow) || btn?.edit}
            flexmiddle={btn?.flexMiddle ? "true" : "false"}
        >
            {children}
        </Button>
    );
}
