import {Box,Button,Typography} from "@mui/material";

import {UploadFileModal} from "@pages/home/summaryBlock/UploadFileModal";
import useModal from "@hooks/useModal";

import {Resume} from "@pages/home/summaryBlock/Resume";
import {PsychologicalPortrait} from "@pages/home/summaryBlock/PsychologicalPortrait";

export const SummaryBlock = () => {
    const {isModalOpen, onCloseModal, onOpenModal} = useModal()

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '80vh'}}>
            <UploadFileModal isOpen={isModalOpen} onClose={onCloseModal}/>
            <Box sx={{alignSelf: 'end', height: '60px', minHeight: '40px'}}>
                <Button variant='customMain' onClick={onOpenModal}>
                    Загрузить расшифровку чата
                </Button>
            </Box>
            <Box>
                <Resume/>
                <PsychologicalPortrait/>
            </Box>
        </Box>
    )
}