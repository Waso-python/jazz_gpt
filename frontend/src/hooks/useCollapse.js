import {useState} from 'react';

const useCollapse = (initIsOpen = false) => {
    const [isOpen, setOpen] = useState(initIsOpen);

    const onOpen = (e) => {
        setOpen(value => !value)
    }

    const onToggle = () => {
        setOpen(prev => !prev)
    }

    return ({isOpen, onOpen, onToggle});
}

export default useCollapse;