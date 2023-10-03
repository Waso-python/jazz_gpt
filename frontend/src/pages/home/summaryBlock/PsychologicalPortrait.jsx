import {useEffect} from "react";

import {Box, Typography} from "@mui/material";

import {useGetPsychologicalPortraitMutation} from "@services";

import {SkeletonLoading} from "@pages/home/SkeletonLoading";
import CollapsedBlock from "@components/collapsedBlock";
import SnackBarError from "@components/snackBarError";

import {useAppSelector} from "@store/hooks";
import {fileIdSelector, usersSelector} from "@store/app";

import getErrorMessage from "@utils/getErrorMessage";

export const PsychologicalPortrait = () => {
    const fileId = useAppSelector(fileIdSelector)
    const users = useAppSelector(usersSelector)
    const [fetchIdeas, {data, isLoading, error}] = useGetPsychologicalPortraitMutation()

    useEffect(() => {
        if (fileId) {
            fetchIdeas(fileId)
        }
    }, [fileId])

    const getContent = () => {
        if (isLoading || !data) {
            return <SkeletonLoading numStr={5}/>
        }

        return (
            Object.entries(data).map(([userId, portrait]) => {
                return (
                    <Box key={userId} sx={{mb: '20px'}}>
                        <Typography sx={{fontWeight: '500', mb: '10px'}}>
                            {`${users[userId]}: `}
                        </Typography>
                        <Typography>
                            {portrait}
                        </Typography>
                    </Box>
                )
            })
        )
    }

    if (!fileId) {
        return <SkeletonLoading numStr={8}/>
    } else if (error) {
        return (
            <SnackBarError>{`Не получилось загрузить психологические портреты участников встречи (${getErrorMessage(error)})`}</SnackBarError>
        )
    }

    return (
        <CollapsedBlock topicName={'Психологические портреты участников'}>
            {
                getContent()
            }
        </CollapsedBlock>
    )
}