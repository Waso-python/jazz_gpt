import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {Loading} from "./index";

const ModalLoading = () => {
    return (
        <Modal open sx={{zIndex: '99999'}}>
            <Box>
                <Loading/>
            </Box>
        </Modal>
    );
}

export {ModalLoading};