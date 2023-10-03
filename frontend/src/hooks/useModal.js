import {useCallback, useState} from "react";

const useModal = (isOpen = false) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    const onCloseModal = useCallback( () => {
        setIsModalOpen(false)
    }, [setIsModalOpen])

    const onOpenModal = useCallback(() => {
        setIsModalOpen(true)
    }, [setIsModalOpen])

    return {isModalOpen, onCloseModal, onOpenModal}
}

export default useModal;