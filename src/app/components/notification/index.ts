'use client';

import { toast } from 'react-toastify';

export const notification = () => {

    function notify(
        message: string,
        level: "success" | "info" | "warning" | "error"
    ) {

        switch (level) {
            case "success":
                toast.success(message);
                break;

            case "info":
                toast.info(message);
                break;

            case "warning":
                toast.warning(message);
                break;

            case "error":
                toast.error(message);
                break;
        }
    }

    return {
        notify
    };
};