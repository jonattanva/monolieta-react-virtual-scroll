export const getSizeStyle = (height: number, width: number) => ({
    height: `${height}px`,
    width: `${width}px`,
});

export const getPaddingStyle = (padding: number) => {
    if (padding > 0) {
        return {
            gap: `${padding}px`,
        };
    }
};

export const getTranslateStyle = (
    translateX: number,
    translateY: number,
    padding: number
) => {
    if (padding > 0) {
        return {
            gap: `${padding}px`,
            transform: `translate(${translateX}px, ${translateY}px)`,
        };
    }

    return {
        transform: `translate(${translateX}px, ${translateY}px)`,
    };
};
