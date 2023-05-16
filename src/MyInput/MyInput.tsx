import React, {FC} from "react";
import './MyInput.scss';

export interface MyInputProps {
    children?: React.ReactNode;
    placeholer: string;
    label: string;
    big: boolean;
}
const MyInput: FC<MyInputProps> = ({
    children,
    placeholer,
    label,
    big,
    ...props
                                   }) => {
    const rootClasses = ['my-input'];
    if (big) {
        rootClasses.push('big-input')
    }

    return(
        <div>
            <label>
                {label}
                <input className={rootClasses.join(' ')}
                       placeholder={placeholer} {...props} />
            </label>
            <div className="name">*important data</div>
        </div>


    );
}

export default MyInput;