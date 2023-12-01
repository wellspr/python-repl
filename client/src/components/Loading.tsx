const Loading = (props: { mode?: "light" | "dark" }) => {

    const mode = props.mode ? props.mode : "light";
    return (
        <div className={`loading loading--${mode}`}>
            Loading Terminal...
        </div>
    );
};

export default Loading;