import { useEffect, useState } from "react";

type Size = {
    height: number;
    width: number;
};

interface VirtualScroll {
    scrollTop: number;
    size: Size;
}

export default (
    ref: React.MutableRefObject<HTMLDivElement>,
    scrollTop?: number
) => {
    const [value, setValue] = useState<VirtualScroll>();

    useEffect(() => {
        const scroll = ref.current;
        if (!scroll) {
            return;
        }

        setValue({
            scrollTop: scroll.scrollTop,
            size: {
                width: scroll.offsetWidth,
                height: scroll.offsetHeight,
            },
        });

        const onScroll = () => {
            requestAnimationFrame(() => {
                setValue({
                    scrollTop: scroll.scrollTop,
                    size: {
                        width: scroll.offsetWidth,
                        height: scroll.offsetHeight,
                    },
                });
            });
        };

        scroll.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onScroll);

        return () => {
            scroll.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [ref]);

    useEffect(() => {
        const scroll = ref.current;
        if (!scroll) {
            return;
        }

        if (scrollTop !== undefined) {
            scroll.scrollTop = scrollTop;
        }
    }, [ref, scrollTop]);

    return value;
};
