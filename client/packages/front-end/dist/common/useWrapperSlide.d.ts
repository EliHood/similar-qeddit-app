import React from 'react';
declare function useWrapperSlide(): {
    appOpen: boolean;
    appSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    classes: Record<"buttonBar" | "appBar" | "appBarShift" | "drawerClose", string>;
};
export default useWrapperSlide;
