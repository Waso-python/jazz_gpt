import useCollapse from "@hooks/useCollapse";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {Box,Divider,Grid, Tooltip,Typography} from "@mui/material";

import {SxProps, Theme} from "@mui/material/styles";
import {TooltipProps} from "@mui/material/Tooltip/Tooltip";

interface ICollapsedBlock {
    topicName: string
    children: any
    tooltipHeader?: string
    tooltipHeaderPlacement?: TooltipProps['placement']
    withDivider?: boolean
    textPlacement?: 'right' | 'left'
    isOpen?: boolean
    onOpen?: () => void
    Button?: any
    sx?: SxProps<Theme>
}

// Если не передана функция для изменения состоянием открытия
// и информация об открытости - закрытия, то реализует собственный механизм открыти - закрытия
// на основе локальных стейтов
const CollapsedBlock = (
    {
        children,
        topicName,
        isOpen = false,
        onOpen,
        tooltipHeader,
        tooltipHeaderPlacement = 'left',
        textPlacement = 'left',
        withDivider = false,
        Button
    }: ICollapsedBlock) => {
    const {isOpen: isOpenIternal, onOpen: onOpenIternal} = useCollapse(isOpen)

    const handleToggle = () => {
        if (typeof isOpen === 'boolean' && onOpen && typeof onOpen === 'function') {
            onOpen()
        } else {
            onOpenIternal()
        }
    }

    const getDivider = () => {
        return (
            <Grid item xs sx={{display: 'flex', alignItems: 'center'}}>
                <>
                    {
                        withDivider && <Divider/>
                    }
                    <Box sx={{alignSelf: 'end'}}>
                        {
                            Button
                        }
                    </Box>
                </>
            </Grid>
        )
    }

    return (
        <>
            <Tooltip title={tooltipHeader} placement={tooltipHeaderPlacement}>
                <Grid container columnSpacing={2} alignItems='center' justifyContent='space-between' sx={{mb: '15px'}}>
                    {textPlacement === 'right' && getDivider()}
                    <Grid container spacing={2} item xs='auto'
                          onClick={handleToggle}
                          sx={{
                              '&:hover': {
                                  cursor: 'pointer',
                                  color: 'rgb(189, 187, 187)',
                              },
                              transition: 'all ease-in-out .5'
                          }}
                    >
                        <Grid item>
                            {
                                isOpenIternal
                                    ? <KeyboardArrowUpIcon/>
                                    : <KeyboardArrowDownIcon/>
                            }
                        </Grid>
                        <Grid item>
                            <Typography sx={{userSelect: 'none'}}>{topicName}</Typography>
                        </Grid>
                    </Grid>
                    {textPlacement === 'left' && getDivider()}
                </Grid>
            </Tooltip>
            {isOpenIternal && children}
        </>
    )
}

export default CollapsedBlock