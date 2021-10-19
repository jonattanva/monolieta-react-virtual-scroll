import { useEffect, useState } from "react";

interface VirtualScroll {
    scrollTop: number;
    size: Size;
}

type Size = {
    height: number;
    width: number;
};

export default (ref: React.MutableRefObject<HTMLElement | null>) => {
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
    }, []);

    return value;
};
